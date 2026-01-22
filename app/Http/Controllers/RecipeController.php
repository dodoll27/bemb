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

    public function store(Request $request)
    {
        $recipe = Recipe::create($request->all());
        return response()->json($recipe, 201);
    }

    public function update(Request $request, string $id)
    {
        $recipe = Recipe::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'instructions' => 'sometimes|string',
            'nutritionalValue' => 'sometimes|array',
            'isPrivate' => 'sometimes|boolean',
        ]);

        $recipe->update($validated);

        return response()->json($recipe);
    }

    public function destroy(string $id)
    {
        $recipe = Recipe::findOrFail($id);
        $recipe->delete();
        return response()->json(null, 204);
    }
}