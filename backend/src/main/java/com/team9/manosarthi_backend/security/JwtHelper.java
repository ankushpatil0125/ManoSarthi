package com.team9.manosarthi_backend.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.SignatureAlgorithm;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtHelper {


        //requirement :
        //public static final long JWT_TOKEN_VALIDITY = 5 * 60 * 60;


        private String Secret = "afafasfafafasfasfasfafacasdasfasxASFACASDFACASDFASFASFDAFASFASDAADSCSDFADCVSGCFVADXCcadwavfsfarvf";

        byte[] secret=Secret.getBytes();

    public JwtHelper() throws ParseException {
    }

    //retrieve username from jwt token
        public String getUsernameFromToken(String token) {
            return getClaimFromToken(token, Claims::getSubject);
        }

        public String getIDFromToken(String token) {
        return getClaimFromToken(token, Claims::getId);
    }


    //retrieve expiration date from jwt token
        public Date getExpirationDateFromToken(String token) {
            return getClaimFromToken(token, Claims::getExpiration);
        }

        public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
            final Claims claims = getAllClaimsFromToken(token);
            return claimsResolver.apply(claims);
        }

        //for retrieveing any information from token we will need the secret key
        private Claims getAllClaimsFromToken(String token) {
            return Jwts.parser().setSigningKey(Secret.getBytes()).parseClaimsJws(token).getBody();
        }

        //check if the token has expired
        private Boolean isTokenExpired(String token) {
            final Date expiration = getExpirationDateFromToken(token);
            return expiration.before(new Date());
        }

        //generate token for user
        public String generateToken(UserDetails userDetails, long timediff, String userid) {
            Map<String, Object> claims = new HashMap<>();
            return doGenerateToken(claims, userDetails.getUsername(), userid,timediff);
        }

        //while creating the token -
        //1. Define  claims of the token, like Issuer, Expiration, Subject, and the ID
        //2. Sign the JWT using the HS512 algorithm and secret key.
        //3. According to JWS Compact Serialization(https://tools.ietf.org/html/draft-ietf-jose-json-web-signature-41#section-3.1)
        //   compaction of the JWT to a URL-safe string
        private String doGenerateToken(Map<String, Object> claims, String subject,String userid, long timediff) {

        if(timediff>0) {
            return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
                    //.setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY * 1000))
                    .setExpiration(new Date(System.currentTimeMillis() + timediff))
                    .setId(userid)
                    .signWith(getSigningKey(), SignatureAlgorithm.HS256).compact();
        }
        else
        {
            return "";
        }
        }
        private Key getSigningKey() {
           // byte[] keyBytes = this.secret.getBytes(StandardCharsets.UTF_8);
            byte[] keyBytes = this.secret;
            return Keys.hmacShaKeyFor(keyBytes);
        }
        //validate token
        public Boolean validateToken(String token, UserDetails userDetails) {
            final String username = getUsernameFromToken(token);
            return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
        }



}
