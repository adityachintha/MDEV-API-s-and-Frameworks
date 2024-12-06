package com.example.assignment3recipesui;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import java.io.IOException;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class RegisterActivity extends AppCompatActivity {
    private EditText usernameInput, emailInput, passwordInput;
    private Button registerButton;
    private TextView loginLink;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);

        // Initialize UI components
        usernameInput = findViewById(R.id.nameInput); // Updated variable name
        emailInput = findViewById(R.id.emailInput);
        passwordInput = findViewById(R.id.passwordInput);
        registerButton = findViewById(R.id.registerButton);
        loginLink = findViewById(R.id.loginLink);

        // Handle the Register button click
        registerButton.setOnClickListener(v -> registerUser());

        // Handle the Login link click
        loginLink.setOnClickListener(v -> {
            Intent intent = new Intent(RegisterActivity.this, LoginActivity.class);
            startActivity(intent);
            finish();
        });
    }

    private void registerUser() {
        Log.d("RegisterActivity", "Register button clicked");
        String username = usernameInput.getText().toString().trim(); // Updated variable name
        String email = emailInput.getText().toString().trim();
        String password = passwordInput.getText().toString().trim();

        // Validate input
        if (username.isEmpty() || email.isEmpty() || password.isEmpty()) {
            Toast.makeText(this, "Please fill all the fields", Toast.LENGTH_SHORT).show();
            return;
        }

        // Create a RegisterRequest object
        RegisterRequestNew registerRequest = new RegisterRequestNew(email, password, username); // Pass "username"

        // Call the register API
        ApiService apiService = RetrofitClient.getApiService(this);
        Call<RegisterResponseNew> call = apiService.registerUser(registerRequest);

        Log.d("RegisterPayload", "Username: " + username + ", Email: " + email + ", Password: " + password);

        call.enqueue(new Callback<RegisterResponseNew>() {
            @Override
            public void onResponse(Call<RegisterResponseNew> call, Response<RegisterResponseNew> response) {
                if (response.isSuccessful() && response.body() != null) {
                    Toast.makeText(RegisterActivity.this, "Registration successful!", Toast.LENGTH_SHORT).show();
                    startActivity(new Intent(RegisterActivity.this, LoginActivity.class));
                    finish();
                } else {
                    // Log and display error message
                    try {
                        if (response.errorBody() != null) {
                            String errorBody = response.errorBody().string();
                            Log.e("RegisterError", errorBody);
                            Toast.makeText(RegisterActivity.this, errorBody, Toast.LENGTH_SHORT).show();
                        }
                    } catch (IOException e) {
                        Log.e("RegisterActivity", "Error parsing error body", e);
                    }
                }
            }

            @Override
            public void onFailure(Call<RegisterResponseNew> call, Throwable t) {
                Toast.makeText(RegisterActivity.this, "Error: " + t.getMessage(), Toast.LENGTH_LONG).show();
                Log.e("RegisterActivity", "Network error: ", t);
            }
        });
    }
}
