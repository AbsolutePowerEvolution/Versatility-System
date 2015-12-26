<?php

namespace Tests\Api\Manager\Loan;

use App\Affair\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class InvalidInputTest extends LoanTest
{
    use DatabaseTransactions;
    
    /**
     * @var int
     */
    protected $propertyId;
    
    /**
     * @var int
     */
    protected $userId;

    /**
     * Setup the test environment.
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();

        $this->signInWithManager();

        $this->propertyId = $this->getTestPropertyId(true);
        
        $this->userId = User::where('username', 'test')->first()->getAttribute('id');
    }

    /** @test */
    public function create_loan_without_input()
    {
        $this->call('POST', '/other-create');
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function create_loan_without_property_id()
    {
        $this->call('POST', '/other-create', [
            'date_began_at' => '2016-03-01',
            'date_ended_at' => '2016-03-01',
            'user_id' => $this->userId,
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function create_loan_without_date()
    {
        $this->call('POST', '/other-create', [
            'property_id' => $this->propertyId,
            'user_id' => $this->userId,
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function create_loan_without_user_id()
    {
        $this->call('POST', '/other-create', [
            'property_id' => $this->propertyId,
            'date_began_at' => '2016-03-01',
            'date_ended_at' => '2016-03-01',
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function create_loan_with_invalid_property_id_1()
    {
        $this->call('POST', '/other-create', [
            'property_id' => 0,
            'date_began_at' => '2016-03-01',
            'date_ended_at' => '2016-03-01',
            'user_id' => $this->userId,
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function create_loan_with_invalid_property_id_2()
    {
        $this->call('POST', '/other-create', [
            'property_id' => 'hello_world',
            'date_began_at' => '2016-03-01',
            'date_ended_at' => '2016-03-01',
            'user_id' => $this->userId,
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function create_loan_with_invalid_date_1()
    {
        $this->call('POST', '/other-create', [
            'property_id' => $this->propertyId,
            'date_began_at' => '2016-03-00',
            'date_ended_at' => '2016-03-99',
            'user_id' => $this->userId,
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function create_loan_with_invalid_date_2()
    {
        $this->call('POST', '/other-create', [
            'property_id' => $this->propertyId,
            'date_began_at' => '-+/',
            'date_ended_at' => '-*/',
            'user_id' => $this->userId,
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function create_loan_with_invalid_date_3()
    {
        $this->call('POST', '/other-create', [
            'property_id' => $this->propertyId,
            'date_began_at' => 'abcd',
            'date_ended_at' => 'efgh',
            'user_id' => $this->userId,
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function create_loan_with_invalid_user_id_1()
    {
        $this->call('POST', '/other-create', [
            'property_id' => $this->propertyId,
            'date_began_at' => '2016-03-01',
            'date_ended_at' => '2016-03-01',
            'user_id' => 0,
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function create_loan_with_invalid_user_id_2()
    {
        $this->call('POST', '/other-create', [
            'property_id' => $this->propertyId,
            'date_began_at' => '2016-03-01',
            'date_ended_at' => '2016-03-01',
            'user_id' => 'hello_world',
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function create_loan_with_invalid_type_1()
    {
        $this->call('POST', '/other-create', [
            'property_id' => $this->propertyId,
            'date_began_at' => '2016-03-01',
            'date_ended_at' => '2016-03-01',
            'user_id' => $this->userId,
            'type' => 0,
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function create_loan_with_invalid_type_2()
    {
        $this->call('POST', '/other-create', [
            'property_id' => $this->propertyId,
            'date_began_at' => '2016-03-01',
            'date_ended_at' => '2016-03-01',
            'user_id' => $this->userId,
            'type' => 'hello_world',
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function create_loan_with_too_long_remark()
    {
        $this->call('POST', '/other-create', [
            'property_id' => $this->propertyId,
            'date_began_at' => '2016-03-01',
            'date_ended_at' => '2016-03-01',
            'user_id' => $this->userId,
            'remark' => str_random(500),
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function verify_loan_with_invalid_status_1()
    {
        $loanId = $this->getTestLoanId();

        $this->call('PUT', "/class-verify/{$loanId}", [
            'status' => 0,
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function verify_loan_with_invalid_status_2()
    {
        $loanId = $this->getTestLoanId();

        $this->call('PUT', "/class-verify/{$loanId}", [
            'status' => 'hello_world',
        ]);
        $this->assertResponseUnprocessableEntity();
    }
}
