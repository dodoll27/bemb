<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
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

    public function signup(SignupRequest $request)
    {
        $user = User::create([
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'username' => $request->username,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        $authToken = $user->createToken('token-name')->plainTextToken;

        return response()->json(['message' => 'Signup successful', 'user' => $user, 'token' => $authToken], 201);
    }
}
