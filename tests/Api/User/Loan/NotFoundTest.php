<?php

namespace Tests\Api\User\Loan;

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

        $this->signIn();
    }

    /** @test */
    public function delete_non_exists_loan()
    {
        $this->call('DELETE', '/delete/not_found');
        $this->assertResponseNotFound();
    }

    /** @test */
    public function should_prevent_sql_auto_convert_string_to_integer()
    {
        $this->call('DELETE', '/delete/1a2b3c4d5e');
        $this->assertResponseNotFound();
    }

    /** @test */
    public function delete_same_loan_multiple_times()
    {
        $propertyId = $this->getTestPropertyId();

        $this->call('DELETE', "/delete/{$propertyId}");
        $this->call('DELETE', "/delete/{$propertyId}");
        $this->assertResponseNotFound();
    }
}
