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

Route::prefix("v1")->group(function () {
    // Auth routes
    Route::post("sign-in", [
        \App\Http\Controllers\Api\AuthController::class,
        "login",
    ]);
    Route::post("sign-up", [
        \App\Http\Controllers\Api\AuthController::class,
        "register",
    ]);
    Route::post("{user}/sign-out", [
        \App\Http\Controllers\Api\AuthController::class,
        "logout",
    ]);

    Route::middleware("auth:sanctum")->group(function () {
        // Users routes
        Route::prefix("users")->group(function () {
            Route::get("/", [
                \App\Http\Controllers\Api\UserController::class,
                "index",
            ]);
            Route::get("/{user_id}/show", [
                \App\Http\Controllers\Api\UserController::class,
                "show",
            ]);
            Route::put("/{user}/changeRole", [
                \App\Http\Controllers\Api\UserController::class,
                "changeRole",
            ]);
            Route::put("/{user}/update", [
                \App\Http\Controllers\Api\UserController::class,
                "updateUser",
            ]);
            Route::put("/{user}/update-password", [
                \App\Http\Controllers\Api\UserController::class,
                "updatePassword",
            ]);
        });
        // Category routes
        Route::prefix("categories")->group(function () {
            Route::get("/", [
                \App\Http\Controllers\Api\CategoryController::class,
                "index",
            ]);
            Route::get("/{category}/show", [
                \App\Http\Controllers\Api\CategoryController::class,
                "show",
            ]);
            Route::get("/all", [
                \App\Http\Controllers\Api\CategoryController::class,
                "showAll",
            ]);
            Route::post("/store", [
                \App\Http\Controllers\Api\CategoryController::class,
                "store",
            ]);
            Route::put("/{category}/update", [
                \App\Http\Controllers\Api\CategoryController::class,
                "update",
            ]);
            Route::delete("/{category}/delete", [
                \App\Http\Controllers\Api\CategoryController::class,
                "destroy",
            ]);
        });
        // Word routes
        Route::prefix("words")->group(function () {
            Route::get("/", [
                \App\Http\Controllers\Api\WordController::class,
                "index",
            ]);
            Route::get("/{category_id}/show", [
                \App\Http\Controllers\Api\WordController::class,
                "show",
            ]);
            Route::post("/store", [
                \App\Http\Controllers\Api\WordController::class,
                "store",
            ]);
            Route::put("/{word}/update", [
                \App\Http\Controllers\Api\WordController::class,
                "update",
            ]);
            Route::delete("/{word}/delete", [
                \App\Http\Controllers\Api\WordController::class,
                "destroy",
            ]);
        });
        // Lesson Routes
        Route::prefix("lessons")->group(function () {
            Route::post("/store-category-user", [
                App\Http\Controllers\Api\LessonController::class,
                "storeCategoryUser",
            ]);
            Route::put("/update-complete", [
                App\Http\Controllers\Api\LessonController::class,
                "updateComplete",
            ]);
            Route::get("/get-all-category-user", [
                App\Http\Controllers\Api\LessonController::class,
                "getAllCategoryUser",
            ]);
            Route::get("/check-category-user", [
                App\Http\Controllers\Api\LessonController::class,
                "checkCategoryUser",
            ]);
            Route::get("/check-answer-user", [
                App\Http\Controllers\Api\LessonController::class,
                "checkAnswerUser",
            ]);
            Route::get("/{user_id}/get-words", [
                \App\Http\Controllers\Api\LessonController::class,
                "getWords",
            ]);
            Route::post("/store-answer-user", [
                App\Http\Controllers\Api\LessonController::class,
                "storeAnswerUser",
            ]);
            Route::get("/get-answers", [
                \App\Http\Controllers\Api\LessonController::class,
                "getAnswers",
            ]);
            Route::get("/get-all-answers", [
                \App\Http\Controllers\Api\LessonController::class,
                "getAllAnswers",
            ]);
        });
        //Follow Routes
        Route::prefix("follows")->group(function () {
            Route::get("/{user_id}/show", [
                App\Http\Controllers\Api\FollowController::class,
                "show",
            ]);
            Route::post("/store", [
                App\Http\Controllers\Api\FollowController::class,
                "store",
            ]);
            Route::delete("/destroy", [
                App\Http\Controllers\Api\FollowController::class,
                "destroy",
            ]);
        });
        // Activity Routes
        Route::prefix("activities")->group(function () {
            Route::get("/", [
                App\Http\Controllers\Api\ActivityController::class,
                "index",
            ]);
            Route::get("/{user_id}/show", [
                App\Http\Controllers\Api\ActivityController::class,
                "show",
            ]);
        });
        // File Routes
        Route::prefix("files")->group(function () {
            Route::post("/upload-image", [
                App\Http\Controllers\Api\FileUploadController::class,
                "uploadImage",
            ]);
        });
    });
});
