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
    Route::post('{user}/sign-out', [\App\Http\Controllers\Api\AuthController::class, 'logout']);

    Route::middleware('auth:sanctum')->group(function() {
        Route::get('categories', [\App\Http\Controllers\Api\CategoryController::class, 'index']);
        Route::post('categories/store', [\App\Http\Controllers\Api\CategoryController::class, 'store']);
        Route::put('categories/{category}/update', [\App\Http\Controllers\Api\CategoryController::class, 'update']);
        Route::delete('categories/{category}/delete', [\App\Http\Controllers\Api\CategoryController::class, 'destroy']);
    });
});