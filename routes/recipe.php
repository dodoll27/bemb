<?php

use App\Http\Controllers\RecipeController;

Route::get('/recipe/{id}', [RecipeController::class, 'show']);
Route::post('/recipe', [RecipeController::class, 'store']);
