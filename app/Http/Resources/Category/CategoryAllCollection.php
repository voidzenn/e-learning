<?php

namespace App\Http\Resources\Category;

use Illuminate\Http\Resources\Json\ResourceCollection;

class CategoryAllCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'data' => $this->collection->map(function ($data) {
                return [
                    'id' => $data->id,
                    'name' => $data->name,
                    'description' => $data->description,
                    'category_users' => $data->categoryUsers->map(function ($catUser) {
                        return [
                            'id' => $catUser->id
                        ];
                    }),
                    'words' => $data->words->map(function ($word) {
                        return [
                            'word_id' =>$word->id,
                            'choices' => $word->choices->map(function ($choice) {
                                return [
                                    'choice_id' => $choice->id
                                ];
                            }),
                        ];
                    }),
                ];
            })
        ];
    }
}
