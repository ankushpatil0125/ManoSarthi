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
import java.util.Arrays;
import java.util.Base64;
import java.security.spec.KeySpec;

//import static com.sun.org.apache.xml.internal.security.utils.XMLUtils.encodeToString;

@Configuration
public class AesEncryptor implements AttributeConverter<Object,String> {


    @Value("${aes.encryption.key}")
    private String encryptionKey;
//    private final String encryptionCipher="AES";

//    private Key key;
//    private Cipher cipher;

//    private Key getKey()
//    {
//        if(key==null)
//            key=new SecretKeySpec(encryptionKey.getBytes(),encryptionCipher);
//        return key;
//    }
//    private Cipher getCipher() throws GeneralSecurityException {
//        if(cipher==null)
//            cipher=Cipher.getInstance(encryptionCipher);
//        return cipher;
//    }

//    private void initCipher(int encryptMode) throws GeneralSecurityException
//    {
//        getCipher().init(encryptMode,getKey());
//    }


    //to encrypt
    @SneakyThrows
    @Override
    public String convertToDatabaseColumn(Object attribute) {
        if (attribute == null)
            return null;

        System.out.println(attribute);
        return encrypt(String.valueOf(attribute), encryptionKey, "salt");

//        byte[] bytes= SerializationUtils.serialize(attribute);

//        String toencrypt=new String(bytes);
//        System.out.println("Bytes"+toencrypt);
//        initCipher(Cipher.ENCRYPT_MODE);
//        return Base64.getEncoder().encodeToString(getCipher().doFinal(bytes));
    }


    //to decrypt
    @SneakyThrows
    @Override
    public String convertToEntityAttribute(String dbData) {
        if(dbData==null) {
            System.out.println("hello");
            return null;
        }

//        initCipher(Cipher.DECRYPT_MODE);
//        byte[] bytes=getCipher().doFinal(Base64.getDecoder().decode(dbData));
//
////        String decryptedValue = new String(bytes, StandardCharsets.UTF_8);
////        int paddingLength = bytes[bytes.length - 1];
////        byte[] unpaddedBytes = Arrays.copyOfRange(bytes, 0, bytes.length - paddingLength);
//
//
////        return new String(unpaddedBytes, StandardCharsets.UTF_8);
//        String decryptedValue = new String(bytes,StandardCharsets.ISO_8859_1);
//        return decryptedValue;
        return decrypt(dbData,encryptionKey,"salt");
    }
    private static final int KEY_LENGTH = 256;
    private static final int ITERATION_COUNT = 65536;
    public static String encrypt(String strToEncrypt, String secretKey, String salt) {

        try {

            SecureRandom secureRandom = new SecureRandom();
            byte[] iv = new byte[16];
            secureRandom.nextBytes(iv);
//            for(int i=0;i<16;i++)
//                System.out.println(iv[i]);
            IvParameterSpec ivspec = new IvParameterSpec(iv);

            SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
            KeySpec spec = new PBEKeySpec(secretKey.toCharArray(), salt.getBytes(), ITERATION_COUNT, KEY_LENGTH);
            SecretKey tmp = factory.generateSecret(spec);
            SecretKeySpec secretKeySpec = new SecretKeySpec(tmp.getEncoded(), "AES");

            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
            cipher.init(Cipher.ENCRYPT_MODE, secretKeySpec, ivspec);

            byte[] cipherText = cipher.doFinal(strToEncrypt.getBytes("UTF-8"));
            System.out.println("cipher"+cipherText);
            byte[] encryptedData = new byte[iv.length + cipherText.length];
            System.arraycopy(iv, 0, encryptedData, 0, iv.length);
            System.arraycopy(cipherText, 0, encryptedData, iv.length, cipherText.length);
//            String ivBase64 = Base64.getEncoder().encodeToString(iv); // Convert IV to Base64 string
            System.out.println("iv l"+iv.length);
//            System.out.println("iv "+ivBase64);
            return Base64.getEncoder().encodeToString(encryptedData);
        } catch (Exception e) {
            // Handle the exception properly
            e.printStackTrace();
            return null;
        }
    }
    public static String decrypt(String strToDecrypt, String secretKey, String salt) {
        try {
            byte[] encryptedData = Base64.getDecoder().decode(strToDecrypt);
            byte[] iv = new byte[16];
            System.arraycopy(encryptedData, 0, iv, 0, iv.length);
            IvParameterSpec ivspec = new IvParameterSpec(iv);

            SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
            KeySpec spec = new PBEKeySpec(secretKey.toCharArray(), salt.getBytes(), ITERATION_COUNT, KEY_LENGTH);
            SecretKey tmp = factory.generateSecret(spec);
            SecretKeySpec secretKeySpec = new SecretKeySpec(tmp.getEncoded(), "AES");

            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
            cipher.init(Cipher.DECRYPT_MODE, secretKeySpec, ivspec);

            byte[] cipherText = new byte[encryptedData.length - 16];

            System.arraycopy(encryptedData, 16, cipherText, 0, cipherText.length);

            byte[] decryptedText = cipher.doFinal(cipherText);
            return new String(decryptedText, "UTF-8");
        } catch (Exception e) {
            // Handle the exception properly
            e.printStackTrace();
            return null;
        }
    }



}
