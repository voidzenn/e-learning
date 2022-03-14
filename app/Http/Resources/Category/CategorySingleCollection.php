<?php

namespace App\Http\Resources\Category;

use Illuminate\Http\Resources\Json\ResourceCollection;

class CategorySingleCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return $this->collection->map(function ($category) {
            return [
                "category_id" => $category->id,
                "name" => $category->name,
                "words" => $category->words->map(function ($word) {
                    return [
                        "word_id" => $word->id,
                        "name" => $word->name,
                        "choices" => $word->choices->map(function ($choice) {
                            return [
                                "choice_id" => $choice->id,
                                "name" => $choice->name,
                                "is_correct_answer" => $choice->is_correct_answer
                            ];
                        }),
                    ];
                }),
            ];
        });
    }
}
