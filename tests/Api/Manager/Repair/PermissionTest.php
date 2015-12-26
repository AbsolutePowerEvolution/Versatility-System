<?php

namespace Tests\Api\Manager\Repair;

use Illuminate\Foundation\Testing\DatabaseTransactions;

class PermissionTest extends RepairTest
{
    use DatabaseTransactions;

    /** @test */
    public function update_repair_with_not_sign_in()
    {
        $this->call('PUT', '/');
        $this->assertResponseForbidden();
    }

    /** @test */
    public function update_repair_with_normal_user()
    {
        $this->signIn();
        $this->call('PUT', '/');
        $this->assertResponseForbidden();
    }

    /** @test */
    public function update_repair_with_lab_user()
    {
        $this->signInWithLab();
        $this->call('PUT', '/');
        $this->assertResponseForbidden();
    }
}
