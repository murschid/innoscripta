<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\ResetPasswordRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function index()
    {
        return response()->json(User::latest()->get());
    }

    // User registration method
    public function register(RegisterRequest $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]);

        return response()->json([
            'status' => 200,
            'user' => $user,
            'token' => $user->createToken('userToken')->plainTextToken
        ]);
    }

    // User login method
    public function login(LoginRequest $request)
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'errors' => 'The provided credentials are incorrect!'
            ]);
        }

        $user = User::where('email', $request->email)->first();
        return response()->json([
            'status' => 200,
            'user' => $user,
            'token' => $user->createToken('userToken')->plainTextToken
        ]);
    }

    // User logout method
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Logout successful'
        ]);
    }

    public function sendResetLinkEmail(Request $request)
    {
        $request->validate([
            'email' => 'required|email|min:9'
        ]);

        $response = Password::sendResetLink($request->only('email'));

        if ($response === Password::RESET_LINK_SENT) {
            return response()->json([
                'status' => __($response)
            ]);
        }
        return response()->json([
            'errors' =>  ['email' => 'The provided credential is incorrect!']
        ]);
    }

    public function reset(ResetPasswordRequest $request)
    {
        $response = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),

            function (User $user, string $password) {
                $user->forceFill(['password' => bcrypt($password)])->setRememberToken(Str::random(60));
                $user->save();
                $user->tokens()->delete();
                event(new PasswordReset($user));
            }
        );

        if ($response === Password::PASSWORD_RESET) {
            return response()->json([
                'status' => __($response)
            ]);
        }

        return response()->json([
            'errors' => __($response)
        ], 500);
    }
}
