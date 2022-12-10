<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Teacher;
use App\Http\Requests\StoreTeacherRequest;
use App\Http\Requests\UpdateTeacherRequest;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\DB;

class TeacherController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $limit = request()->limit ?? 100;
        $subject_id = request()->subject_id;

        if ($subject_id) {
            $teachers = Teacher::with("teacherSubjects", "user")->whereHas(
                "teacherSubjects",
                function ($query) use ($subject_id) {
                    $query->where("subject_id", $subject_id);
                }
            )->get();

            return UserResource::collection($teachers);
        }

        $teachers = User::where('role_id', 'r2')->with('teacher.specialty')->paginate($limit);
        // $teachers = User::where('role_id', 'r2')->paginate($limit);
        return UserResource::collection($teachers);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreTeacherRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreUserRequest $request)
    {
        DB::beginTransaction();

        try {
            $all = $request->all();
            $all['role_id'] = 'r2';
            // hash password
            $all['password'] = bcrypt($all['password']);
            $user = User::create($all);

            $teacher = new Teacher();
            $teacher->user_id = $user->user_id;
            $teacher->specialty_id = $request->specialty_id;
            $teacher->save();
        } catch (\Exception $e) {
            DB::rollback();

            return response()->json([
                'message' => 'Tạo tài khoản giáo viên thất bại!',
                'error' => $e->getMessage()
            ], 500);
        }

        DB::commit();

        return response()->json([
            'message' => 'Tạo tài khoản giáo viên thành công!'
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Teacher  $teacher
     * @return \Illuminate\Http\Response
     */
    public function show($userId)
    {
        $user = User::with('teacher.classes.subject')->find($userId);
        // $user = User::with('teacher.teacherSubjects.subject', 'teacher.teacherSubjects.classes')->find($userId);

        if (!$user) {
            return response()->json([
                'message' => 'Không tìm thấy giáo viên!'
            ], 422);
        }

        return response()->json([
            'data' => $user
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateTeacherRequest  $request
     * @param  \App\Models\Teacher  $teacher
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateUserRequest $request, $user)
    {
        // check if user exist
        $user = User::find($user);

        if (!$user) {
            return response()->json([
                'message' => 'Không tìm thấy giáo viên!'
            ], 404);
        }

        $user->update($request->all());

        // update teacher
        if ($request->specialty_id) {
            $teacher = Teacher::where('user_id', $user->user_id)->first();
            $teacher->specialty_id = $request->specialty_id;
            $teacher->save();
        }

        return response()->json([
            'message' => 'Cập nhật giáo viên thành công!'
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Teacher  $teacher
     * @return \Illuminate\Http\Response
     */
    public function destroy($userId)
    {
        $user = User::find($userId);

        if (!$user) {
            return response()->json([
                'message' => 'Không tìm thấy giáo viên!'
            ], 404);
        }

        $user->delete();

        return response()->json([
            'message' => 'Xóa giáo viên thành công!'
        ], 200);
    }
}
