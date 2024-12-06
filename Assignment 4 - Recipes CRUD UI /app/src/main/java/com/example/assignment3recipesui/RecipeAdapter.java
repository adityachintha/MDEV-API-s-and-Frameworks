package com.example.assignment3recipesui;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
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

        holder.titleTextView.setText(recipe.getRecipeName());
        holder.cuisineTextView.setText(recipe.getCuisine());
        holder.ratingTextView.setText(String.valueOf(recipe.getAverageRating()));
    }

    @Override
    public int getItemCount() {
        return recipes.size();
    }

    // ViewHolder for RecyclerView
    public static class RecipeViewHolder extends RecyclerView.ViewHolder {

        TextView titleTextView;
        TextView cuisineTextView;
        TextView ratingTextView;

        public RecipeViewHolder(View itemView) {
            super(itemView);

            titleTextView = itemView.findViewById(R.id.recipeName);
            cuisineTextView = itemView.findViewById(R.id.cuisine);
            ratingTextView = itemView.findViewById(R.id.rating);
        }
    }
}
