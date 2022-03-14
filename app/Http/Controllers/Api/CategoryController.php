<?php

namespace App\Http\Controllers\Api;

use App\Models\Category;
use App\Http\Controllers\Controller;
use App\Http\Requests\Category\CategoryStoreRequest;
use App\Http\Resources\Category\CategoryAllCollection;
use App\Http\Resources\Category\CategorySingleCollection;
use Illuminate\Database\QueryException;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CategoryController extends Controller
{
    use HasFactory;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $categories = Category::orderBy("created_at", "desc")->paginate(10);

        return response()->json($categories);
    }

    /**
     * Get categories based on id
     */
    public function show($id)
    {
        $category = Category::where("id", "=", $id)
            ->with("words.choices")
            ->get();
        return response()->json(new CategorySingleCollection($category));
    }

    /**
     * Show all the categories without paginate function.
     */
    public function showAll()
    {
        return new CategoryAllCollection(
            Category::orderBy("created_at", "desc")
                ->with("words.choices")
                ->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CategoryStoreRequest $request)
    {
        try {
            Category::create($request->validated());
            return response()->json([
                "error" => false,
                "message" => "Successfully Saved",
            ]);
        } catch (QueryException $e) {
            return response()->json([
                "error" => true,
                "message" => "Error in saving Category. Try Again.",
                "error_message" => $e,
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
    public function update(Category $category, CategoryStoreRequest $request)
    {
        try {
            $category->update($request->validated());

            return response()->json([
                "error" => false,
                "message" => "Successfully Updated",
            ]);
        } catch (QueryException $e) {
            return response()->json([
                "error" => true,
                "message" => "Error in updating Category. Try again.",
                "error_message" => $e,
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Category $category)
    {
        try {
            // Delete choices
            $category->choices()->delete();
            // Delete words
            $category->words()->delete();
            // Delete category
            $category->delete();

            return response()->json([
                "error" => false,
                "message" => "Successfully Deleted",
            ]);
        } catch (QueryException $e) {
            return response()->json([
                "error" => true,
                "message" => "Error in deleting Category. Try again.",
                "error_message" => $e,
            ]);
        }
    }
}
