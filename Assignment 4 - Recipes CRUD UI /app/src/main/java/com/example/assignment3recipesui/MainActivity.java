package com.example.assignment3recipesui;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import java.util.ArrayList;


public class MainActivity extends AppCompatActivity {
    private RecyclerView recyclerView;
    private RecipeAdapter recipeAdapter;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Initialize RecyclerView
        recyclerView = findViewById(R.id.recyclerView);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));

        // Initialize Adapter
        recipeAdapter = new RecipeAdapter(this, new ArrayList<>());
        recyclerView.setAdapter(recipeAdapter);

        // Fetch Recipes
        fetchRecipes();
    }

    private void fetchRecipes() {
        ApiService apiService = RetrofitClient.getApiService(this);
        Call<List<RecipeResponseNew>> call = apiService.getRecipes();

        call.enqueue(new Callback<List<RecipeResponseNew>>() {
            @Override
            public void onResponse(Call<List<RecipeResponseNew>> call, Response<List<RecipeResponseNew>> response) {
                if (response.isSuccessful() && response.body() != null && !response.body().isEmpty()) {
                    List<Recipe> recipes = new ArrayList<>();
                    for (RecipeResponseNew recipeResponseNew : response.body()) {
                        String id = recipeResponseNew.getId();
                        String recipeName = recipeResponseNew.getRecipeName();
                        String cuisine= recipeResponseNew.getCuisine();
                        Double rating = recipeResponseNew.getAverageRating();

                        Recipe recipe = new Recipe(id, recipeName, cuisine, rating);

                        recipe.setId(recipeResponseNew.getId());
                        recipe.setRecipeName(recipeResponseNew.getRecipeName());
                        recipe.setCookingTime(recipeResponseNew.getCookingTime());
                        recipe.setDifficulty(recipeResponseNew.getDifficulty());
                        recipe.setCuisine(recipeResponseNew.getCuisine());
                        recipe.setDescription(recipeResponseNew.getDescription());
                        recipe.setPhotoLink(recipeResponseNew.getPhotoLink());
                        recipe.setAverageRating(recipeResponseNew.getAverageRating());
                        recipes.add(recipe);
                    }
                    recipeAdapter.updateData(recipes);
                } else {
                    Toast.makeText(MainActivity.this, "Failed to load recipes or no recipes available", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<List<RecipeResponseNew>> call, Throwable t) {
                Toast.makeText(MainActivity.this, "Error: " + t.getMessage(), Toast.LENGTH_LONG).show();
                Log.e("MainActivity", "Error fetching recipes", t);
            }
        });
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu
        getMenuInflater().inflate(R.menu.main_menu, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        if (item.getItemId() == R.id.logout) { // Handle Logout Option
            // Clear the token
            TokenManager.clearToken(this);

            // Navigate back to LoginActivity
            Intent intent = new Intent(MainActivity.this, LoginActivity.class);
            startActivity(intent);
            finish(); // Close MainActivity
            return true;
        }
        return super.onOptionsItemSelected(item);
    }
}
