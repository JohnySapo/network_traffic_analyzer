package com.Backend.Service;

import com.Backend.Entity.Role;
import com.Backend.Entity.UserEntity;
import com.Backend.Model.LoginRequest;
import com.Backend.Model.AuthenticationResponse;
import com.Backend.Model.RegisterRequest;
import com.Backend.Repository.UserRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public AuthenticationResponse login(LoginRequest body) {
        UserEntity user = userRepository.findByUsername(body.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("UserEntity not found!"));

        if(passwordEncoder.matches(body.getPassword(), user.getPassword())) {
            return mapUser(user);
        }

        return null;
    }

    public AuthenticationResponse register(RegisterRequest body) {
        Optional<UserEntity> verifyUser = userRepository.findByUsername(body.getUsername());

        if(verifyUser.isPresent()) {
            return null;
        }

        // Manually map RegisterRequest to UserEntity
        UserEntity user = new UserEntity();
        user.setUsername(body.getUsername());
        user.setFirstname(body.getFirstname());
        user.setLastname(body.getLastname());
        user.setEmail(body.getEmail());
        user.setRole(Role.USER);
        user.setPassword(passwordEncoder.encode(body.getPassword()));

        UserEntity savedUser = userRepository.save(user);

        return mapUser(savedUser);
    }

    public AuthenticationResponse findByUsername(String username) {
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("UserEntity not found!"));
        String role = user.getRole().name();

        return mapUser(user);
    }

    private AuthenticationResponse mapUser(UserEntity userEntity) {
        return new AuthenticationResponse(
                userEntity.getUsername(),
                userEntity.getFirstname(),
                userEntity.getEmail(),
                null,
                userEntity.getRole()
        );
    }

}
