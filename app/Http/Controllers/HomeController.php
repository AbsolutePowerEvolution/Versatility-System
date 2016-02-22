<?php

namespace App\Http\Controllers;

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
