<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
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
            'fname' => ['required', 'max:40'],
            'lname' => ['required', 'max:40'],
            // You can use email:rfc,dns to check if an email is legit
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'min:8'],
            'confirm_password' => ['required', 'min:8']
        ];
    }

    public function messages()
    {
        return [
            'fname.required' => 'First name should not be empty',
            'lname.required' => 'Last name should not be empty',
            'email.required' => 'Email should not be empty',
            'password.required' => 'Password should not be empty',
        ];
    }
}
