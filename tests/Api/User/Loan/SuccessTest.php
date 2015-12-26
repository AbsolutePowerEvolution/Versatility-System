<?php

namespace Tests\Api\User\Loan;

use Illuminate\Foundation\Testing\DatabaseTransactions;

class SuccessTest extends LoanTest
{
    use DatabaseTransactions;

    /**
     * @var string
     */
    protected $loanType;

    /**
     * Setup the test environment.
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();

        $this->signIn();

        $this->loanType = $this->randomCategoryName('loan.type');
    }

    /** @test */
    public function visit_others()
    {
        $this->call('GET', 'others');
        $this->assertResponseOk();
        $this->seeJson();
    }

    /** @test */
    public function visit_classrooms()
    {
        $this->call('GET', 'classrooms');
        $this->assertResponseOk();
        $this->seeJson();
    }

    /** @test */
    public function create_not_classroom_loan()
    {
        $this->call('POST', '/create', [
            'property_id' => $this->getTestPropertyId(true),
            'date_began_at' => '2016-03-01',
            'date_ended_at' => '2016-03-01',
            'time_began_at' => '12:17:00',
            'time_ended_at' => '12:33:00',
            'type' => $this->loanType,
        ]);
        $this->assertResponseCreated();
    }

    /** @test */
    public function create_short_term_loan()
    {
        $this->call('POST', '/create', [
            'property_id' => $this->getTestPropertyId(true, true),
            'date_began_at' => '2016-03-01',
            'date_ended_at' => '2016-03-01',
            'time_began_at' => '12:00:00',
            'time_ended_at' => '14:00:00',
            'remark' => str_random(16),
            'type' => $this->loanType,
        ]);
        $this->assertResponseCreated();
    }

    /** @test */
    public function create_short_term_loan_with_all_day()
    {
        $this->call('POST', '/create', [
            'property_id' => $this->getTestPropertyId(true, true),
            'date_began_at' => '2016-03-02',
            'date_ended_at' => '2016-03-02',
            'remark' => str_random(16),
            'type' => $this->loanType,
        ]);
        $this->assertResponseCreated();
    }

    /** @test */
    public function create_long_term_loan_1()
    {
        $this->call('POST', '/create', [
            'property_id' => $this->getTestPropertyId(true, true),
            'date_began_at' => '2016-03-01',
            'date_ended_at' => '2016-03-31',
            'remark' => str_random(16),
            'type' => $this->loanType,
            'long_term_token' => '1101010',
        ]);
        $this->assertResponseCreated();
    }

    /** @test */
    public function create_long_term_loan_2()
    {
        $this->call('POST', '/create', [
            'property_id' => $this->getTestPropertyId(true, true),
            'date_began_at' => '2016-04-01',
            'date_ended_at' => '2016-04-31',
            'time_began_at' => '12:00:00',
            'time_ended_at' => '14:00:00',
            'remark' => str_random(16),
            'type' => $this->loanType,
            'long_term_token' => '1101010',
        ]);
        $this->assertResponseCreated();
    }

    /** @test */
    public function delete_loan()
    {
        $loanId = $this->getTestLoanId();

        $this->call('DELETE', "/delete/{$loanId}");
        $this->assertResponseOk();
    }

    /** @test */
    public function delete_classroom_loan()
    {
        $loanId = $this->getTestLoanId(true);

        $this->call('DELETE', "/delete/{$loanId}");
        $this->assertResponseOk();
    }
}
