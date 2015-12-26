<?php

namespace Tests\Api\User\Property;

use Illuminate\Foundation\Testing\DatabaseTransactions;

class NotFoundTest extends PropertyTest
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
    public function visit_not_exists_property_1()
    {
        $this->call('GET', '/others/not_found');
        $this->assertResponseNotFound();
    }

    /** @test */
    public function visit_not_exists_property_2()
    {
        $this->call('GET', '/others/-5');
        $this->assertResponseNotFound();
    }

    /** @test */
    public function visit_not_exists_property_3()
    {
        $this->call('GET', '/others/0');
        $this->assertResponseNotFound();
    }
}
