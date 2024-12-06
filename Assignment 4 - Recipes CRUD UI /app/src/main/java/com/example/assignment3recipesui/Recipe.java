package com.example.assignment3recipesui;

import com.google.gson.annotations.SerializedName;

public class Recipe {
    @SerializedName("_id")
    private String id;

    @SerializedName("recipeName")
    private String recipeName;

    @SerializedName("cookingTime")
    private String cookingTime;

    @SerializedName("difficulty")
    private String difficulty;

    @SerializedName("cuisine")
    private String cuisine;

    @SerializedName("description")
    private String description;

    @SerializedName("photoLink")
    private String photoLink;

    @SerializedName("averageRating")
    private double averageRating;

    // Getters
    public String getId() { return id; }
    public String getRecipeName() { return recipeName; }
    public String getCookingTime() { return cookingTime; }
    public String getDifficulty() { return difficulty; }
    public String getCuisine() { return cuisine; }
    public String getDescription() { return description; }
    public String getPhotoLink() { return photoLink; }
    public double getAverageRating() { return averageRating; }

    // Setters
    public void setId(String id) { this.id = id; }
    public void setRecipeName(String recipeName) { this.recipeName = recipeName; }
    public void setCookingTime(String cookingTime) { this.cookingTime = cookingTime; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }
    public void setCuisine(String cuisine) { this.cuisine = cuisine; }
    public void setDescription(String description) { this.description = description; }
    public void setPhotoLink(String photoLink) { this.photoLink = photoLink; }
    public void setAverageRating(double averageRating) { this.averageRating = averageRating; }
}
