<?php

class TestCase extends Illuminate\Foundation\Testing\TestCase
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

        $app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

        return $app;
    }

    /**
     * 登入
     */
    public function signIn()
    {
        Auth::loginUsingId(\App\Affair\User::first()->getAttribute('id'));
    }

    /**
     * Assert that the client response has an error status code.
     *
     * @param int $status
     * @return void
     */
    public function assertResponseErrorCode($status)
    {
        $actual = $this->response->getStatusCode();

        $this->assertEquals($status, $this->response->getStatusCode(), "Expected status code {$status}, got {$actual}.");
    }

    /**
     * Assert that the client response has an 403 status code.
     *
     * @return void
     */
    public function assertResponseForbidden()
    {
        $this->assertResponseErrorCode(403);
    }

    /**
     * Assert that the client response has an 404 status code.
     *
     * @return void
     */
    public function assertResponseNotFound()
    {
        $this->assertResponseErrorCode(404);
    }

    /**
     * Assert that the client response has an 422 status code.
     *
     * @return void
     */
    public function assertResponseUnprocessableEntity()
    {
        $this->assertResponseErrorCode(422);
    }
}
