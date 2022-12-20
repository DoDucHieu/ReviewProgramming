<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Video;
use Illuminate\Http\Request;

class VideoController extends Controller
{
    public function index()
    {
        $records = Video::with(['author'])->where('is_approve', true)->orderByDesc('created_at')->get();
        return response()->json(['data' => $records], 200);
    }

    public function waiting()
    {
        $records = Video::with(['author'])->where('is_approve', false)->orderByDesc('created_at')->get();
        return response()->json(['data' => $records], 200);
    }

    public function active($videoId)
    {
        $news = Video::find($videoId);

        if (!$news) {
            return response()->json([
                'message' => 'Không tìm thấy video!'
            ], 404);
        }

        $news->is_approve = true;
        $news->save();

        return response()->json([
            'message' => 'Sét duyệt video thành công!'
        ], 200);
    }

    public function store()
    {
        $record = Video::where('title', request()->title)->first();
        if ($record) {
            return response([
                'message' => 'Video đã tồn tại!'
            ], 409);
        }

        if (!request()->user_id) {
            return response([
                'message' => 'Thiếu trường "user_id"!'
            ], 422);
        }

        $user = User::where('user_id', request()->user_id)->first();
        if (!$user) {
            return response([
                'message' => 'User không tồn tại!'
            ], 409);
        }

        $body = request()->all();
        if ($user->role_id != 'r1') {
            $body['is_approve'] = false;
        }

        Video::create($body);

        return response()->json([
            'message' => 'Tạo mới video thành công!',
        ], 201);
    }

    public function show($newsId)
    {
        $record = Video::with(['author'])->where('id', $newsId)->get();
        if (!$record) {
            return response([
                'message' => 'Không tìm thấy!'
            ], 404);
        }

        return response()->json([
            'data' => $record,
        ], 200);
    }

    public function update($newsId)
    {
        $isExist = Video::find($newsId);
        if (!$isExist) {
            return response([
                'message' => 'Không tìm thấy!'
            ], 404);
        }

        $body = request()->all();

        if ($body['title'] != $isExist->title) {
            $record = Video::where('title', request()->title)->first();
            if ($record) {
                return response([
                    'message' => 'Video đã tồn tại!'
                ], 409);
            }
        }

        $isExist->update($body);

        return response()->json([
            'message' => 'Sửa video thành công!',
            'data' => $isExist,
        ], 200);
    }

    public function destroy($newsId)
    {
        $record = Video::find($newsId);
        if (!$record) {
            return response([
                'message' => 'Không tìm thấy!'
            ], 404);
        }

        $record->delete();

        return response()->json([
            'message' => 'Xóa video thành công!',
        ], 200);
    }
}
