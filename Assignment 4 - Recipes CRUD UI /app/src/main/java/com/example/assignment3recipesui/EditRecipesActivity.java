package com.example.assignment3recipesui;

import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

import androidx.appcompat.app.AppCompatActivity;

public class EditRecipesActivity extends AppCompatActivity {

    private EditText recipeNameInput, recipeTypeInput, recipeRatingInput;
    private Button saveRecipeButton;
    private String recipeId;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_edit_recipe);

        // Initialize views
        recipeNameInput = findViewById(R.id.editRecipeName);
        recipeTypeInput = findViewById(R.id.editRecipeType);
        recipeRatingInput = findViewById(R.id.editRecipeRating);
        saveRecipeButton = findViewById(R.id.saveRecipeButton);

        // Get data from Intent
        Intent intent = getIntent();
        recipeId = intent.getStringExtra("recipeId");
        String recipeName = intent.getStringExtra("recipeName");
        String recipeType = intent.getStringExtra("cuisine");
        double recipeRating = intent.getDoubleExtra("rating", 0.0);

        // Set the data in EditTexts
        recipeNameInput.setText(recipeName);
        recipeTypeInput.setText(recipeType);
        recipeRatingInput.setText(String.valueOf(recipeRating));

        // Handle Save button click
        saveRecipeButton.setOnClickListener(v -> saveRecipe());
    }

    private void saveRecipe() {
        String updatedName = recipeNameInput.getText().toString();
        String updatedType = recipeTypeInput.getText().toString();
        int updatedRating = (int) Math.round(Double.parseDouble(recipeRatingInput.getText().toString())); // Convert to integer


        // Create Recipe object for update
        Recipe updatedRecipe = new Recipe(recipeId, updatedName, updatedType, updatedRating);

        // Call API to update recipe
        ApiService apiService = RetrofitClient.getApiService(this);
        Call<RecipeResponseNew> call = apiService.updateRecipe(recipeId, updatedRecipe);

        call.enqueue(new Callback<RecipeResponseNew>() {
            @Override
            public void onResponse(Call<RecipeResponseNew> call, Response<RecipeResponseNew> response) {
                if (response.isSuccessful()) {
                    Toast.makeText(EditRecipesActivity.this, "Recipe updated successfully!", Toast.LENGTH_SHORT).show();
                    finish(); // Close EditRecipeActivity
                } else {
                    Toast.makeText(EditRecipesActivity.this, "Error updating recipe", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<RecipeResponseNew> call, Throwable t) {
                Toast.makeText(EditRecipesActivity.this, "Failed to update: " + t.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });
    }
}
