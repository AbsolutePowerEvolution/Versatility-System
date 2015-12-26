<?php

namespace Tests\Api\Manager\Property;

use Illuminate\Foundation\Testing\DatabaseTransactions;

class InvalidInputTest extends PropertyTest
{
    use DatabaseTransactions

    /**
     * @var string
     */
    protected $category;

    /**
     * @var int
     */
    protected $propertyId;

    /**
     * Setup the test environment.
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();

        $this->signInWithManager();

        $this->category = $this->randomCategoryName('property');

        $this->propertyId = $this->getTestPropertyId();
    }

    /** @test */
    public function create_property_without_input()
    {
        $this->call('POST', '/create');
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function create_property_without_name()
    {
        $this->call('POST', '/create', [
            'describe' => str_random(32),
            'category' => $this->category,
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function create_property_without_describe()
    {
        $this->call('POST', '/create', [
            'name' => str_random(16),
            'category' => $this->category,
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function create_property_without_category()
    {
        $this->call('POST', '/create', [
            'name' => str_random(16),
            'describe' => str_random(32),
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function create_property_with_too_long_name()
    {
        $this->call('POST', '/create', [
            'name' => str_random(128),
            'describe' => str_random(32),
            'category' => $this->category,
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function create_property_with_too_long_describe()
    {
        $this->call('POST', '/create', [
            'name' => str_random(16),
            'describe' => str_random(256),
            'category' => $this->category,
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function create_property_with_too_long_code()
    {
        $this->call('POST', '/create', [
            'name' => str_random(16),
            'describe' => str_random(32),
            'category' => $this->category,
            'code' => str_random(64),
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function create_property_with_invalid_category_1()
    {
        $this->call('POST', '/create', [
            'name' => str_random(16),
            'describe' => str_random(32),
            'category' => 0,
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function create_property_with_invalid_category_2()
    {
        $this->call('POST', '/create', [
            'name' => str_random(16),
            'describe' => str_random(32),
            'category' => 'hello_world',
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function update_property_with_too_long_name()
    {
        $this->call('PUT', "/update/{$this->propertyId}", [
            'name' => str_random(128),
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function update_property_with_too_long_describe()
    {
        $this->call('PUT', "/update/{$this->propertyId}", [
            'describe' => str_random(256),
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function update_property_with_invalid_status_1()
    {
        $this->call('PUT', "/update/{$this->propertyId}", [
            'status' => 0,
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function update_property_with_invalid_status_2()
    {
        $this->call('PUT', "/update/{$this->propertyId}", [
            'status' => 'hello_world',
        ]);
        $this->assertResponseUnprocessableEntity();
    }
}
