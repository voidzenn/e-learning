<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Http\Controllers\Controller;
use App\Http\Requests\User\UserChangeRoleRequest;
use Illuminate\Database\QueryException;

class UserController extends Controller
{
    public function index()
    {
        return response()->json(User::paginate(10));
    }

    //Change or update the user role
    public function changeRole(User $user, UserChangeRoleRequest $request)
    {
        try {
            $user->update([
                "is_admin" => $request->new_role,
            ]);
            return response()->json([
                "error" => false,
                "message" => "Successfully Updated Role",
            ]);
        } catch (QueryException $e) {
            return response()->json([
                "error" => true,
                "message" => "Error in updating role. Try Again",
                "error_message" => $e,
            ]);
        }
    }
}
