<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Str;

use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request) {

        $messages = [
            'required'                  => ':attribute harus diisi. ',
            'email'               => 'email tidak valid. ',
            'ends_with'           => 'gunakan email polban. ',
            'alpha_num'               => ':attribute tidak valid. ',
            'min'               => ':attribute harus diisi minimal :min. ',
        ];

        $validate = \Validator::make($request->all(), [
            'email' => 'required|email|ends_with:polban.ac.id',
            'password' => 'required|alpha_num|min:8',
        ],$messages);

        if($validate->fails()) {
            return response()->json(["status" => "failed", "message" => $validate->errors()]);
        } else {
            $user = User::where('email', $request->email)->first();
            if($user != null || $user != ""){
                if (! \Hash::check($request->password, $user->password, [])) {
                    return response()->json(["status" => 'error', "message" => "incorrect"]);
                }
    
                $tokenResult = $user->createToken('token-auth')->plainTextToken;
                return response()->json(["status" => 'success', "message" => "You have logged in successfully", "token" => $tokenResult, "data" => $user]);
            }
            else {
                return response()->json(["status" => 'error', "message" => "unregist"]);
            }
        }
    }

    public function logout(Request $request) {
        $user = $request->user();
        $user->currentAccessToken()->delete();
        $respon = [
            'status' => 'success',
            'message' => 'Logout successfully',
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
            'message' => 'Logout successfully',
            'errors' => null,
            'content' => null,
        ];
        return response()->json($respon);
    }

    public function forgotPassword(Request $request){
        $request->validate([
            'email' => 'required|email|ends_with:polban.ac.id',
        ]);

        $status = Password::sendResetLink(
            $request->only('email')
        );

        if($status == Password::RESET_LINK_SENT){
            return [
                'status' => 'success',
                'message' => __($status)
            ];
        }

        throw ValidationException::withMessage([
            'email' => [trans($status)],
        ]);
    }

    public function resetPassword(Request $request){
        $request->validate([
            'token' => 'required',
            'password' => 'required|alpha_num|min:6'
        ]);

        $status = Password::reset(
            $request->only('password', 'password_confirmation', 'token'),
            function ($user) use ($request){
                $user->forceFill([
                    'password' => \Hash::make($request->password),
                    'remember_token' => Str::random(60),
                ])->save();

                event(new PasswordReset($user));
            }
        );

        if($status == Password::PASSWORD_RESET){
            return response()->json([
                'status' => 'success',
                'message' => 'Password reset successfully'
            ]);
        }

        return response()->json([
            'status' => 'error',
            'message' => __($status)
        ]);
    }
}
