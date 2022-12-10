<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClassController;
use App\Http\Controllers\CreditController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\SpecialtyController;
use App\Http\Controllers\StudentClassController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\StudentController;
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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

// // public routes
// Route::post('/login', [AuthController::class, 'login']);

// Route::get('/users', [UserController::class, 'index']);
// Route::get('/users/{user_id}', [UserController::class, 'show']);

// Route::get('/teachers', [TeacherController::class, 'index']);
// Route::get('/teachers/{teacher_id}', [TeacherController::class, 'show']);

// Route::get('/students', [StudentController::class, 'index']);
// Route::get('/students/{student_id}', [StudentController::class, 'show']);

// Route::get('/classes', [ClassController::class, 'index']);
// Route::get('/classes/{class_id}', [ClassController::class, 'show']);

// Route::get('/subjects', [SubjectController::class, 'index']);
// Route::get('/subjects/{subject_id}', [SubjectController::class, 'show']);

// Route::get('/credits', [CreditController::class, 'index']);
// Route::get('/credits/{credit_id}', [CreditController::class, 'show']);

// // private routes
// Route::group(["middleware" => ["auth:sanctum"]], function () {
//   Route::post('/logout', [AuthController::class, 'logout']);

//   Route::post('/users', [UserController::class, 'store']);
//   Route::put('/users/{user_id}', [UserController::class, 'update']);
//   Route::delete('/users/{user_id}', [UserController::class, 'destroy']);

//   Route::post('/teachers', [TeacherController::class, 'store']);
//   Route::put('/teachers/{teacher_id}', [TeacherController::class, 'update']);
//   Route::delete('/teachers/{teacher_id}', [TeacherController::class, 'destroy']);

//   Route::post('/students', [StudentController::class, 'store']);
//   Route::put('/students/{student_id}', [StudentController::class, 'update']);
//   Route::delete('/students/{student_id}', [StudentController::class, 'destroy']);

//   Route::post('/classes', [ClassController::class, 'store']);
//   Route::put('/classes/{class_id}', [ClassController::class, 'update']);
//   Route::delete('/classes/{class_id}', [ClassController::class, 'destroy']);

//   Route::post('/subjects', [SubjectController::class, 'store']);
//   Route::put('/subjects/{subject_id}', [SubjectController::class, 'update']);
//   Route::delete('/subjects/{subject_id}', [SubjectController::class, 'destroy']);

//   Route::post('/credits', [CreditController::class, 'store']);
//   Route::put('/credits/{credit_id}', [CreditController::class, 'update']);
//   Route::delete('/credits/{credit_id}', [CreditController::class, 'destroy']);
// });

// public routes
Route::post('/login', [AuthController::class, 'login']);

// private routes
Route::group(["middleware" => ["auth:sanctum"]], function () {
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
});
