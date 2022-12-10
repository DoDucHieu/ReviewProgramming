<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\Student;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $roleId = $request->role_id;
        $specialty_id = request()->specialty_id;
        $limit = $request->limit ?? 100;

        if ($roleId == 'r1') {
            $admins = User::where('role_id', 'r1')->get();
            return UserResource::collection($admins);
        } elseif ($roleId == 'r2') {
            if ($specialty_id) {
                $teachers = Teacher::with('user')->where('specialty_id', $specialty_id)->get();
                return UserResource::collection($teachers);
            }

            $teachers = User::with('teacher')->where('role_id', 'r2')->paginate($limit);
            return UserResource::collection($teachers);
        } elseif ($roleId == 'r3') {
            $students = User::with('student')->where('role_id', 'r3')->paginate($limit);
            return UserResource::collection($students);
        } else {
            return response()->json(['message' => 'Không tìm thấy role_id!'], 404);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreUserRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreUserRequest $request)
    {
        DB::beginTransaction();

        $all = $request->all();
        // hash password
        $all['password'] = bcrypt($all['password']);

        // remove specialty_id out of $all
        unset($all['specialty_id']);

        $user = User::create($all);

        // if save teacher or student fail so rollback user
        try {
            if ($request->role_id == 'r2') {
                $teacher = new Teacher();
                $teacher->user_id = $user->user_id;
                $teacher->specialty_id = $request->specialty_id;
                $teacher->save();
            } elseif ($request->role_id == 'r3') {
                $student = new Student();
                $student->user_id = $user->user_id;
                $student->save();
            }
        } catch (\Exception $e) {
            DB::rollback();

            return response()->json([
                'message' => 'Tạo tài khoản thất bài!',
                'error' => $e->getMessage()
            ], 500);
        }

        DB::commit();

        return response()->json([
            'message' => 'Tạo tài khoản thành công!'
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'message' => 'Không tìm thấy tài khoản!'
            ], 422);
        }

        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateUserRequest  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateUserRequest $request, $userId)
    {
        // $out = new \Symfony\Component\Console\Output\ConsoleOutput();
        // $out->writeln($request->us);

        // check if user exist
        $user = User::find($userId);
        if (!$user) {
            return response()->json([
                'message' => 'Không tìm thấy tài khoản'
            ], 404);
        }

        $user->update($request->all());

        // update teacher or student
        if ($user->role_id == 'r2' && $request->specialty_id) {
            $teacher = Teacher::where('user_id', $user->user_id)->first();
            $teacher->specialty_id = $request->specialty_id;
            $teacher->save();
        } elseif ($user->role_id == 'r3' && $request->GPA) {
            $student = Student::where('user_id', $user->user_id)->first();
            $student->GPA = $request->GPA;
            $student->save();
        }

        return response()->json([
            'message' => 'Cập nhật thành công!'
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy($user)
    {
        $user = User::find($user);

        if (!$user) {
            return response()->json([
                'message' => 'Không tìm thấy tài khoản!'
            ], 404);
        }

        $user->delete();

        return response()->json([
            'message' => 'Xóa tài khoản thành công!'
        ], 200);
    }

    public function upload(Request $request, $userId)
    {
        $request->validate([
            'avatar' => 'mimes:jpg,png,jpeg,svg',
            'email' => ['email', Rule::unique('users')->ignore($userId, 'user_id')]
        ]);

        $user = User::find($userId);

        if (!$user) {
            return response()->json([
                'message' => 'Không tìm thấy người dùng!'
            ], 404);
        }

        if ($request->hasFile('avatar')) {
            $ext = $request->file('avatar')->extension();
            $generate_unique_file_name = md5(time()) . '.' . $ext;
            $request->file('avatar')->move('images', $generate_unique_file_name, 'local');

            $user->avatar = 'images/' . $generate_unique_file_name;
        }

        if ($request->email) $user->email = $request->email;

        $user->save();

        return response()->json([
            'message' => 'Cập nhật thông tin thành công!',
            'data' => $user
        ], 200);
    }
}
