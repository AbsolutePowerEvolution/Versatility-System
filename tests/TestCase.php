<?php

namespace Tests;

use App\Affair\User;
use Auth;
use Illuminate\Contracts\Console\Kernel;

class TestCase extends \Illuminate\Foundation\Testing\TestCase
{
    /**
     * The base URL to use while testing the application.
     *
     * @var string
     */
    protected $baseUrl = 'http://localhost';

    /**
     * Creates the application.
     *
     * @return \Illuminate\Foundation\Application
     */
    public function createApplication()
    {
        $app = require __DIR__.'/../bootstrap/app.php';

        $app->make(Kernel::class)->bootstrap();

        return $app;
    }

    /**
     * 登入
     */
    public function signIn()
    {
        Auth::loginUsingId(User::first()->getAttribute('id'));
    }

    public function signInWithManager()
    {
        //
    }
}
