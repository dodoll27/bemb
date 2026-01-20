<?php

use App\Http\Controllers\IngredientController;

Route::get('/ingredient/{id}', [IngredientController::class, 'show']);