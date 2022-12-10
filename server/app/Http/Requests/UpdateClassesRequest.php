<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateClassesRequest extends FormRequest
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
            'class_id' => ['string', Rule::unique('classes')->ignore($this->class_id, 'class_id')],
            'start_date' => 'string',
            'max_number_students' => 'numeric',
            'schedules' => 'string',
            'description' => 'string',
            'image' => 'string',
            'user_id' => 'exists:users',
            'subject_id' => 'exists:subjects,id'
        ];
    }
}
