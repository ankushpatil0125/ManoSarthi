package com.team9.manosarthi_backend.Config;

import jakarta.persistence.AttributeConverter;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.SerializationUtils;

import javax.crypto.Cipher;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.GeneralSecurityException;
import java.security.Key;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;
import java.security.spec.KeySpec;

//import static com.sun.org.apache.xml.internal.security.utils.XMLUtils.encodeToString;

@Configuration
public class AesEncryptor implements AttributeConverter<Object,String> {


    @Value("${aes.encryption.key}")
    private String encryptionKey;
    private final String encryptionCipher="AES";

    private Key key;
    private Cipher cipher;

    private Key getKey()
    {
        if(key==null)
            key=new SecretKeySpec(encryptionKey.getBytes(),encryptionCipher);
        return key;
    }
    private Cipher getCipher() throws GeneralSecurityException {
        if(cipher==null)
            cipher=Cipher.getInstance(encryptionCipher);
        return cipher;
    }

    private void initCipher(int encryptMode) throws GeneralSecurityException
    {
        getCipher().init(encryptMode,getKey());
    }


    //to encrypt
    @SneakyThrows
    @Override
    public String convertToDatabaseColumn(Object attribute) {
        if(attribute==null)
            return null;
        initCipher(Cipher.ENCRYPT_MODE);
        byte[] bytes= SerializationUtils.serialize(attribute);

//        System.out.println("Bytes"+encodeToString(bytes));
        return Base64.getEncoder().encodeToString(getCipher().doFinal(bytes));
    }

//    public static String encrypt(String data) throws Exception {
//        Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
//        cipher.init(Cipher.ENCRYPT_MODE, new SecretKeySpec(SECRET_KEY.getBytes(), "AES"));
//        byte[] encryptedBytes = cipher.doFinal(data.getBytes(StandardCharsets.UTF_8));
//        return Base64.getEncoder().encodeToString(encryptedBytes);
//    }

//    public static String decrypt(String encryptedData) throws Exception {
//        Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
//        cipher.init(Cipher.DECRYPT_MODE, new SecretKeySpec(SECRET_KEY.getBytes(), "AES"));
//        byte[] decryptedBytes = cipher.doFinal(Base64.getDecoder().decode(encryptedData));
//        return new String(decryptedBytes, StandardCharsets.UTF_8);
//    }

    //to decrypt
    @SneakyThrows
    @Override
    public String convertToEntityAttribute(String dbData) {
        if(dbData==null)
            return null;
        initCipher(Cipher.DECRYPT_MODE);
        byte[] bytes=getCipher().doFinal(Base64.getDecoder().decode(dbData));
//        String decryptedValue = new String(bytes, StandardCharsets.UTF_8);
        String decryptedValue = new String(bytes,StandardCharsets.ISO_8859_1);

        return decryptedValue;
//        Convert.ToBase64String()
    }
    private static final int KEY_LENGTH = 256;
    private static final int ITERATION_COUNT = 65536;
    public static String encrypt(String strToEncrypt, String secretKey, String salt) {

        try {

            SecureRandom secureRandom = new SecureRandom();
            byte[] iv = new byte[16];
            secureRandom.nextBytes(iv);
            IvParameterSpec ivspec = new IvParameterSpec(iv);

            SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
            KeySpec spec = new PBEKeySpec(secretKey.toCharArray(), salt.getBytes(), ITERATION_COUNT, KEY_LENGTH);
            SecretKey tmp = factory.generateSecret(spec);
            SecretKeySpec secretKeySpec = new SecretKeySpec(tmp.getEncoded(), "AES");

            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
            cipher.init(Cipher.ENCRYPT_MODE, secretKeySpec, ivspec);

            byte[] cipherText = cipher.doFinal(strToEncrypt.getBytes("UTF-8"));
            byte[] encryptedData = new byte[iv.length + cipherText.length];
            System.arraycopy(iv, 0, encryptedData, 0, iv.length);
            System.arraycopy(cipherText, 0, encryptedData, iv.length, cipherText.length);

            return Base64.getEncoder().encodeToString(encryptedData);
        } catch (Exception e) {
            // Handle the exception properly
            e.printStackTrace();
            return null;
        }
    }




}
