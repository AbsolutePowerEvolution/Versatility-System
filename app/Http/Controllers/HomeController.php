<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class HomeController extends Controller
{
    /**
     * 首頁
     *
     * @return \Illuminate\View\View
     */
    public function home()
    {
        return view('welcome');
    }
}
