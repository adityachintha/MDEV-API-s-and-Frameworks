package com.example.assignment3recipesui;

import java.util.concurrent.TimeUnit;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.logging.HttpLoggingInterceptor;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;
import android.content.Context;
import android.util.Log;

public class RetrofitClient {

    private static final String BASE_URL = "https://mdev-api-s-and-frameworks-recipes-ui.onrender.com/";
    private static Retrofit retrofit;

    public static ApiService getApiService(Context context) {
        if (retrofit == null) {
            // Logging Interceptor for debugging HTTP calls
            HttpLoggingInterceptor loggingInterceptor = new HttpLoggingInterceptor();
            loggingInterceptor.setLevel(HttpLoggingInterceptor.Level.BODY);

            // Create an OkHttpClient with timeout settings and JWT interceptor
            OkHttpClient okHttpClient = new OkHttpClient.Builder()
                    .addInterceptor(chain -> {
                        Request request = chain.request();
                        Request.Builder requestBuilder = request.newBuilder();

                        // Retrieve the token from TokenManager
                        String token = TokenManager.getToken(context);
                        if (token != null) {
                            requestBuilder.addHeader("Authorization", "Bearer " + token);
                            Log.d("RetrofitClient", "Authorization token added: " + token);
                        } else {
                            Log.d("RetrofitClient", "No token found in TokenManager");
                        }

                        return chain.proceed(requestBuilder.build());
                    })
                    .addInterceptor(loggingInterceptor) // Log all requests and responses
                    .connectTimeout(60, TimeUnit.SECONDS)
                    .writeTimeout(60, TimeUnit.SECONDS)
                    .readTimeout(60, TimeUnit.SECONDS)
                    .build();

            // Create the Retrofit instance
            retrofit = new Retrofit.Builder()
                    .baseUrl(BASE_URL)
                    .client(okHttpClient)
                    .addConverterFactory(GsonConverterFactory.create())
                    .build();
        }
        return retrofit.create(ApiService.class);
    }
}
