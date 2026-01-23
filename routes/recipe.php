<?php

use App\Http\Controllers\RecipeController;

Route::get('/recipe/{id}', [RecipeController::class, 'show']);
Route::post('/recipe', [RecipeController::class, 'store']);
Route::put('/recipe/{id}', [RecipeController::class, 'update']);
Route::delete('/recipe/{id}', [RecipeController::class, 'destroy']);
