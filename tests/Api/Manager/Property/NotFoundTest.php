<?php

namespace Tests\Api\Manager\Property;

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

        $this->signInWithManager();
    }

    /** @test */
    public function update_not_exists_property_1()
    {
        $this->call('PUT', '/update/not_found');
        $this->assertResponseNotFound();
    }

    /** @test */
    public function update_not_exists_property_2()
    {
        $this->call('PUT', '/update/-5');
        $this->assertResponseNotFound();
    }

    /** @test */
    public function update_not_exists_property_3()
    {
        $this->call('PUT', '/update/0');
        $this->assertResponseNotFound();
    }

    /** @test */
    public function delete_not_exists_property_1()
    {
        $this->call('DELETE', '/delete/not_found');
        $this->assertResponseNotFound();
    }

    /** @test */
    public function delete_not_exists_property_2()
    {
        $this->call('DELETE', '/delete/-5');
        $this->assertResponseNotFound();
    }

    /** @test */
    public function delete_not_exists_property_3()
    {
        $this->call('DELETE', '/delete/0');
        $this->assertResponseNotFound();
    }

    /** @test */
    public function delete_same_property_multiple_times()
    {
        $propertyId = $this->getTestPropertyId();

        $this->call('DELETE', "/delete/{$propertyId}");
        $this->call('DELETE', "/delete/{$propertyId}");
        $this->assertResponseNotFound();
    }
}
