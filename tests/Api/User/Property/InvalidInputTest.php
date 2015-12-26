<?php

namespace Tests\Api\User\Property;

use Illuminate\Foundation\Testing\DatabaseTransactions;

class InvalidInputTest extends PropertyTest
{
    use DatabaseTransactions;

    /**
     * Setup the test environment.
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();

        $this->signIn();
    }
    
    /** @test */
    public function visit_classrooms_with_negative_page_length()
    {
        $this->call('GET', '/classrooms', ['length' => -135]);
        $this->assertResponseUnprocessableEntity();
    }
    
    /** @test */
    public function visit_classrooms_with_zero_page_length()
    {
        $this->call('GET', '/classrooms', ['length' => 0]);
        $this->assertResponseUnprocessableEntity();
    }
    
    /** @test */
    public function visit_classrooms_with_non_integer_page_length()
    {
        $this->call('GET', '/classrooms', ['length' => 'hello_world']);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function visit_others_with_negative_page_length()
    {
        $this->call('GET', '/others', ['length' => -135]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function visit_others_with_zero_page_length()
    {
        $this->call('GET', '/others', ['length' => 0]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function visit_others_with_non_integer_page_length()
    {
        $this->call('GET', '/others', ['length' => 'hello_world']);
        $this->assertResponseUnprocessableEntity();
    }
}
