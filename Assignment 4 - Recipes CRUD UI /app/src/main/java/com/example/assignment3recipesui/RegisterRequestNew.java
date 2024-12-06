package com.example.assignment3recipesui;

import com.google.gson.annotations.SerializedName;

public class RegisterRequestNew {
    @SerializedName("email") // Backend expects "email"
    private String email;

    @SerializedName("password") // Backend expects "password"
    private String password;

    @SerializedName("username") // Backend expects "username" (not "name")
    private String username;

    // Constructor
    public RegisterRequestNew(String email, String password, String username) {
        this.email = email;
        this.password = password;
        this.username = username; // Corrected the assignment
    }

    // Getters and Setters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() { // Updated the method name to match "username"
        return username;
    }

    public void setUsername(String username) { // Corrected the setter
        this.username = username;
    }
}
