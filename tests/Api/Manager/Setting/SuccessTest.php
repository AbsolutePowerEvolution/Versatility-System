<?php

namespace Tests\Api\Manager\Setting;

use Illuminate\Foundation\Testing\DatabaseTransactions;

class SuccessTest extends SettingTest
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
    public function get_setting()
    {
        $this->call('GET', '/');
        $this->assertResponseOk();
        $this->seeJson();
    }

    /** @test */
    public function update_setting()
    {
        $this->call('PUT', '/', [
            'time_name' => str_random(),
            'began_date' => '2016-03-01',
            'ended_date' => '2016-03-31',
            'stu_start' => '2016-03-05',
            'lab_start' => '2016-03-01',
        ]);
        $this->assertResponseOk();
        $this->seeJson();
    }
}
