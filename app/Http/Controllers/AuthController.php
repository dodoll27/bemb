<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Models\User;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $loginValue = $request->login;

        if (filter_var($loginValue, FILTER_VALIDATE_EMAIL)) {
            $user = User::where('email', $loginValue)->first();

        } else {
            $user = User::where('username', $loginValue)->first();
        }

        if ($user && password_verify($request->password, $user->password)) {
            $authToken = $user->createToken('token-name')->plainTextToken;

            return response()->json(['message' => 'Login successful', 'user' => $user, 'token' => $authToken], 200);
        } else {
            return response()->json(['error' => 'Invalid credentials'], 401);
        }
    }
}
