<?php

namespace Tests\Api\User\Loan;

use Illuminate\Foundation\Testing\DatabaseTransactions;

class InvalidInputTest extends LoanTest
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
    public function visit_others_with_negative_page_length()
    {
        $this->call('GET', 'others', ['length' => -135]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function visit_others_with_zero_page_length()
    {
        $this->call('GET', 'others', ['length' => 0]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function visit_others_with_non_integer_page_length()
    {
        $this->call('GET', 'others', ['length' => 'hello_world']);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function visit_classrooms_with_negative_page_length()
    {
        $this->call('GET', 'classrooms', ['length' => -135]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function visit_classrooms_with_zero_page_length()
    {
        $this->call('GET', 'classrooms', ['length' => 0]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function visit_classrooms_with_non_integer_page_length()
    {
        $this->call('GET', 'classrooms', ['length' => 'hello_world']);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function create_loan_without_input()
    {
        $this->call('POST', '/create');
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function create_loan_with_non_exists_property_id()
    {
        $this->call('POST', '/create', [
            'property_id' => 0,
            'date_began_at' => '2016-05-01',
            'date_ended_at' => '2016-05-01',
            'type' => $this->loanType,
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function create_loan_should_prevent_sql_auto_convert_string_to_integer()
    {
        $this->call('POST', '/create', [
            'property_id' => '1a2b3c4d5e',
            'date_began_at' => '2016-05-01',
            'date_ended_at' => '2016-05-01',
            'type' => $this->loanType,
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function create_loan_with_maintenance_property()
    {
        $this->call('POST', '/create', [
            'property_id' => $this->getTestPropertyId(false),
            'date_began_at' => '2016-05-01',
            'date_ended_at' => '2016-05-01',
            'type' => $this->loanType,
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function create_loan_with_maintenance_classroom()
    {
        $this->call('POST', '/create', [
            'property_id' => $this->getTestPropertyId(false, true),
            'date_began_at' => '2016-05-01',
            'date_ended_at' => '2016-05-01',
            'type' => $this->loanType,
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function create_loan_with_invalid_date_and_time_1()
    {
        $this->call('POST', '/create', [
            'property_id' => $this->getTestPropertyId(true, true),
            'date_began_at' => 'string',
            'date_ended_at' => 'string',
            'time_began_at' => 'string',
            'time_ended_at' => 'string',
            'type' => $this->loanType,
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function create_loan_with_invalid_date_and_time_2()
    {
        $this->call('POST', '/create', [
            'property_id' => $this->getTestPropertyId(true),
            'date_began_at' => 'string',
            'date_ended_at' => 'string',
            'time_began_at' => 'string',
            'time_ended_at' => 'string',
            'type' => $this->loanType,
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function create_loan_with_invalid_date_and_time_3()
    {
        $this->call('POST', '/create', [
            'property_id' => $this->getTestPropertyId(true, true),
            'date_began_at' => '2015-12-34',
            'date_ended_at' => '2015-22-33',
            'time_began_at' => '55:00:99',
            'time_ended_at' => '99:75:77',
            'type' => $this->loanType,
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function create_loan_with_invalid_date_and_time_4()
    {
        $this->call('POST', '/create', [
            'property_id' => $this->getTestPropertyId(true),
            'date_began_at' => '2015-12-34',
            'date_ended_at' => '2015-22-33',
            'time_began_at' => '55:00:99',
            'time_ended_at' => '99:75:77',
            'type' => $this->loanType,
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function create_loan_with_invalid_date_and_time_5()
    {
        $this->call('POST', '/create', [
            'property_id' => $this->getTestPropertyId(true, true),
            'date_began_at' => '2015-00-00',
            'date_ended_at' => '2015-00-00',
            'type' => $this->loanType,
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function create_loan_with_invalid_date_and_time_6()
    {
        $this->call('POST', '/create', [
            'property_id' => $this->getTestPropertyId(true),
            'date_began_at' => '2015-00-00',
            'date_ended_at' => '2015-00-00',
            'type' => $this->loanType,
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function create_loan_with_invalid_date_and_time_7()
    {
        $this->call('POST', '/create', [
            'property_id' => $this->getTestPropertyId(true, true),
            'date_began_at' => '2016-03-15',
            'date_ended_at' => '2015-03-10',
            'type' => $this->loanType,
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function create_loan_with_invalid_date_and_time_8()
    {
        $this->call('POST', '/create', [
            'property_id' => $this->getTestPropertyId(true),
            'date_began_at' => '2016-03-15',
            'date_ended_at' => '2015-03-10',
            'type' => $this->loanType,
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function create_loan_with_invalid_long_term_token_1()
    {
        $this->call('POST', '/create', [
            'property_id' => $this->getTestPropertyId(true, true),
            'date_began_at' => '2016-05-01',
            'date_ended_at' => '2016-05-01',
            'long_term_token' => 'string',
            'type' => $this->loanType,
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function create_loan_with_invalid_long_term_token_2()
    {
        $this->call('POST', '/create', [
            'property_id' => $this->getTestPropertyId(true, true),
            'date_began_at' => '2016-05-01',
            'date_ended_at' => '2016-05-01',
            'long_term_token' => '4096',
            'type' => $this->loanType,
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function create_loan_with_invalid_long_term_token_3()
    {
        $this->call('POST', '/create', [
            'property_id' => $this->getTestPropertyId(true, true),
            'date_began_at' => '2016-05-01',
            'date_ended_at' => '2016-05-01',
            'long_term_token' => '111111111111111111111111111111111111111111111',
            'type' => $this->loanType,
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function create_loan_with_invalid_long_term_token_4()
    {
        $this->call('POST', '/create', [
            'property_id' => $this->getTestPropertyId(true, true),
            'date_began_at' => '2016-05-01',
            'date_ended_at' => '2016-05-01',
            'long_term_token' => '-1',
            'type' => $this->loanType,
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function create_loan_with_invalid_long_term_token_5()
    {
        $this->call('POST', '/create', [
            'property_id' => $this->getTestPropertyId(true, true),
            'date_began_at' => '2016-05-01',
            'date_ended_at' => '2016-05-01',
            'long_term_token' => '111111',
            'type' => $this->loanType,
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function create_loan_with_invalid_long_term_token_6()
    {
        $this->call('POST', '/create', [
            'property_id' => $this->getTestPropertyId(true, true),
            'date_began_at' => '2016-05-01',
            'date_ended_at' => '2016-05-01',
            'long_term_token' => '1111111',
            'type' => $this->loanType,
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function create_loan_with_invalid_long_term_token_7()
    {
        $this->call('POST', '/create', [
            'property_id' => $this->getTestPropertyId(true, true),
            'date_began_at' => '2016-05-01',
            'date_ended_at' => '2016-05-01',
            'long_term_token' => '0000000',
            'type' => $this->loanType,
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function create_loan_with_long_term_token_but_not_classroom()
    {
        $this->call('POST', '/create', [
            'property_id' => $this->getTestPropertyId(true),
            'date_began_at' => '2016-05-01',
            'date_ended_at' => '2016-05-01',
            'long_term_token' => '1111111',
            'type' => $this->loanType,
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function create_loan_with_invalid_type_1()
    {
        $this->call('POST', '/create', [
            'property_id' => $this->getTestPropertyId(true, true),
            'date_began_at' => '2016-05-01',
            'date_ended_at' => '2016-05-01',
            'type' => 0,
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function create_loan_with_invalid_type_2()
    {
        $this->call('POST', '/create', [
            'property_id' => $this->getTestPropertyId(true),
            'date_began_at' => '2016-05-01',
            'date_ended_at' => '2016-05-01',
            'type' => 0,
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function create_loan_with_invalid_type_3()
    {
        $this->call('POST', '/create', [
            'property_id' => $this->getTestPropertyId(true, true),
            'date_began_at' => '2016-05-01',
            'date_ended_at' => '2016-05-01',
            'type' => 'hello_world',
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function create_loan_with_invalid_type_4()
    {
        $this->call('POST', '/create', [
            'property_id' => $this->getTestPropertyId(true),
            'date_began_at' => '2016-05-01',
            'date_ended_at' => '2016-05-01',
            'type' => 'hello_world',
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function create_loan_with_too_long_remark_1()
    {
        $this->call('POST', '/create', [
            'property_id' => $this->getTestPropertyId(true, true),
            'date_began_at' => '2016-05-01',
            'date_ended_at' => '2016-05-01',
            'remark' => str_random(500),
            'type' => $this->loanType,
        ]);
        $this->assertResponseUnprocessableEntity();
    }

    /** @test */
    public function create_loan_with_too_long_remark_2()
    {
        $this->call('POST', '/create', [
            'property_id' => $this->getTestPropertyId(true),
            'date_began_at' => '2016-05-01',
            'date_ended_at' => '2016-05-01',
            'remark' => str_random(500),
            'type' => $this->loanType,
        ]);
        $this->assertResponseUnprocessableEntity();
    }
}
