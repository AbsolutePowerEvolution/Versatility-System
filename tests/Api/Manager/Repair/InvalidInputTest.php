<?php

namespace Tests\Api\Manager\Repair;

use Illuminate\Foundation\Testing\DatabaseTransactions;

class InvalidInputTest extends RepairTest
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
    public function update_repair_with_invalid_list_1()
    {
        $this->call('PUT', '/', [
            'repair_list' => 0,
        ]);
        $this->assertResponseUnprocessableEntity();
    }
    
    /** @test */
    public function update_repair_with_invalid_list_2()
    {
        $this->call('PUT', '/', [
            'repair_list' => 'string',
        ]);
        $this->assertResponseUnprocessableEntity();
    }
    
    /** @test */
    public function update_repair_with_invalid_list_3()
    {
        $this->call('PUT', '/', [
            'repair_list' => [],
        ]);
        $this->assertResponseUnprocessableEntity();
    }
    
    /** @test */
    public function update_repair_with_invalid_list_4()
    {
        $this->call('PUT', '/', [
            'repair_list' => [-1, -5],
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function update_repair_with_invalid_list_5()
    {
        $this->call('PUT', '/', [
            'repair_list' => [null, true, false],
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function update_repair_with_invalid_list_6()
    {
        $this->call('PUT', '/', [
            'repair_list' => ['string', 'hello_world'],
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function update_repair_with_invalid_list_7()
    {
        $this->call('PUT', '/', [
            'repair_list' => ['1a2b3c4d5e', '2a3c4d5e', '3c4d5e'],
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function update_repair_with_invalid_list_8()
    {
        $this->call('PUT', '/', [
            'repair_list' => [999999999, 888888888, 777777777],
        ]);
        $this->assertResponseUnprocessableEntity();
    }
}
