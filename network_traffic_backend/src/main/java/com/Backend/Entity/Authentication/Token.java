package com.Backend.Entity.Authentication;

import jakarta.persistence.*;

/*
 ** The Token Entity class manages
 ** all token generates and save to PostgresSQL database
 ** where all access & refresh tokens are validates
 ** if there are logged-out or not. (boolean)
*/
@Entity
@Table(name = "jwt_token")
public class Token {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String accessToken;
    private String refreshToken;
    private boolean isLoggedOut;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    public Token() {}

    public Token(
            String accessToken,
            String refreshToken,
            boolean isLoggedOut,
            UserEntity userEntity) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.isLoggedOut = isLoggedOut;
        this.user = userEntity;
    }

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getAccessToken() {
        return this.accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getRefreshToken() {
        return this.refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public boolean isLoggedOut() {
        return this.isLoggedOut;
    }

    public void setLoggedOut(boolean loggedOut) {
        isLoggedOut = loggedOut;
    }

    public UserEntity getUserEntity() {
        return this.user;
    }

    public void setUserEntity(UserEntity userEntity) {
        this.user = userEntity;
    }
}
