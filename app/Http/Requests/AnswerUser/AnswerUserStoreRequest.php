<?php

namespace App\Http\Requests\AnswerUser;

use Illuminate\Foundation\Http\FormRequest;

class AnswerUserStoreRequest extends FormRequest
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
            "category_user_id" => ["required"],
            "word_id" => ["required"],
            "choice_id" => ["required"],
            "is_correct" => ["required"],
        ];
    }
}
