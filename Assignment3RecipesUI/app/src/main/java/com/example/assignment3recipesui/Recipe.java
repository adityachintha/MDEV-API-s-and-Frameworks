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
}
