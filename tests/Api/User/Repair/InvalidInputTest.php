<?php

namespace Tests\Api\User\Repair;

use Illuminate\Foundation\Testing\DatabaseTransactions;

class InvalidInputTest extends RepairTest
{
    use DatabaseTransactions;

    /**
     * @var string
     */
    protected $repairType;

    /**
     * Setup the test environment.
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();

        $this->signIn();

        $this->repairType = $this->randomCategoryName('repair.type');
    }

    /** @test */
    public function visit_index_with_negative_page_length()
    {
        $this->call('GET', '/', ['length' => -135]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function visit_index_with_zero_page_length()
    {
        $this->call('GET', '/', ['length' => 0]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function visit_index_with_non_integer_page_length()
    {
        $this->call('GET', '/', ['length' => 'hello_world']);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function create_repair_without_input()
    {
        $this->call('POST', '/create');
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function create_repair_with_non_exists_property_id()
    {
        $this->call('POST', '/create', [
            'property_id' => 0,
            'type' => $this->repairType,
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function create_repair_should_prevent_sql_auto_convert_string_to_integer()
    {
        $this->call('POST', '/create', [
            'property_id' => '1a2b3c4d5e',
            'type' => $this->repairType,
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function create_repair_with_maintenance_property()
    {
        $this->call('POST', '/create', [
            'property_id' => $this->getTestPropertyId(false),
            'type' => $this->repairType,
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function create_repair_with_maintenance_classroom()
    {
        $this->call('POST', '/create', [
            'property_id' => $this->getTestPropertyId(false, true),
            'type' => $this->repairType,
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function create_repair_with_invalid_type_1()
    {
        $this->call('POST', '/create', [
            'property_id' => $this->getTestPropertyId(true, true),
            'type' => 0,
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function create_repair_with_invalid_type_2()
    {
        $this->call('POST', '/create', [
            'property_id' => $this->getTestPropertyId(true),
            'type' => 'maybe_is_wrong',
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function create_repair_with_invalid_type_3()
    {
        $this->call('POST', '/create', [
            'property_id' => $this->getTestPropertyId(true, true),
            'type' => 0,
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function create_repair_with_invalid_type_4()
    {
        $this->call('POST', '/create', [
            'property_id' => $this->getTestPropertyId(true),
            'type' => 'maybe_is_wrong',
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function create_repair_with_too_long_remark_1()
    {
        $this->call('POST', '/create', [
            'property_id' => $this->getTestPropertyId(true, true),
            'remark' => str_random(500),
            'type' => $this->repairType,
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function create_repair_with_too_long_remark_2()
    {
        $this->call('POST', '/create', [
            'property_id' => $this->getTestPropertyId(true),
            'remark' => str_random(500),
            'type' => $this->repairType,
        ]);
        $this->assertResponseUnprocessableEntity();
    }
}
