<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreClassesRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'class_id' => 'required|string|unique:classes',
            'start_date' => 'required|string',
            'max_number_students' => 'required|numeric',
            'schedules' => 'string',
            'description' => 'string',
            'image' => 'string',
            'user_id' => 'required|exists:users',
            'subject_id' => 'required|exists:subjects,id',
        ];
    }
}
