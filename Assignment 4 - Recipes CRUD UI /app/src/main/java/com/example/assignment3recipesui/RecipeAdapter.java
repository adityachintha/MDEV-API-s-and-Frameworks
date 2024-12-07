package com.example.assignment3recipesui;

import static androidx.core.content.ContextCompat.startActivity;

import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import androidx.recyclerview.widget.RecyclerView;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class RecipeAdapter extends RecyclerView.Adapter<RecipeAdapter.RecipeViewHolder> {

    private Context context;
    private List<Recipe> recipes;

    public RecipeAdapter(Context context, List<Recipe> recipes) {
        this.context = context;
        this.recipes = recipes;
    }

    @Override
    public RecipeViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.recipe_items, parent, false);
        return new RecipeViewHolder(view);
    }

    @Override
    public void onBindViewHolder(RecipeViewHolder holder, int position) {
        Recipe recipe = recipes.get(position);

        // Bind data to the views
        holder.titleTextView.setText(recipe.getRecipeName());
        holder.cuisineTextView.setText(recipe.getCuisine());
        holder.ratingTextView.setText(String.valueOf(recipe.getAverageRating()));

        // Set the click listener for the EditButton
        holder.EditButton.setOnClickListener(v -> {
            Intent intent = new Intent(context, EditRecipesActivity.class);
            intent.putExtra("recipeId", recipe.getId());
            intent.putExtra("recipeName", recipe.getRecipeName());
            intent.putExtra("cuisine", recipe.getCuisine());
            intent.putExtra("rating", recipe.getAverageRating());
            context.startActivity(intent);
        });

        // Handle Delete Button Click
        holder.deleteButton.setOnClickListener(v -> {
            deleteRecipe(recipe.getId(), holder.getAdapterPosition());
        });
    }

    @Override
    public int getItemCount() {
        return recipes.size();
    }

    // Method to update the data in the adapter
    public void updateData(List<Recipe> newRecipes) {
        this.recipes.clear();
        this.recipes.addAll(newRecipes);
        notifyDataSetChanged();
    }

    // Delete Recipe from the list
    private void deleteRecipe(String recipeId, int position) {
        ApiService apiService = RetrofitClient.getApiService(context);

        // Retrieve the token
        String token = TokenManager.getToken(context);

        Call<Void> call = apiService.deleteRecipe(recipeId, "Bearer " + token);
        call.enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {
                if (response.isSuccessful()) {
                    recipes.remove(position);
                    notifyItemRemoved(position);
                    Toast.makeText(context, "Recipe deleted successfully!", Toast.LENGTH_SHORT).show();
                } else {
                    Toast.makeText(context, "Failed to delete recipe", Toast.LENGTH_SHORT).show();
                    Log.e("Delete Error", "Response code: " + response.code());
                }
            }

            @Override
            public void onFailure(Call<Void> call, Throwable t) {
                Toast.makeText(context, "Error: " + t.getMessage(), Toast.LENGTH_SHORT).show();
                Log.e("Delete Failure", t.getMessage());
            }
        });
    }


    // ViewHolder for RecyclerView
    public static class RecipeViewHolder extends RecyclerView.ViewHolder {

        TextView titleTextView;
        TextView cuisineTextView;
        TextView ratingTextView;
        Button EditButton;
        Button deleteButton;

        public RecipeViewHolder(View itemView) {
            super(itemView);

            titleTextView = itemView.findViewById(R.id.recipeName);
            cuisineTextView = itemView.findViewById(R.id.cuisine);
            ratingTextView = itemView.findViewById(R.id.rating);
            EditButton = itemView.findViewById(R.id.EditButton);
            deleteButton = itemView.findViewById(R.id.deleteButton);
        }
    }
}
