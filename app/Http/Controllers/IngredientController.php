<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Ingredient;
class IngredientController extends Controller
{
    public function show(string $id)
    {
        return Ingredient::findOrFail($id);
    }
    public function store(Request $request)
    {
        $ingredient = Ingredient::create($request->all());
        return response()->json($ingredient, 201);
    }
}