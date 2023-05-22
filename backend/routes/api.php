<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ArticleController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// user registration and login Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Password Reset Routes
Route::post('/forgotPassword', [AuthController::class, 'sendResetLinkEmail']);
Route::post('/resetPassword', [AuthController::class, 'reset']);

Route::get('/insertNews', [ArticleController::class, 'insertNews']);

Route::get('/articles', [ArticleController::class, 'index']);
Route::get('/customizeInfo', [ArticleController::class, 'customizeInfo']);

Route::get('/checkSetting', [ArticleController::class, 'checkSetting']);
Route::post('/storeSetting', [ArticleController::class, 'storeSetting']);
Route::post('/deleteSetting', [ArticleController::class, 'deleteSetting']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/users', [AuthController::class, 'index']);
    Route::post('/logout', [AuthController::class, 'logout']);
});


// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
