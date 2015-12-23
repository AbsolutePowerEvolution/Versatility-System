<?php

namespace Tests;

use App\Affair\User;
use Auth;
use Illuminate\Contracts\Console\Kernel;
use Symfony\Component\HttpFoundation\Response;

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

    /**
     * Assert that the client response has a status code.
     *
     * @param int $status
     * @return void
     */
    public function assertResponseCode($status)
    {
        $actual = $this->response->getStatusCode();

        $this->assertEquals($status, $actual, "Expected status code {$status}, got {$actual}.");
    }

    /**
     * Assert that the client response has an 201 status code.
     *
     * @return void
     */
    public function assertResponseCreated()
    {
        $this->assertResponseCode(Response::HTTP_CREATED);
    }

    /**
     * Assert that the client response has an 403 status code.
     *
     * @return void
     */
    public function assertResponseForbidden()
    {
        $this->assertResponseCode(Response::HTTP_FORBIDDEN);
    }

    /**
     * Assert that the client response has an 404 status code.
     *
     * @return void
     */
    public function assertResponseNotFound()
    {
        $this->assertResponseCode(Response::HTTP_NOT_FOUND);
    }

    /**
     * Assert that the client response has an 409 status code.
     *
     * @return void
     */
    public function assertResponseConflict()
    {
        $this->assertResponseCode(Response::HTTP_CONFLICT);
    }

    /**
     * Assert that the client response has an 422 status code.
     *
     * @return void
     */
    public function assertResponseUnprocessableEntity()
    {
        $this->assertResponseCode(Response::HTTP_UNPROCESSABLE_ENTITY);
    }
}
