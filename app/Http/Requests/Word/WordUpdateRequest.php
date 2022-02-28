<?php

namespace App\Http\Requests\Word;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class WordUpdateRequest extends FormRequest
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
            // Name should be unique and we also need to ignore this word id
            'name' => ['required', Rule::unique('words')->ignore($this->word)],
            // Choices are in array and we still need to add a max characters
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
