<?php

namespace App\Enums;

enum IngredientType: string
{
    case Vegetable = 'vegetable';
    case Fruit = 'fruit';
    case Protein = 'protein';
    case Dairy = 'dairy';
    case Grain = 'grain';
    case Spice = 'spice';
}