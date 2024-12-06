package com.example.assignment3recipesui;

import java.util.List;
import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.DELETE;
import retrofit2.http.Path;
import retrofit2.http.Body;
import retrofit2.http.Query;


public interface ApiService {
    // User APIs
    @POST("/user/register")
    Call<RegisterResponseNew> registerUser(@Body RegisterRequestNew request);

    @POST("/user/login")
    Call<LoginResponse> loginUser(
            @Body LoginRequest loginRequest
    );
    @GET("/user/logout")
    Call<Void> logoutUser();


    //Recipe APIs

    // Recipe APIs
    @GET("/recipes/")
    Call<List<RecipeResponseNew>> getRecipes();

//    @GET("/recipes/{id}")
//    Call<RecipeResponseNew> getRecipeById(@Path("id") String id);

    @POST("/recipes/create")
    Call<RecipeResponseNew> createRecipe(@Body Recipe recipe);

    @PUT("/recipes/update/{id}")
    Call<RecipeResponseNew> updateRecipe(@Path("id") String id, @Body Recipe recipe);

    @DELETE("/recipes/delete/{id}")
    Call<Void> deleteRecipe(@Path("id") String id);
}
