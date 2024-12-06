package com.example.assignment3recipesui;

import java.util.List;
import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.DELETE;
import retrofit2.http.Path;
import retrofit2.http.Body;

public interface ApiService {
    // User APIs
    @POST("/user/register")
    Call<RegisterResponse> registerUser(@Body RegisterRequest request);

    @POST("/user/login")
    Call<LoginResponse> loginUser(@Body LoginRequest request);

    @GET("/user/logout")
    Call<Void> logoutUser();


    //Recipe APIs

    @GET("/recipes/")
    Call<List<Recipe>> getRecipes();
    @GET("/recipes/{id}")
    Call<Recipe> getRecipeById(@Path("id") String id);

    @POST("/recipes/create")
    Call<RecipeResponse> createRecipe(@Body Recipe recipe);

    @PUT("/recipes/update/{id}")
    Call<RecipeResponse> updateRecipe(@Path("id") String id, @Body Recipe recipe);

    @DELETE("/recipes/delete/{id}")
    Call<Void> deleteRecipe(@Path("id") String id);
}
