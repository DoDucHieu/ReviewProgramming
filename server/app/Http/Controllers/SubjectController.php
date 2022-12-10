<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Subject;
use App\Http\Requests\StoreSubjectRequest;
use App\Http\Requests\UpdateSubjectRequest;
use App\Http\Resources\SubjectResource;
use App\Models\Specialty;

class SubjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // $specialty_id = request()->specialty_id;
        $limit = request()->limit ?? 100;

        // if ($specialty_id) {
        //     $subjects = Specialty::find($specialty_id)->subjects;
        //     return SubjectResource::collection($subjects);
        // }

        return SubjectResource::collection(Subject::with('specialty', 'credit')->paginate($limit));
        // return SubjectResource::collection(Subject::with('credit')->paginate($limit));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreSubjectRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreSubjectRequest $request)
    {
        Subject::create($request->all());
        return response()->json(['message' => "Tạo mới môn học thành công!"], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Subject  $subject
     * @return \Illuminate\Http\Response
     */
    public function show($subjectId)
    {
        $subject = Subject::find($subjectId);

        if (!$subject) {
            return response()->json(['message' => "Không tìm thấy môn học!"], 404);
        }

        return new SubjectResource($subject);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateSubjectRequest  $request
     * @param  \App\Models\Subject  $subject
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateSubjectRequest $request, Subject $subject)
    {
        $subject->update($request->all());
        return response()->json(['message' => "Cập nhật môn học thành công!"], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Subject  $subject
     * @return \Illuminate\Http\Response
     */
    public function destroy(Subject $subject)
    {
        $subject->delete();
        return response()->json(['message' => "Xóa môn học thành công!"], 200);
    }
}
