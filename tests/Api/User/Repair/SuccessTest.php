<?php

namespace Tests\Api\User\Repair;

use Illuminate\Foundation\Testing\DatabaseTransactions;

class SuccessTest extends RepairTest
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
    public function visit_index()
    {
        $this->call('GET', '/');
        $this->assertResponseOk();
        $this->seeJson();
    }

    /** @test */
    public function create_repair()
    {
        $this->call('POST', '/create', [
            'property_id' => $this->getTestPropertyId(true),
            'type' => $this->randomCategoryName('repair.type'),
        ]);
        $this->assertResponseCreated();
    }

    /** @test */
    public function create_classroom_repair()
    {
        $this->call('POST', '/create', [
            'property_id' => $this->getTestPropertyId(true, true),
            'type' => $this->randomCategoryName('repair.type'),
        ]);
        $this->assertResponseCreated();
    }

    /** @test */
    public function delete_repair()
    {
        $repairId = $this->getTestRepairId();

        $this->call('DELETE', "/delete/{$repairId}");
        $this->assertResponseOk();
    }

    /** @test */
    public function delete_classroom_repair()
    {
        $repairId = $this->getTestRepairId(true);

        $this->call('DELETE', "/delete/{$repairId}");
        $this->assertResponseOk();
    }
}
