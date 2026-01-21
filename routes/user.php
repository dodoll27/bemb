<?php

use App\Http\Controllers\UserController;

Route::post('/user', [UserController::class, 'store']);
Route::get('/user/{id}', [UserController::class, 'show']);
