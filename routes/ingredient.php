<?php

use App\Http\Controllers\IngredientController;

Route::get('/ingredient/{id}', [IngredientController::class, 'show']);
Route::post('/ingredient', [IngredientController::class, 'store']);