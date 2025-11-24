package com.safarmate.auth.service;

import com.safarmate.auth.dto.*;
import com.safarmate.auth.entity.User;
import com.safarmate.auth.util.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    public AuthResponse login(LoginRequest request) {
        User user = userService.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!userService.checkPassword(user, request.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtTokenProvider.generateToken(user.getId(), user.getEmail());

        UserDto userDto = UserDto.builder()
                .id(user.getId())
                .email(user.getEmail())
                .name(user.getName())
                .language(user.getLanguage())
                .theme(user.getTheme())
                .build();

        return AuthResponse.builder()
                .accessToken(token)
                .tokenType("Bearer")
                .user(userDto)
                .build();
    }

    public AuthResponse signup(SignupRequest request) {
        User user = userService.createUser(
                request.getEmail(),
                request.getPassword(),
                request.getName(),
                request.getLanguage(),
                request.getTheme()
        );

        String token = jwtTokenProvider.generateToken(user.getId(), user.getEmail());

        UserDto userDto = UserDto.builder()
                .id(user.getId())
                .email(user.getEmail())
                .name(user.getName())
                .language(user.getLanguage())
                .theme(user.getTheme())
                .build();

        return AuthResponse.builder()
                .accessToken(token)
                .tokenType("Bearer")
                .user(userDto)
                .build();
    }
}

