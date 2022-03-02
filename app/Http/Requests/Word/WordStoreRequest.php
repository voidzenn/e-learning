<?php

namespace App\Http\Requests\Word;

use Illuminate\Foundation\Http\FormRequest;

class WordStoreRequest extends FormRequest
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
            'category_id' => ['required'],
            // Name should be unique
            'name' => ['required', 'unique:words'],
            // Choices are in array and we still need to still add a max characters
            'choices' => ['required', 'max:130'],
            'correct_answer' => ['required'],
        ];
    }

    public function messages()
    {
        return [
            'name.unique' => 'Word should be unique',
        ];
    }
}
