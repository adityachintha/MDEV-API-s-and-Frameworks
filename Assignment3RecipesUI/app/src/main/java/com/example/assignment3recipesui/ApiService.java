package com.example.assignment3recipesui;

import java.util.List;
import retrofit2.Call;
import retrofit2.http.GET;

public interface ApiService {
    @GET("recipe/")
    Call<List<Recipe>> getRecipes();
}
