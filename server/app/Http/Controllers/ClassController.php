<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Classes;
use App\Http\Requests\StoreClassesRequest;
use App\Http\Requests\UpdateClassesRequest;
use App\Http\Resources\ClassResource;

class ClassController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $limit = request()->limit ?? 100;
        $sort_by = request()->sort_by ?? 'created_at';
        $order = request()->order ?? 'asc';

        // return ClassResource::collection(Classes::with('teacherSubject.teacher.user', 'teacherSubject.subject')->orderBy($sort_by, $order)->paginate($limit));
        return ClassResource::collection(Classes::with('teacher.user', 'subject')->orderBy($sort_by, $order)->paginate($limit));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreClassesRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreClassesRequest $request)
    {
        Classes::create($request->all());

        return response()->json([
            'message' => 'Tạo lớp học thành công!'
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Classes  $classes
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        // $class = Classes::with('documents', 'teacherSubject.teacher.user')->find($id);
        $class = Classes::with('documents', 'teacher.user')->find($id);

        if (!$class) {
            return response()->json([
                'message' => 'Không tìm thấy lớp học!'
            ], 422);
        }

        $class->specialty_id = $class->subject->specialty_id;

        return new ClassResource($class);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateClassesRequest  $request
     * @param  \App\Models\Classes  $classes
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateClassesRequest $request, $classId)
    {
        $class = Classes::find($classId);

        if (!$class) {
            return response()->json([
                'message' => 'Không tìm thấy lớp học!'
            ], 422);
        }

        $class->update($request->all());

        return response()->json([
            'message' => 'Cập nhật lớp học thành công!'
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Classes  $classes
     * @return \Illuminate\Http\Response
     */
    public function destroy($classId)
    {
        $class = Classes::find($classId);

        if (!$class) {
            return response()->json([
                'message' => 'Không tìm thấy lớp học!'
            ], 422);
        }

        $class->delete();

        return response()->json([
            'message' => 'Xóa lớp học thành công!'
        ], 200);
    }
}
