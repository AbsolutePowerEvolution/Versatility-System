<?php

namespace Tests\Api\User\Property;

class SuccessTest extends PropertyTest
{
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
    public function visit_classrooms()
    {
        $this->call('GET', '/classrooms');
        $this->assertResponseOk();
        $this->seeJson();
    }

    /** @test */
    public function visit_others()
    {
        $this->call('GET', '/others');
        $this->assertResponseOk();
        $this->seeJson();
    }

    /** @test */
    public function visit_others_show()
    {
        $propertyId = $this->getTestPropertyId(true);

        $this->call('GET', "/others/{$propertyId}");
        $this->assertResponseOk();
        $this->seeJson();
    }

    /** @test */
    public function visit_others_classroom_show()
    {
        $propertyId = $this->getTestPropertyId(true, true);

        $this->call('GET', "/others/{$propertyId}");
        $this->assertResponseOk();
        $this->seeJson();
    }
}
