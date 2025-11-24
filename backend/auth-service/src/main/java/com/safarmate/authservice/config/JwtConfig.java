package com.safarmate.authservice.config;

import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.crypto.SecretKey;
import java.util.Base64;

@Configuration
public class JwtConfig {

    private static final Logger logger = LoggerFactory.getLogger(JwtConfig.class);

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Bean
    public SecretKey jwtSigningKey() {
        try {
            // Decode the Base64-encoded secret
            byte[] keyBytes = Base64.getDecoder().decode(jwtSecret);
            SecretKey key = Keys.hmacShaKeyFor(keyBytes);
            logger.info("JWT signing key initialized successfully");
            return key;
        } catch (IllegalArgumentException e) {
            // If the secret is not valid Base64 or too short, generate a new one
            logger.warn("Invalid JWT secret provided. Generating a secure random key...");
            SecretKey generatedKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);
            String base64Key = Base64.getEncoder().encodeToString(generatedKey.getEncoded());
            logger.warn("=".repeat(80));
            logger.warn("GENERATED JWT SECRET (Base64): {}", base64Key);
            logger.warn("Add this to your environment variables or application.yml:");
            logger.warn("JWT_SECRET={}", base64Key);
            logger.warn("=".repeat(80));
            return generatedKey;
        }
    }
}

