package com.example.assignment3recipesui;

import static androidx.core.content.ContextCompat.startActivity;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;

import androidx.recyclerview.widget.RecyclerView;

import java.util.List;

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

    // ViewHolder for RecyclerView
    public static class RecipeViewHolder extends RecyclerView.ViewHolder {

        TextView titleTextView;
        TextView cuisineTextView;
        TextView ratingTextView;
        Button EditButton;

        public RecipeViewHolder(View itemView) {
            super(itemView);

            titleTextView = itemView.findViewById(R.id.recipeName);
            cuisineTextView = itemView.findViewById(R.id.cuisine);
            ratingTextView = itemView.findViewById(R.id.rating);
            EditButton = itemView.findViewById(R.id.EditButton);
        }
    }
}
