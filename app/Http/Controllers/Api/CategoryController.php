<?php

namespace App\Http\Controllers\Api;

use App\Models\Category;
use App\Http\Controllers\Controller;
use App\Http\Requests\Category\CategoryStoreRequest;
use Exception;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $category = Category::paginate(10);

        return response()->json($category);
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
            return response()->json(['error' => false, 'message' => 'Successfully Saved']);
        } catch (QueryException $e) {
            return response()->json(['error' => true, 'message' => 'Error in saving Category. Try Again', 'error_message' => $e]);
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

            return response()->json(['error' => false, 'message' => 'Successfully Updated']);
        } catch (QueryException $e) {
            return response()->json(['error' => true, 'message' => 'Error in updating Category. Try Again', 'error_message' => $e]);
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
            $category->delete();

            return response()->json(['error' => false, 'message' => 'Successfully Deleted']);
        } catch (QueryException $e) {
            return response()->json(['error' => true, 'message' => 'Error in deleting Category. Try Again', 'error_message' => $e]);
        }
    }
}
