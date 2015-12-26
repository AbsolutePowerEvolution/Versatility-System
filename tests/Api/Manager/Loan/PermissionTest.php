<?php

namespace Tests\Api\Manager\Loan;

use Illuminate\Foundation\Testing\DatabaseTransactions;

class PermissionTest extends LoanTest
{
    use DatabaseTransactions;

    /** @test */
    public function create_loan_with_not_sign_in()
    {
        $this->call('POST', '/other-create');
        $this->assertResponseForbidden();
    }

    /** @test */
    public function create_loan_with_normal_user()
    {
        $this->signIn();
        $this->call('POST', '/other-create');
        $this->assertResponseForbidden();
    }

    /** @test */
    public function create_loan_with_lab_user()
    {
        $this->signInWithLab();
        $this->call('POST', '/other-create');
        $this->assertResponseForbidden();
    }

    /** @test */
    public function verify_loan_with_not_sign_in()
    {
        $loanId = $this->getTestLoanId();

        $this->call('PUT', "/class-verify/{$loanId}");
        $this->assertResponseForbidden();
    }

    /** @test */
    public function verify_loan_with_normal_user()
    {
        $loanId = $this->getTestLoanId();

        $this->signIn();
        $this->call('PUT', "/class-verify/{$loanId}");
        $this->assertResponseForbidden();
    }

    /** @test */
    public function verify_loan_with_lab_user()
    {
        $loanId = $this->getTestLoanId();

        $this->signInWithLab();
            $this->call('PUT', "/class-verify/{$loanId}");
        $this->assertResponseForbidden();
    }

    /** @test */
    public function permission_check_should_before_not_found_check()
    {
        $this->call('PUT', '/class-verify/forbidden_first');
        $this->assertResponseForbidden();
    }
}
