<?php

namespace Tests\Api\Manager\Loan;

use App\Affair\Loan;
use App\Affair\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class SuccessTest extends LoanTest
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
    public function create_loan_1()
    {
        $this->call('POST', '/other-create', [
            'property_id' => $this->getTestPropertyId(),
            'date_began_at' => '2016-03-01',
            'date_ended_at' => '2016-03-01',
            'user_id' => User::where('username', 'test')->first()->getAttribute('id'),
        ]);
        $this->assertResponseCreated();
        $this->seeJson();
    }

    /** @test */
    public function create_loan_2()
    {
        $this->call('POST', '/other-create', [
            'property_id' => $this->getTestPropertyId(),
            'date_began_at' => '2016-03-02',
            'date_ended_at' => '2016-03-07',
            'user_id' => User::where('username', 'test')->first()->getAttribute('id'),
            'type' => $this->randomCategoryName('loan.type'),
        ]);
        $this->assertResponseCreated();
        $this->seeJson();
    }

    /** @test */
    public function verify_loan()
    {
        $loan = Loan::find($this->getTestLoanId());

        $this->call('PUT', '/class-verify/'.$loan->getAttribute('id'), [
            'status' => $this->randomCategoryName('loan.status'),
        ]);
        $this->assertResponseOk();
        $this->seeJson();
    }
}
