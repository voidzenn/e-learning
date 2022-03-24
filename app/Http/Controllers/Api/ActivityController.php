<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use App\Models\Category;
use Carbon\Carbon;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;

class ActivityController extends Controller
{
    public function index()
    {
        try {
            $activities = Activity::with("user")
                ->with("followed")
                ->with("category.words")
                ->orderBy("created_at", "desc")
                ->get();
            if ($activities) {
                return response()->json([
                    "error" => false,
                    "message" => "Successfully queried activities",
                    "activities" => $activities,
                ]);
            }
            return response()->json([
                "error" => true,
                "message" => "Error in saving Category. Try Again.",
                "activities" => [],
            ]);
        } catch (QueryException $e) {
            return response()->json([
                "error" => true,
                "message" => "Error in getting activities",
                "error_message" => $e,
                "activities" => [],
            ]);
        }
    }

    /**
     * Get the specific activity of a user 
     */

    public function show($user_id)
    {
        try {
            $activities = Activity::where("user_id", "=", $user_id)->with("user")
                ->with("followed")
                ->with("category.words")
                ->orderBy("created_at", "desc")
                ->get();
            if ($activities) {
                return response()->json([
                    "error" => false,
                    "message" => "Successfully queried activities",
                    "activities" => $activities,
                ]);
            }
            return response()->json([
                "error" => true,
                "message" => "Error in saving Category. Try Again.",
                "activities" => [],
            ]);
        } catch (QueryException $e) {
            return response()->json([
                "error" => true,
                "message" => "Error in getting activities",
                "error_message" => $e,
                "activities" => [],
            ]);
        }
    }
}
