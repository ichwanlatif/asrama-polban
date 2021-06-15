<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
// use Illuminate\Support\Arr;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request) {
        $validate = \Validator::make($request->all(), [
            'email' => 'required',
            'password' => 'required',
        ]);

        if($validate->fails()) {
            return response()->json(["status" => "failed", "validation_error" => $validate->errors()]);
        } else {
            // $credentials = request(['email', 'password']);
            // // $credentials = Arr::add($credentials, 'status_aktif', 1);
            // if (!Auth::attempt($credentials)) {
            //     return response()->json(["status" => "error", "msg" => "Unathorized"], 401);
            // }

            $user = User::where('email', $request->email)->first();
            if (! \Hash::check($request->password, $user->password, [])) {
                throw new \Exception('Error in Login');
            }

            $tokenResult = $user->createToken('token-auth')->plainTextToken;
            return response()->json(["status" => 'success', "message" => "You have logged in successfully", "token" => $tokenResult, "data" => $user]);
        }
    }

    public function logout(Request $request) {
        $user = $request->user();
        $user->currentAccessToken()->delete();
        $respon = [
            'status' => 'success',
            'msg' => 'Logout successfully',
            'errors' => null,
            'content' => null,
        ];
        return response()->json($respon);
    }

    public function logoutall(Request $request) {
        $user = $request->user();
        $user->tokens()->delete();
        $respon = [
            'status' => 'success',
            'msg' => 'Logout successfully',
            'errors' => null,
            'content' => null,
        ];
        return response()->json($respon);
    }
}
