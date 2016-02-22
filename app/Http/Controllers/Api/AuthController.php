<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Auth;
use App\Affair\User;
use App\Http\Controllers\Controller;

class AuthController extends Controller
{
    /**
     * Login with the provided username & password in local first, if
     * failed, try login in center.
     *
     * @param Request
     * @return Json
     */
    public function login(Request $request)
    {
        $username = $request->input('username');
        $password = $request->input('password');

        // if login failed
        if (
            ! Auth::attempt(['username' => $username, 'password' => $password]) &&
            false // check with center.
        ) {
            $user = User::where('username', '=', $username)->first();
            Auth::login($user);
        }

        $response = [
            'is_student' => \Entrust::hasRole('student'),
            'is_manager' => \Entrust::hasRole('manager'),
            'status' => Auth::check(),
        ];

        return response()->json($response);
    }

    /**
     * Logout.
     *
     * @return Json
     */
    public function logout()
    {
        Auth::logout();

        return response()->json(['status' => ! Auth::check()]);
    }
}
