<?php

namespace Tests\Api\Manager\Setting;

use Illuminate\Foundation\Testing\DatabaseTransactions;

class PermissionTest extends SettingTest
{
    use DatabaseTransactions;

    /** @test */
    public function get_setting_with_not_sign_in()
    {
        $this->call('GET', '/');
        $this->assertResponseForbidden();
    }

    /** @test */
    public function get_setting_with_normal_user()
    {
        $this->signIn();
        $this->call('GET', '/');
        $this->assertResponseForbidden();
    }

    /** @test */
    public function get_setting_with_with_lab_user()
    {
        $this->signInWithLab();
        $this->call('GET', '/');
        $this->assertResponseForbidden();
    }

    /** @test */
    public function update_setting_with_not_sign_in()
    {
        $this->call('PUT', '/');
        $this->assertResponseForbidden();
    }

    /** @test */
    public function update_setting_with_normal_user()
    {
        $this->signIn();
        $this->call('PUT', '/');
        $this->assertResponseForbidden();
    }

    /** @test */
    public function update_setting_with_with_lab_user()
    {
        $this->signInWithLab();
        $this->call('PUT', '/');
        $this->assertResponseForbidden();
    }
}
