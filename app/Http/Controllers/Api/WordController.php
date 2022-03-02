<?php

namespace App\Http\Controllers\Api;

use App\Models\Word;
use App\Models\Choice;
use App\Http\Controllers\Controller;
use App\Http\Requests\Word\WordStoreRequest;
use App\Http\Requests\Word\WordUpdateRequest;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;

use function PHPSTORM_META\map;

class WordController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $word = Word::with("choices")->paginate();

            return response()->json([
                "error" => false,
                "message" => "Succesfully queried data",
                "data" => $word,
            ]);
        } catch (QueryException $e) {
            return response()->json([
                "error" => false,
                "message" => "Succesfully queried data",
                "errorMessage" => $e,
            ]);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(WordStoreRequest $request)
    {
        if ($request->validated()) {
            try {
                $word = Word::create($request->only("category_id", "name"));
                // Loop through the number of choices
                $choices = collect($request->choices);
                // Add data to data array to be used on map function
                $data = [$word->id, $request->correct_answer];
                // Loop through the choices
                $choices->map(function ($item, $key) use ($data) {
                    /*
                        If the correctAnswer is the same as key then we should add 1 
                        to correctAnswer field to make it true
                    */
                    if (strval($data[1]) === strval($key)) {
                        $choice = [
                            "word_id" => $data[0],
                            "name" => $item,
                            "is_correct_answer" => "1",
                        ];
                    } else {
                        $choice = [
                            "word_id" => $data[0],
                            "name" => $item,
                        ];
                    }
                    // Store the array data choice
                    Choice::create($choice);
                });
                return response()->json([
                    "error" => false,
                    "message" => "Successfull Saved",
                ]);
            } catch (QueryException $e) {
                return response()->json([
                    "error" => true,
                    "message" => "Error in saving data. Try again.",
                    "error_message" => $e,
                ]);
            }
        }
        return response()->json([
            "error" => true,
            "message" => "Invalid Fields",
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($category_id)
    {
        try {
            $word = Word::where("category_id", $category_id)
                ->with("choices")
                ->paginate();

            return response()->json([
                "error" => false,
                "message" => "Succesfully queried data",
                "data" => $word,
            ]);
        } catch (QueryException $e) {
            return response()->json([
                "error" => false,
                "message" => "Succesfully queried data",
                "errorMessage" => $e,
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Word $word, WordUpdateRequest $request)
    {
        if ($request->validated()) {
            try {
                // Update word.name
                $word->update($request->only("name"));
                // Update choices.name first row
                $answer = $request->correct_answer;
                $word
                    ->choices[0]
                    ->update([
                        "name" => $request->choices[0],
                        "is_correct_answer" => $answer === "1" ? 1 : 0,
                    ]);
                // Update choices.name second row
                $word
                    ->choices[1]
                    ->update([
                        "name" => $request->choices[1],
                        "is_correct_answer" => $answer === "2" ? 1 : 0,
                    ]);
                // Update choices.name third row
                $word
                    ->choices[2]
                    ->update([
                        "name" => $request->choices[2],
                        "is_correct_answer" => $answer === "3" ? 1 : 0,
                    ]);
                // Update choices.name fourth row
                $word
                    ->choices[3]
                    ->update([
                        "name" => $request->choices[3],
                        "is_correct_answer" => $answer === "4" ? 1 : 0,
                    ]);

                return response()->json([
                    "error" => false,
                    "message" => "Successfully Updated",
                ]);
            } catch (QueryException $e) {
            }
        } else {
            return response()->json([
                "error" => false,
                "message" => "Error in updating data. Try again.",
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Word $word)
    {
        try {
            // Delete word
            $word->delete();
            // Delete choices based on word id
            $word->choices()->delete();

            return response()->json([
                "error" => false,
                "message" => "Successfully Deleted",
            ]);
        } catch (QueryException $e) {
            return response()->json([
                "error" => false,
                "message" => "Error in deleting data. Try again.",
                "errorMessage" => $e,
            ]);
        }
    }
}
