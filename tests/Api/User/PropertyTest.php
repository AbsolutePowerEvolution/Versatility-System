<?php

use Illuminate\Foundation\Testing\DatabaseTransactions;

class PropertyTest extends TestCase
{
    use DatabaseTransactions;

    /**
     * The base URL to use while testing the application.
     *
     * @var string
     */
    protected $baseUrl = 'http://localhost/api/user/property';

    public function test_it_should_response_403_if_not_sign_in()
    {
        $this->call('GET', '/classrooms');
        $this->assertResponseForbidden();

        $this->call('GET', '/others');
        $this->assertResponseForbidden();

        $this->call('GET', '/others/1');
        $this->assertResponseForbidden();

        // the priority of 403 should higher than 404
        $this->call('GET', '/others/forbidden_first');
        $this->assertResponseForbidden();
    }

    public function test_it_should_response_404_if_result_not_found()
    {
        $this->signIn();

        $this->call('GET', '/others/not_found');
        $this->assertResponseNotFound();

        $this->call('GET', '/others/-5');
        $this->assertResponseNotFound();

        $this->call('GET', '/others/0');
        $this->assertResponseNotFound();
    }

    public function test_it_should_response_422_if_input_is_invalid()
    {
        $this->signIn();

        $this->call('GET', '/classrooms', ['length' => -135]);
        $this->assertResponseUnprocessableEntity();

        $this->call('GET', '/classrooms', ['length' => 0]);
        $this->assertResponseUnprocessableEntity();

        $this->call('GET', '/classrooms', ['length' => 'hello_world']);
        $this->assertResponseUnprocessableEntity();

        $this->call('GET', '/others', ['length' => -135]);
        $this->assertResponseUnprocessableEntity();

        $this->call('GET', '/others', ['length' => 0]);
        $this->assertResponseUnprocessableEntity();

        $this->call('GET', '/others', ['length' => 'hello_world']);
        $this->assertResponseUnprocessableEntity();
    }

    public function test_it_should_response_success_and_get_the_data()
    {
        $this->signIn();

        $this->call('GET', '/classrooms');
        $this->assertResponseOk();
        $this->seeJson();

        $this->call('GET', '/others');
        $this->assertResponseOk();
        $this->seeJson();

        $this->call('GET', '/others/1');
        $this->assertResponseOk();
        $this->seeJson();
    }
}
