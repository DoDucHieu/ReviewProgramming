<?php

namespace App\Http\Controllers;

use App\Models\Specialty;
use App\Http\Requests\StoreSpecialtyRequest;
use App\Http\Requests\UpdateSpecialtyRequest;

class SpecialtyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $specialties = Specialty::with('subjects.classes')->get();
        return response()->json(['data' => $specialties], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreSpecialtyRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreSpecialtyRequest $request)
    {
        Specialty::create($request->all());
        return response()->json(['message' => "Tạo mới thành công!"], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Specialty  $specialty
     * @return \Illuminate\Http\Response
     */
    public function show($specialtyId)
    {
        $specialty = Specialty::find($specialtyId);

        if (!$specialty) {
            return response()->json(['message' => "Không tìm thấy chuyên khoa!"], 404);
        }

        return response()->json(['data' => $specialty], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateSpecialtyRequest  $request
     * @param  \App\Models\Specialty  $specialty
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateSpecialtyRequest $request, $specialty)
    {
        $specialty = Specialty::find($specialty);

        if (!$specialty) {
            return response()->json(['message' => "Không tìm thấy chuyên khoa!"], 404);
        }

        $specialty->update($request->all());
        return response()->json(['message' => "Cập nhật thành công!"], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Specialty  $specialty
     * @return \Illuminate\Http\Response
     */
    public function destroy($specialtyId)
    {
        $specialty = Specialty::find($specialtyId);

        if (!$specialty) {
            return response()->json(['message' => "Không tìm thấy chuyên khoa!"], 404);
        }

        $specialty->delete();
        return response()->json(['message' => "Xóa thành công!"], 200);
    }
}
