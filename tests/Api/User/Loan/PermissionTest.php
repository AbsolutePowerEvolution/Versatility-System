<?php

namespace Tests\Api\User\Loan;

use Illuminate\Foundation\Testing\DatabaseTransactions;

class PermissionTest extends  LoanTest
{
    use DatabaseTransactions;

    /** @test */
    public function visit_others_with_not_sign_in()
    {
        $this->call('GET', '/others');
        $this->assertResponseForbidden();
    }

    /** @test */
    public function visit_classrooms_with_not_sign_in()
    {
        $this->call('GET', '/classrooms');
        $this->assertResponseForbidden();
    }

    /** @test */
    public function create_loan_with_not_sign_in()
    {
        $this->call('POST', '/create');
        $this->assertResponseForbidden();
    }

    /** @test */
    public function delete_loan_with_not_sign_in()
    {
        $loanId = $this->getTestLoanId();

        $this->call('DELETE', "/delete/{$loanId}");
        $this->assertResponseForbidden();
    }

    /** @test */
    public function delete_classroom_loan_with_not_sign_in()
    {
        $loanId = $this->getTestLoanId(true);

        $this->call('DELETE', "/delete/{$loanId}");
        $this->assertResponseForbidden();
    }

    /** @test */
    public function permission_check_should_before_not_found_check()
    {
        $this->call('DELETE', '/delete/not_found');
        $this->assertResponseForbidden();
    }
}
