<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::prefix('v1')->group(function() {
    Route::post('sign-in', [\App\Http\Controllers\Api\AuthController::class, 'login']);
    Route::post('sign-up', [\App\Http\Controllers\Api\AuthController::class, 'register']);

    Route::middleware('auth:sanctum')->group(function() {
        // Route::get();
    });
});