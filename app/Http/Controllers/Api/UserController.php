<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Http\Controllers\Controller;
use App\Http\Requests\Users\UserSignInRequest;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getUsers() 
    {
        return response()->json(User::all());
    }

    public function signIn(UserSignInRequest $request) 
    {
        return response()->json($request);
    }
}
