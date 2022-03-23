<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Follow\FollowDestroyRequest;
use App\Http\Requests\Follow\FollowStoreRequest;
use App\Models\Follow;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FollowController extends Controller
{
    /**
     * This function gets the follows data based on the 
     * currently signed in user
     */

    public function show($user_id)
    {
        try {
            $follows = Follow::where("user_id", "=", $user_id)->get();

            return response()->json([
                "error" => false,
                "message" => "Successfully queried data",
                "follows" => $follows,
            ]);
        } catch (QueryException $e) {
            return response()->json([
                "error" => true,
                "message" => "Error in getting follows data",
            ]);
        }
    }

    public function store(FollowStoreRequest $request)
    {
        try {
            /**
             * Check if $request user_id not the same as $request followed_id
             * because a user cannot follow himself/herself.
             */
            if ($request->user_id !== $request->followed_id) {
                $follow = Follow::create($request->all());

                if ($follow) {
                    return response()->json([
                        "error" => false,
                        "message" => "Successfully Followed User",
                    ]);
                }
            }

            return response()->json([
                "error" => true,
                "message" => "Error in following user",
            ]);
        } catch (QueryException $e) {
            return response()->json([
                "error" => true,
                "message" => "Error in following user",
                "error_message" => $e,
            ]);
        }
    }

    /**
     * Delete data in follows based on user_id and followed_id
     */

    public function destroy(FollowDestroyRequest $request)
    {
        try {
            $follow = Follow::where("user_id", "=", $request->user_id)
                ->where("followed_id", "=", $request->followed_id)
                ->delete();

            if ($follow) {
                return response()->json([
                    "error" => false,
                    "message" => "Successfully Unfollowed User",
                ]);
            }

            return response()->json([
                "error" => false,
                "message" => "Error in unfollowing user",
            ]);
        } catch (QueryException $e) {
            return response()->json([
                "error" => true,
                "message" => "Error in unfollowing user",
                "error_message" => $e,
            ]);
        }
    }
}