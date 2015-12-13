<?php

namespace App\Http\Controllers\Api\User;

use Illuminate\Http\Request;

use Auth;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class UserAuthController extends Controller
{
    public function login()
    {
        return Auth::loginUsingId(1);
    }
}
