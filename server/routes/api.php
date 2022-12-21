<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClassController;
use App\Http\Controllers\CreditController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\NewController;
use App\Http\Controllers\SpecialtyController;
use App\Http\Controllers\StudentClassController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\VideoController;
use Illuminate\Support\Facades\Route;

// public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// private routes
// Route::group(["middleware" => ["auth:sanctum"]], function () {
  Route::post('/logout', [AuthController::class, 'logout']);

  Route::post('/users/upload/{userId}', [UserController::class, 'upload']);
  Route::apiResource('/users', UserController::class);
  Route::apiResource('/teachers', TeacherController::class);
  Route::apiResource('/students', StudentController::class);

  Route::put('/student-class/delete', [StudentClassController::class, 'destroy']);
  Route::apiResource('/student-class', StudentClassController::class)->except('destroy');

  Route::apiResource('/specialties', SpecialtyController::class);
  Route::apiResource('/subjects', SubjectController::class);
  Route::apiResource('/classes', ClassController::class);
  Route::apiResource('/documents', DocumentController::class);
  Route::apiResource('/credits', CreditController::class);

  Route::patch('/news/active/{newId}', [NewController::class, 'active']);
  Route::get('/news/waiting', [NewController::class, 'waiting']);
  Route::post('/news/{newId}', [NewController::class, 'update']);
  Route::apiResource('/news', NewController::class)->except('update');

  Route::patch('/videos/active/{videoId}', [VideoController::class, 'active']);
  Route::get('/videos/waiting', [VideoController::class, 'waiting']);
  Route::post('/videos/{videoId}', [VideoController::class, 'update']);
  Route::apiResource('/videos', VideoController::class)->except('update');
// });
