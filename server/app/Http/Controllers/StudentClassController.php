<?php

namespace App\Http\Controllers;

use App\Models\StudentClass;
use App\Http\Requests\StoreStudentClassRequest;
use App\Http\Requests\UpdateStudentClassRequest;
use App\Models\Classes;

class StudentClassController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreStudentClassRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreStudentClassRequest $request)
    {
        StudentClass::create($request->all());

        // update current number of students in class
        $class = Classes::find($request->class_id);
        $class->current_number_students = $class->current_number_students + 1;
        $class->save();

        return response()->json(['message' => "Đăng ký học phần thành công!"], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\StudentClass  $studentClass
     * @return \Illuminate\Http\Response
     */
    public function show(StudentClass $studentClass)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateStudentClassRequest  $request
     * @param  \App\Models\StudentClass  $studentClass
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateStudentClassRequest $request, StudentClass $studentClass)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\StudentClass  $studentClass
     * @return \Illuminate\Http\Response
     */
    public function destroy()
    {
        // find and delete by user_id, class_id
        $studentClass = StudentClass::where('user_id', request()->user_id)->where('class_id', request()->class_id)->first();

        if (!$studentClass) {
            return response()->json([
                'message' => 'Không tìm thấy lớp học!'
            ], 422);
        }

        StudentClass::where('user_id', request()->user_id)->where('class_id', request()->class_id)->delete();

        // update current number of students in class
        $class = Classes::find(request()->class_id);
        $class->current_number_students = $class->current_number_students - 1;
        $class->save();

        return response()->json(['message' => "Hủy đăng ký học phần thành công!"], 200);
    }
}
