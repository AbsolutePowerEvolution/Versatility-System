<?php

namespace Tests\Api\Manager\Setting;

use Illuminate\Foundation\Testing\DatabaseTransactions;

class InvalidInputTest extends SettingTest
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
    public function update_setting_without_input()
    {
        $this->call('PUT', '/');
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function update_setting_with_time_name()
    {
        $this->call('PUT', '/', [
            'began_date' => '2016-03-01',
            'ended_date' => '2016-03-31',
            'stu_start' => '2016-03-05',
            'lab_start' => '2016-03-01',
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function update_setting_with_began_date()
    {
        $this->call('PUT', '/', [
            'time_name' => str_random(),
            'ended_date' => '2016-03-31',
            'stu_start' => '2016-03-05',
            'lab_start' => '2016-03-01',
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function update_setting_with_ended_date()
    {
        $this->call('PUT', '/', [
            'time_name' => str_random(),
            'began_date' => '2016-03-01',
            'stu_start' => '2016-03-05',
            'lab_start' => '2016-03-01',
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function update_setting_with_stu_start()
    {
        $this->call('PUT', '/', [
            'time_name' => str_random(),
            'began_date' => '2016-03-01',
            'ended_date' => '2016-03-31',
            'lab_start' => '2016-03-01',
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function update_setting_with_lab_start()
    {
        $this->call('PUT', '/', [
            'time_name' => str_random(),
            'began_date' => '2016-03-01',
            'ended_date' => '2016-03-31',
            'stu_start' => '2016-03-05',
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function update_setting_with_invalid_date_1()
    {
        $this->call('PUT', '/', [
            'time_name' => str_random(),
            'began_date' => '2016-99-44',
            'ended_date' => '2011-44-55',
            'stu_start' => '1234-56-78',
            'lab_start' => '9876-54-21',
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function update_setting_with_invalid_date_2()
    {
        $this->call('PUT', '/', [
            'time_name' => str_random(),
            'began_date' => 'aabb',
            'ended_date' => 'ccdd',
            'stu_start' => 'eeff',
            'lab_start' => 'gghh',
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function update_setting_with_invalid_date_3()
    {
        $this->call('PUT', '/', [
            'time_name' => str_random(),
            'began_date' => '!!!',
            'ended_date' => '---',
            'stu_start' => '+++',
            'lab_start' => '***',
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function update_setting_with_invalid_date_4()
    {
        $this->call('PUT', '/', [
            'time_name' => str_random(),
            'began_date' => '2016-03-31',
            'ended_date' => '2016-03-15',
            'stu_start' => '2016-03-20',
            'lab_start' => '2016-03-20',
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function update_setting_with_invalid_date_5()
    {
        $this->call('PUT', '/', [
            'time_name' => str_random(),
            'began_date' => '2016-03-01',
            'ended_date' => '2016-03-31',
            'stu_start' => '2016-04-15',
            'lab_start' => '2016-02-20',
        ]);
        $this->assertResponseUnprocessableEntity();
    }
}
