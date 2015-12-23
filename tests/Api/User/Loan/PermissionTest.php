<?php

namespace Tests\Api\User\Loan;

class PermissionTest extends  LoanTest
{
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
        $this->call('DELETE', '/delete/1');
        $this->assertResponseForbidden();
    }

    /** @test */
    public function permission_check_should_before_not_found_check()
    {
        $this->call('DELETE', '/delete/not_found');
        $this->assertResponseForbidden();
    }
}
