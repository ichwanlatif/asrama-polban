<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request) {
        $validate = \Validator::make($request->all(), [
            'email' => 'required|email|ends_with:polban.ac.id',
            'password' => 'required|alpha_num|min:5',
        ]);

        if($validate->fails()) {
            return response()->json(["status" => "failed", "message" => $validate->errors()]);
        } else {
            $user = User::where('email', $request->email)->first();
            if($user != null || $user != ""){
                if (! \Hash::check($request->password, $user->password, [])) {
                    return response()->json(["status" => 'error', "message" => "Password Tidak Sesuai!"]);
                }
    
                $tokenResult = $user->createToken('token-auth')->plainTextToken;
                return response()->json(["status" => 'success', "message" => "You have logged in successfully", "token" => $tokenResult, "data" => $user]);
            }
            else {
                return response()->json(["status" => 'error', "message" => "Akun Tidak Terdaftar!"]);
            }
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
