<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function index()
    {
        return response(User::latest()->get());
    }

    // User registration method
    public function register(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'name' => 'required|string|min:3|max:50',
            'email' => 'required|string|unique:users,email|min:9',
            'password' => 'required|string|confirmed|min:6',
            'agreement' => 'required|accepted'
        ]);

        if ($validate->fails()) {
            return response()->json([
                'vError' => $validate->messages()
            ]);
        }

        $user = User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => bcrypt($request->input('password')),
        ]);

        return response()->json([
            'status' => 200,
            'user' => $user,
            'token' => $user->createToken('userToken')->plainTextToken
        ]);
    }

    // User login method
    public function login(Request $request)
    {
        $credentials = Validator::make($request->all(), [
            'email' => 'required|email|min:9',
            'password' => 'required|min:6',
        ]);

        if ($credentials->fails()) {
            return response()->json([
                'lError' => $credentials->messages()
            ]);
        }

        if (Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'status' => 200,
                'user' => Auth::user(),
                'token' => Auth::user()->createToken('userToken')->plainTextToken
            ]);
        }
        return response()->json([
            'lError' => [
                'common' => 'The provided credentials are incorrect!'
            ]
        ]);
    }

    // User logout method
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response([
            'status' => 200,
            'message' => 'Logout successful'
        ], 200);
    }
}
