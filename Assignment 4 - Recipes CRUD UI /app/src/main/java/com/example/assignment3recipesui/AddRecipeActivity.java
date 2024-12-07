package com.example.assignment3recipesui;

import android.os.Bundle;
import android.util.Log;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class AddRecipeActivity extends AppCompatActivity {

    private EditText recipeNameInput, recipeTypeInput, recipeRatingInput;
    private Button addRecipeButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_recipe);

        recipeNameInput = findViewById(R.id.addRecipeName);
        recipeTypeInput = findViewById(R.id.addRecipeType);
        recipeRatingInput = findViewById(R.id.addRecipeRating);
        addRecipeButton = findViewById(R.id.addRecipeButton);

        addRecipeButton.setOnClickListener(v -> addRecipe());
    }

    private void addRecipe() {
        String recipeName = recipeNameInput.getText().toString();
        String recipeType = recipeTypeInput.getText().toString();
        String ratingInput =  recipeRatingInput.getText().toString();
//        double recipeRating = Double.parseDouble(recipeRatingInput.getText().toString());

        if (recipeName.isEmpty() || recipeType.isEmpty()) {
            Toast.makeText(this, "Please fill all fields", Toast.LENGTH_SHORT).show();
            return;
        }
        double recipeRating;
        try {
            recipeRating = Double.parseDouble(ratingInput);
        } catch (NumberFormatException e) {
            Toast.makeText(this, "Invalid rating format", Toast.LENGTH_SHORT).show();
            return;
        }

        // Create Recipe object
        Recipe newRecipe = new Recipe(null, recipeName, recipeType, recipeRating);
        newRecipe.setRecipeName(recipeName);
        newRecipe.setCuisine(recipeType);
        newRecipe.setAverageRating(recipeRating);
        Log.e("RecipeNew", newRecipe.getRecipeName());


        Log.d("RecipeData", "Recipe Name: " + recipeName +
                ", Recipe Type: " + recipeType +
                ", Recipe Rating: " + recipeRating);

        String token = TokenManager.getToken(this);
        Log.d("Token", "Bearer " + token);


        // Call API
        ApiService apiService = RetrofitClient.getApiService(this);
        Call<RecipeResponseNew> call = apiService.createRecipe(newRecipe, "Bearer " + token);

        call.enqueue(new Callback<RecipeResponseNew>() {
            @Override
            public void onResponse(Call<RecipeResponseNew> call, Response<RecipeResponseNew> response) {
                Log.i("Response Data", response.toString());
                if (response.isSuccessful()) {
                    Toast.makeText(AddRecipeActivity.this, "Recipe added successfully!", Toast.LENGTH_SHORT).show();
                    finish(); // Close the activity
                } else {
                    try {
                        String errorMessage = response.errorBody() != null ? response.errorBody().string() : "Unknown error";
                        Log.e("API_ERROR", "Response Code: " + response.code() + ", Error: " + errorMessage);
                    } catch (Exception e) {

                        Log.e("API_ERROR", response.errorBody().toString());
                    }
                    Toast.makeText(AddRecipeActivity.this, "Failed to add recipe: " + response.message(), Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<RecipeResponseNew> call, Throwable t) {
                Log.e("API_CALL", "Failed to add recipe", t);
                Toast.makeText(AddRecipeActivity.this, "Error: " + t.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });
    }
}
