<?php

namespace App\Http\Controllers;

use App\Models\User;
class UserController extends Controller
{
    public function show(string $id)
    {
        return User::findOrFail($id);
    }
}