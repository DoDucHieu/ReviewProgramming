<?php

namespace App\Http\Controllers;

use App\Models\News;
use App\Models\User;
use Illuminate\Http\Request;

class NewController extends Controller
{
    public function index()
    {
        $records = News::with(['author'])->where('is_approve', true)->orderByDesc('created_at')->get();
        return response()->json(['data' => $records], 200);
    }

    public function waiting()
    {
        $records = News::with(['author'])->where('is_approve', false)->orderByDesc('created_at')->get();
        return response()->json(['data' => $records], 200);
    }

    public function active($newId)
    {
        $news = News::find($newId);

        if (!$news) {
            return response()->json([
                'message' => 'Không tìm thấy tin tức!'
            ], 404);
        }

        $news->is_approve = true;
        $news->save();

        return response()->json([
            'message' => 'Xét duyệt tin tức thành công!'
        ], 200);
    }

    public function store()
    {
        $record = News::where('title', request()->title)->first();
        if ($record) {
            return response([
                'message' => 'Tin tức đã tồn tại!'
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

        if (request()->hasFile('img_url')) {
            $ext = request()->file('img_url')->extension();
            $generate_unique_file_name = md5(time()) . '.' . $ext;
            request()->file('img_url')->move('images', $generate_unique_file_name, 'local');

            $body['img_url'] = 'images/' . $generate_unique_file_name;
        }

        News::create($body);

        return response()->json([
            'message' => 'Tạo mới tin tức thành công!',
        ], 201);
    }

    public function show($newId)
    {
        $record = News::with(['author'])->where('id', $newId)->get();
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
        $isExist = News::find($newsId);
        if (!$isExist) {
            return response([
                'message' => 'Không tìm thấy!'
            ], 404);
        }

        $body = request()->all();

        if ($body['title'] != $isExist->title) {
            $record = News::where('title', request()->title)->first();
            if ($record) {
                return response([
                    'message' => 'Tin tức đã tồn tại!'
                ], 409);
            }
        }

        if (request()->hasFile('img_url')) {
            $ext = request()->file('img_url')->extension();
            $generate_unique_file_name = md5(time()) . '.' . $ext;
            request()->file('img_url')->move('images', $generate_unique_file_name, 'local');

            $body['img_url'] = 'images/' . $generate_unique_file_name;
        }

        $isExist->update($body);

        return response()->json([
            'message' => 'Sửa tin tức thành công!',
            'data' => $isExist,
            'body' => $body,
        ], 200);
    }

    public function destroy($newsId)
    {
        $record = News::find($newsId);
        if (!$record) {
            return response([
                'message' => 'Không tìm thấy!'
            ], 404);
        }

        $record->delete();

        return response()->json([
            'message' => 'Xóa tin tức thành công!',
        ], 200);
    }
}
