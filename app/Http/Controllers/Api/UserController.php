<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Http\Controllers\Controller;
use App\Http\Requests\User\UserChangeRoleRequest;
use App\Http\Requests\User\UserPasswordUpdateRequest;
use App\Http\Requests\User\UserUpdateRequest;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        return response()->json(User::paginate(10));
    }

    public function show($user_id)
    {
        try {
            $user = User::where("id", "=", $user_id)
                ->with("followings")
                ->with("followers")
                ->get();

            return response()->json([
                "error" => false,
                "message" => "Succesffuly queried data",
                "data" => $user,
            ]);
        } catch (QueryException $e) {
            return response()->json([
                "error" => false,
                "message" => "Failed to get data",
                "error_message" => $e,
            ]);
        }
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

    /**
     * Update user information
     */
    public function updateUser(User $user, UserUpdateRequest $request)
    {
        try {
            $update = $user->update($request->all());

            if ($update) {
                return response()->json([
                    "error" => false,
                    "message" => "Successfully Updated Information",
                ]);
            }
        } catch (QueryException $e) {
            return response()->json([
                "error" => true,
                "message" => "Error in updating profile. Try Again",
                "error_message" => $e,
            ]);
        }
    }

    /**
     * Update user password
     */
    public function updatePassword(User $user, UserPasswordUpdateRequest $request)
    {
        try {
            // Get current user
            $userPassword = $user->password;
            // Check if current password is correct
            $checkPass = Hash::check($request->current_password, $userPassword);
            if ($checkPass) {
                // Check if password and confirm password is the same
                if ($request->password === $request->confirm_password) {
                    // Check if password not the same us current password
                    if ($request->current_password !== $request->password) {
                        $update = $user->update([
                            "password" => Hash::make($request->password),
                        ]);

                        if ($update) {
                            return response()->json([
                                "error" => false,
                                "message" => "Successfully Updated Password",
                            ]);
                        }
                    } else {
                        return response()->json([
                            "error" => true,
                            "message" => "Cannot use previous password",
                        ]);
                    }
                } else {
                    return response()->json([
                        "error" => true,
                        "message" => "Password mismatch",
                    ]);
                }
            } else {
                return response()->json([
                    "error" => true,
                    "message" => "Current password is wrong",
                ]);
            }
        } catch (QueryException $e) {
            return response()->json([
                "error" => true,
                "message" => "Error in updating profile. Try Again",
                "error_message" => $e,
            ]);
        }
    }
}
