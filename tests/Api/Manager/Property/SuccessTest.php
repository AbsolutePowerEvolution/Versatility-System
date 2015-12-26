<?php

namespace Tests\Api\Manager\Property;

use App\Affair\Property;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class SuccessTest extends PropertyTest
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
    public function create_property_1()
    {
        $this->call('POST', '/create', [
            'name' => str_random(16),
            'describe' => str_random(32),
            'category' => $this->randomCategoryName('property'),
        ]);
        $this->assertResponseCreated();
        $this->seeJson();
    }

    /** @test */
    public function create_property_2()
    {
        $this->call('POST', '/create', [
            'name' => str_random(16),
            'describe' => str_random(32),
            'category' => $this->randomCategoryName('property'),
            'code' => str_random()
        ]);
        $this->assertResponseCreated();
        $this->seeJson();
    }

    /** @test */
    public function update_property_1()
    {
        $property = Property::find($this->getTestPropertyId(true));

        $this->call('PUT', '/update/' . $property->getAttribute('id'), [
            'name' => str_random(),
        ]);
        $this->assertResponseOk();
        $this->seeJson();
        $this->assertNotEquals(
            $property,
            Property::find($property->getAttribute('id'))
        );
    }

    /** @test */
    public function update_property_2()
    {
        $property = Property::find($this->getTestPropertyId(true));

        $this->call('PUT', '/update/' . $property->getAttribute('id'), [
            'describe' => str_random(),
        ]);
        $this->assertResponseOk();
        $this->seeJson();
        $this->assertNotEquals(
            $property,
            Property::find($property->getAttribute('id'))
        );
    }

    /** @test */
    public function delete_property()
    {
        $propertyId = $this->getTestPropertyId(true);

        $this->call('DELETE', "/delete/{$propertyId}");
        $this->assertResponseOk();
        $this->seeJson();
        $this->assertFalse(Property::where('id', $propertyId)->exists());
    }
}
