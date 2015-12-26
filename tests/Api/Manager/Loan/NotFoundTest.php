<?php

namespace Tests\Api\Manager\Loan;

use Illuminate\Foundation\Testing\DatabaseTransactions;

class NotFoundTest extends LoanTest
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
    public function verify_not_exists_loan_1()
    {
        $this->call('PUT', '/class-verify/not_found');
        $this->assertResponseNotFound();
    }

    /** @test */
    public function verify_not_exists_loan_2()
    {
        $this->call('PUT', '/class-verify/-5');
        $this->assertResponseNotFound();
    }

    /** @test */
    public function verify_not_exists_loan_3()
    {
        $this->call('PUT', '/class-verify/0');
        $this->assertResponseNotFound();
    }
}
