<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class RepairTest extends TestCase
{
    /**
     * The base URL to use while testing the application.
     *
     * @var string
     */
    protected $baseUrl = 'http://localhost/api/user/repair';

    public function test_it_should_response_403_if_not_sign_in()
    {
        $this->call('GET', "/");
        $this->assertResponseForbidden();
    }

    public function test_it_should_response_ok_and_get_the_data()
    {
        $this->get('/');
        $this->assertResponseOk();
        $this->seeJson();
    }
}
