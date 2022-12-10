<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Http\Requests\StoreStudentRequest;
use App\Http\Requests\UpdateStudentRequest;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $limit = request()->limit ?? 100;

        $students = User::with('student')->where('role_id', 'r3')->paginate($limit);
        return UserResource::collection($students);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreStudentRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreUserRequest $request)
    {
        DB::beginTransaction();

        try {
            $all = $request->all();
            $all['role_id'] = 'r3';
            // hash password
            $all['password'] = bcrypt($all['password']);
            $user = User::create($all);

            $student = new Student();
            $student->user_id = $user->user_id;
            $student->save();
        } catch (\Exception $e) {
            DB::rollback();

            return response()->json([
                'message' => 'Tạo tài khoản sinh viên thất bại!',
                'error' => $e->getMessage()
            ], 500);
        }

        DB::commit();

        return response()->json([
            'message' => 'Tạo tài khoản sinh viên thành công!'
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function show($userId)
    {
        $user = User::with('student.studentClass.class.subject')->find($userId);
        // $user = User::with('student.studentClass.class.teacherSubject.subject')->find($userId);

        if (!$user) {
            return response()->json([
                'message' => 'Không tìm thấy sinh viên!'
            ], 422);
        }

        return response()->json([
            'data' => $user
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateStudentRequest  $request
     * @param  \App\Models\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateUserRequest $request, $user)
    {
        // check if user exist
        $user = User::find($user);
        if (!$user) {
            return response()->json([
                'message' => 'Không tìm thấy sinh viên!'
            ], 404);
        }

        $user->update($request->all());

        if ($request->GPA) {
            $student = Student::find($user->user_id);
            $student->GPA = $request->GPA;
            $student->save();
        }

        return response()->json([
            'message' => 'Cập nhật sinh viên thành công!'
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function destroy($userId)
    {
        $user = User::find($userId);

        if (!$user) {
            return response()->json([
                'message' => 'Không tìm thấy sinh viên!'
            ], 404);
        }

        $user->delete();

        return response()->json([
            'message' => 'Xóa sinh viên thành công!'
        ], 200);
    }
}
