<?php

namespace Tests\Api\User\Repair;

use Illuminate\Foundation\Testing\DatabaseTransactions;

class NotFoundTest extends RepairTest
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
    public function delete_non_exists_repair()
    {
        $this->call('DELETE', '/delete/not_found');
        $this->assertResponseNotFound();
    }

    /** @test */
    public function should_prevent_sql_auto_convert_string_to_integer()
    {
        $this->call('DELETE', '/delete/1a2b3c4d5e');
        $this->assertResponseNotFound();
    }

    /** @test */
    public function delete_same_repair_multiple_times()
    {
        $repairId = $this->getTestRepairId();

        $this->call('DELETE', "/delete/{$repairId}");
        $this->call('DELETE', "/delete/{$repairId}");
        $this->assertResponseNotFound();
    }

    /** @test */
    public function delete_same_classroom_repair_multiple_times()
    {
        $repairId = $this->getTestRepairId(true);

        $this->call('DELETE', "/delete/{$repairId}");
        $this->call('DELETE', "/delete/{$repairId}");
        $this->assertResponseNotFound();
    }
}
