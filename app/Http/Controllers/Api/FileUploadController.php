<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\File\FileStoreRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class FileUploadController extends Controller
{
    public function uploadImage(FileStoreRequest $request)
    {
        if ($request->hasFile("file")) {
            $userId = Auth::user()->id;
            // Location to put the image
            $uploadPath = "images/avatars/user";
            // Name of the image file
            $fileName = $request->file("file")->getClientOriginalName();
            // Store the image to the location path
            $filePath = $request->file("file")->move($uploadPath, $fileName);
            // Check if successfully stored image
            if ($filePath !== "") {
                $user = User::where("id", "=", $userId)->update([
                    "avatar" => $filePath,
                ]);
                // Check if successfully updated user avatar
                if ($user) {
                    return response()->json([
                        "error" => false,
                        "message" => "Successfully Uploaded Image",
                        "file_path" => strval($filePath),
                    ]);
                }
            }
        }

        return response()->json([
            "error" => true,
            "message" => "Error in uploading image",
        ]);
    }
}
