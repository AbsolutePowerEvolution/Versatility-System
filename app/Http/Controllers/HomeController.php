<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * 首頁
     *
     * @return \Illuminate\View\View
     */
    public function home()
    {
        return view('main');
    }
}
