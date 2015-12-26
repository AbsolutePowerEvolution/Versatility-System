<?php

namespace Tests\Api\User\Loan;

use Illuminate\Foundation\Testing\DatabaseTransactions;

class DuplicateTest extends LoanTest
{
    use DatabaseTransactions;

    /**
     * @var int
     */
    protected $propertyId;

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

        $this->initialize();

        $this->makeLoan();
    }

    /**
     * 初始化借用資料
     *
     * @return void
     */
    protected function initialize()
    {
        $this->propertyId = $this->getTestPropertyId(true, true);

        $this->loanType = $this->randomCategoryName('loan.type');
    }

    /**
     * 借用教室
     *
     * @return void
     */
    protected function makeLoan()
    {
        // 長期借用，3月的每天12點至18點
        $this->call('POST', '/create', [
            'property_id' => $this->propertyId,
            'date_began_at' => '2016-03-01',
            'date_ended_at' => '2016-03-31',
            'time_began_at' => '12:00:00',
            'time_ended_at' => '18:00:00',
            'type' => $this->loanType,
            'long_term_token' => '1111111'
        ]);

        // 短期借用，6月1號的12點至18點
        $this->call('POST', '/create', [
            'property_id' => $this->propertyId,
            'date_began_at' => '2016-06-01',
            'date_ended_at' => '2016-06-01',
            'time_began_at' => '12:00:00',
            'time_ended_at' => '18:00:00',
            'type' => $this->loanType,
        ]);

        // 短期借用，6月2號整天
        $this->call('POST', '/create', [
            'property_id' => $this->propertyId,
            'date_began_at' => '2016-06-02',
            'date_ended_at' => '2016-06-02',
            'type' => $this->loanType,
        ]);
    }

    /** @test */
    public function long_term_conflict_long_term()
    {
        $this->call('POST', '/create', [
            'property_id' => $this->propertyId,
            'date_began_at' => '2016-02-01',
            'date_ended_at' => '2016-05-31',
            'time_began_at' => '14:00:00',
            'time_ended_at' => '16:00:00',
            'type' => $this->loanType,
            'long_term_token' => '0000010'
        ]);
        $this->assertResponseConflict();
    }

    /** @test */
    public function short_term_conflict_long_term()
    {
        $this->call('POST', '/create', [
            'property_id' => $this->propertyId,
            'date_began_at' => '2016-03-15',
            'date_ended_at' => '2016-03-15',
            'time_began_at' => '13:00:00',
            'time_ended_at' => '14:00:00',
            'type' => $this->loanType
        ]);
        $this->assertResponseConflict();
    }

    /** @test */
    public function short_term_with_cross_ended_time_conflict_long_term()
    {
        $this->call('POST', '/create', [
            'property_id' => $this->propertyId,
            'date_began_at' => '2016-03-15',
            'date_ended_at' => '2016-03-15',
            'time_began_at' => '17:00:00',
            'time_ended_at' => '19:00:00',
            'type' => $this->loanType
        ]);
        $this->assertResponseConflict();
    }

    /** @test */
    public function short_term_with_all_day_conflict_long_term()
    {
        $this->call('POST', '/create', [
            'property_id' => $this->propertyId,
            'date_began_at' => '2016-03-18',
            'date_ended_at' => '2016-03-18',
            'type' => $this->loanType
        ]);
        $this->assertResponseConflict();
    }

    /** @test */
    public function short_term_conflict_short_term()
    {
        $this->call('POST', '/create', [
            'property_id' => $this->propertyId,
            'date_began_at' => '2016-06-01',
            'date_ended_at' => '2016-06-01',
            'time_began_at' => '14:35:00',
            'time_ended_at' => '16:20:00',
            'type' => $this->loanType
        ]);
        $this->assertResponseConflict();
    }

    /** @test */
    public function short_term_with_all_day_conflict_short_term()
    {
        $this->call('POST', '/create', [
            'property_id' => $this->propertyId,
            'date_began_at' => '2016-06-01',
            'date_ended_at' => '2016-06-01',
            'type' => $this->loanType
        ]);
        $this->assertResponseConflict();
    }

    /** @test */
    public function short_term_conflict_short_term_with_all_day()
    {
        $this->call('POST', '/create', [
            'property_id' => $this->propertyId,
            'date_began_at' => '2016-06-02',
            'date_ended_at' => '2016-06-02',
            'time_began_at' => '14:35:00',
            'time_ended_at' => '16:20:00',
            'type' => $this->loanType
        ]);
        $this->assertResponseConflict();
    }

    /** @test */
    public function short_term_with_cross_ended_time_conflict_short_term()
    {
        $this->call('POST', '/create', [
            'property_id' => $this->propertyId,
            'date_began_at' => '2016-06-01',
            'date_ended_at' => '2016-06-01',
            'time_began_at' => '17:30:00',
            'time_ended_at' => '19:00:00',
            'type' => $this->loanType
        ]);
        $this->assertResponseConflict();
    }

    /** @test */
    public function short_term_with_cross_ended_time_conflict_short_term_with_all_day()
    {
        $this->call('POST', '/create', [
            'property_id' => $this->propertyId,
            'date_began_at' => '2016-06-02',
            'date_ended_at' => '2016-06-03',
            'time_began_at' => '23:30:00',
            'time_ended_at' => '01:00:00',
            'type' => $this->loanType
        ]);
        $this->assertResponseConflict();
    }

    /** @test */
    public function short_term_with_cross_began_time_conflict_short_term()
    {
        $this->call('POST', '/create', [
            'property_id' => $this->propertyId,
            'date_began_at' => '2016-06-01',
            'date_ended_at' => '2016-06-01',
            'time_began_at' => '09:30:00',
            'time_ended_at' => '12:30:00',
            'type' => $this->loanType
        ]);
        $this->assertResponseConflict();
    }

    /** @test */
    public function short_term_with_cross_began_time_conflict_short_term_with_all_day()
    {
        $this->call('POST', '/create', [
            'property_id' => $this->propertyId,
            'date_began_at' => '2016-06-01',
            'date_ended_at' => '2016-06-02',
            'time_began_at' => '23:30:00',
            'time_ended_at' => '01:30:00',
            'type' => $this->loanType
        ]);
        $this->assertResponseConflict();
    }
}
