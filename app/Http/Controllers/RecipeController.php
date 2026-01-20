<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Recipe;
class RecipeController extends Controller
{
    public function show(string $id)
    {
        return Recipe::findOrFail($id);
    }
}