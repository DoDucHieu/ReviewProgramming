<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
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
            'full_name' => 'string',
            'email' => ['email', Rule::unique('users')->ignore($this->user_id, 'user_id')],
            'date_of_birth' => 'date',
            'gender' => 'string',
            'username' => ['string', Rule::unique('users')->ignore($this->user_id, 'user_id')],
            'specialty_id' => 'numeric'
        ];
    }
}
