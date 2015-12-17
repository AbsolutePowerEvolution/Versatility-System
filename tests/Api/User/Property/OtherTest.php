<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class OtherTest extends TestCase
{
    /**
     * @var string
     */
    protected $prefixUrl = '/api/user/property/others';

    public function test_it_should_response_422_if_query_string_is_invalid()
    {
        $this->call('GET', "{$this->prefixUrl}", ['length' => -135]);
        $this->assertResponseStatus(422);

        $this->call('GET', "{$this->prefixUrl}", ['length' => 0]);
        $this->assertResponseStatus(422);

        $this->call('GET', "{$this->prefixUrl}", ['length' => 'hello_world']);
        $this->assertResponseStatus(422);
    }

    public function test_it_should_response_404_if_result_not_found()
    {
        $this->call('GET', "{$this->prefixUrl}/not_found");
        $this->assertResponseStatus(404);

        $this->call('GET', "{$this->prefixUrl}/-5");
        $this->assertResponseStatus(404);

        $this->call('GET', "{$this->prefixUrl}/0");
        $this->assertResponseStatus(404);
    }

    public function test_it_should_response_ok_and_the_correct_data()
    {
        $this->call('GET', "{$this->prefixUrl}");
        $this->assertResponseOk();
        $this->seeJson();

        $this->call('GET', "{$this->prefixUrl}/1");
        $this->assertResponseOk();
        $this->seeJson();
    }
}
