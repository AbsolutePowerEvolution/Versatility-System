<?php

namespace Tests\Api\User\Repair;

use Illuminate\Foundation\Testing\DatabaseTransactions;

class PermissionTest extends RepairTest
{
    use DatabaseTransactions;

    /** @test */
    public function visit_index_with_not_sign_in()
    {
        $this->call('GET', '/');
        $this->assertResponseForbidden();
    }

    /** @test */
    public function create_repair_with_not_sign_in()
    {
        $this->call('POST', '/create');
        $this->assertResponseForbidden();
    }

    /** @test */
    public function delete_repair_with_not_sign_in()
    {
        $repairId = $this->getTestRepairId();

        $this->call('DELETE', "/delete/{$repairId}");
        $this->assertResponseForbidden();
    }

    /** @test */
    public function delete_classroom_repair_with_not_sign_in()
    {
        $repairId = $this->getTestRepairId(true);

        $this->call('DELETE', "/delete/{$repairId}");
        $this->assertResponseForbidden();
    }

    /** @test */
    public function permission_check_should_before_not_found_check()
    {
        $this->call('DELETE', '/delete/not_found');
        $this->assertResponseForbidden();
    }
}
