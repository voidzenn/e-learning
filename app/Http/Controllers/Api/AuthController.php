<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $credentials = $request->only('email', 'password');
        if (Auth::attempt($credentials)) {
            $token = auth()->user()->createToken('api_token')->plainTextToken;

            return response()->json(['errors' => false, 'status' => '200', 'token' => $token, 'user_auth' => Auth::user()]);
        }

        return response()->json(['errors' => true, 'message' => 'Wrong Email or Password']);
    }

    public function register(RegisterRequest $request)
    {
        if (!$request->validated()) {
            return response()->json(['error' => true, 'message' => 'Error...Please, Try Again']);
        }

        $user = User::create([
            'fname' => $request->fname,
            'lname' => $request->lname,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = $user->createToken('api_token')->plainTextToken;

        return response()->json(['error' => false, 'message' => 'Succesfully Registered.', 'api_token' => $token]);
    }

    public function logout(User $user)
    {
        $user->tokens()->delete();

        return response()->json(['error' => false, 'message' => 'You are logged out']);
    }
}
