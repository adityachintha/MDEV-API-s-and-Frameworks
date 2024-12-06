package com.example.assignment3recipesui;

import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MainActivity extends AppCompatActivity {
    private RecyclerView recyclerView;
    private RecipeAdapter recipeAdapter;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        recyclerView = findViewById(R.id.recyclerView);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));

        // Ensure adapter is set before calling fetchRecipes
        recipeAdapter = new RecipeAdapter(this, new ArrayList<Recipe>());
        recyclerView.setAdapter(recipeAdapter);

        fetchRecipes();
    }

    private void fetchRecipes() {
        ApiService apiService = RetrofitClient.getApiService();
        Call<List<Recipe>> call = apiService.getRecipes();

        call.enqueue(new Callback<List<Recipe>>() {
            @Override
            public void onResponse(Call<List<Recipe>> call, Response<List<Recipe>> response) {
                if (response.isSuccessful() && response.body() != null && !response.body().isEmpty()) {
                    List<Recipe> recipes = response.body();
                    recipeAdapter = new RecipeAdapter(MainActivity.this, recipes);
                    recyclerView.setAdapter(recipeAdapter);
                } else {
                    Toast.makeText(MainActivity.this, "Failed to load recipes or no recipes available", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<List<Recipe>> call, Throwable t) {
                Toast.makeText(MainActivity.this, "Error: " + t.getMessage(), Toast.LENGTH_LONG).show();
                Log.e("MainActivity", "Error fetching recipes", t);
            }
        });
    }
}
