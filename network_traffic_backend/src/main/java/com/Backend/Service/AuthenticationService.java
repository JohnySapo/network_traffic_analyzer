//package com.Backend.Service;
//
//import com.Backend.Entity.Role;
//import com.Backend.Entity.UserEntity;
//import com.Backend.Model.LoginRequest;
//import com.Backend.Model.AuthenticationResponse;
//import com.Backend.Model.RegisterRequest;
//import com.Backend.Repository.UserRepository;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//
//@Service
//public class AuthenticationService {
//
//    private final UserRepository userRepository;
//    private final PasswordEncoder passwordEncoder;
//    private final AuthenticationManager authenticationManager;
//    private final JwtService jwtService;
//    private final UserDetailsService userDetailsService;
//
//    public AuthenticationService(
//            UserRepository userRepository,
//            PasswordEncoder passwordEncoder,
//            AuthenticationManager authenticationManager,
//            UserDetailsService userDetailsService,
//            JwtService jwtService) {
//        this.userRepository = userRepository;
//        this.passwordEncoder = passwordEncoder;
//        this.authenticationManager = authenticationManager;
//        this.userDetailsService = userDetailsService;
//        this.jwtService = jwtService;
//    }
//
//    public AuthenticationResponse register(RegisterRequest request){
//
//        UserEntity user = mapToUser(request);
//
//        userRepository.save(user);
//
//        String jwtToken = jwtService.generateTokenService(user);
//
//        return new AuthenticationResponse(jwtToken);
//
//    }
////
////    public AuthenticationResponse authenticate(LoginRequest request) {
////        authenticationManager.authenticate(
////                new UsernamePasswordAuthenticationToken(
////                        request.getUsername(),
////                        request.getPassword())
////        );
////
////        var user = userRepository.findByUsername(request.getUsername())
////                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
////
////        String jwtToken = jwtService.generateTokenService(user);
////
////        return new AuthenticationResponse(jwtToken);
////    }
//
//    public UserEntity authenticate(LoginRequest body) {
//        authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(
//                        body.getUsername(),
//                        body.getPassword()
//                )
//        );
//
//        UserEntity user = userRepository.findByUsername(body.getUsername())
//                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
//
//        return user;
//    }
//
//    private UserEntity mapToUser(RegisterRequest request){
//        String password = passwordEncoder.encode(request.getPassword());
//        UserEntity user = new UserEntity(
//                request.getUsername(),
//                request.getFirstname(),
//                request.getLastname(),
//                request.getEmail(),
//                password,
//                Role.USER
//        );
//
//        return user;
//    }
//}
