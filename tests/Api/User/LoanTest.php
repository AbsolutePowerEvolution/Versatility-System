<?php

use App\Affair\Property;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class LoanTest extends TestCase
{
    use CategoryHelper;
    use DatabaseTransactions;

    /**
     * The base URL to use while testing the application.
     *
     * @var string
     */
    protected $baseUrl = 'http://localhost/api/user/loan';

    public function test_it_should_response_403_if_not_sign_in()
    {
        $this->call('GET', '/others');
        $this->assertResponseForbidden();

        $this->call('GET', '/classrooms');
        $this->assertResponseForbidden();

        $this->call('POST', '/create');
        $this->assertResponseForbidden();

        $this->call('DELETE', '/delete/1');
        $this->assertResponseForbidden();

        // the priority of 403 should higher than 404
        $this->call('DELETE', '/delete/not_found');
        $this->assertResponseForbidden();
    }

    public function test_it_should_response_404_if_result_not_found()
    {
        $this->signIn();

        $this->call('DELETE', '/delete/not_found');
        $this->assertResponseNotFound();

        $this->call('DELETE', '/delete/1a2b3c4d5e');
        $this->assertResponseNotFound();

        // delete same repair multiple times
        $this->call('DELETE', '/delete/1');
        $this->call('DELETE', '/delete/1');
        $this->assertResponseNotFound();
    }

    public function test_it_should_response_409_if_loan_is_conflict()
    {
        $this->signIn();

        $propertyId = Property::first()->getAttribute('id');
        $loadType = $this->randomElement('loan.type', true);

        // 長期借用衝突測試
        $this->call('POST', '/create', [
            'property_id' => $propertyId,
            'date_began_at' => '2016-03-01',
            'date_ended_at' => '2016-03-31',
            'time_began_at' => '12:00:00',
            'time_ended_at' => '18:00:00',
            'type' => $loadType,
            'long_term_token' => '1111111'
        ]);

        // 長期借用衝突
        $this->call('POST', '/create', [
            'property_id' => $propertyId,
            'date_began_at' => '2016-02-01',
            'date_ended_at' => '2016-05-31',
            'time_began_at' => '14:00:00',
            'time_ended_at' => '16:00:00',
            'type' => $loadType,
            'long_term_token' => '0000010'
        ]);
        $this->assertResponseConflict();

        // 短期借用衝突
        $this->call('POST', '/create', [
            'property_id' => $propertyId,
            'date_began_at' => '2016-03-15',
            'date_ended_at' => '2016-03-15',
            'time_began_at' => '13:00:00',
            'time_ended_at' => '14:00:00',
            'type' => $loadType,
        ]);
        $this->assertResponseConflict();

        // 短期借用衝突（跨結束點）
        $this->call('POST', '/create', [
            'property_id' => $propertyId,
            'date_began_at' => '2016-03-15',
            'date_ended_at' => '2016-03-15',
            'time_began_at' => '17:00:00',
            'time_ended_at' => '19:00:00',
            'type' => $loadType,
        ]);
        $this->assertResponseConflict();

        // 短期借用衝突（整天借用型）
        $this->call('POST', '/create', [
            'property_id' => $propertyId,
            'date_began_at' => '2016-03-18',
            'date_ended_at' => '2016-03-18',
            'type' => $loadType,
        ]);
        $this->assertResponseConflict();

        // 短期借用衝突測試
        $this->call('POST', '/create', [
            'property_id' => $propertyId,
            'date_began_at' => '2016-06-01',
            'date_ended_at' => '2016-06-01',
            'time_began_at' => '12:00:00',
            'time_ended_at' => '18:00:00',
            'type' => $loadType,
        ]);
        $this->call('POST', '/create', [
            'property_id' => $propertyId,
            'date_began_at' => '2016-06-02',
            'date_ended_at' => '2016-06-02',
            'type' => $loadType,
        ]);

        // 短期借用衝突
        $this->call('POST', '/create', [
            'property_id' => $propertyId,
            'date_began_at' => '2016-06-01',
            'date_ended_at' => '2016-06-01',
            'time_began_at' => '14:35:00',
            'time_ended_at' => '16:20:00',
            'type' => $loadType,
        ]);
        $this->assertResponseConflict();

        $this->call('POST', '/create', [
            'property_id' => $propertyId,
            'date_began_at' => '2016-06-01',
            'date_ended_at' => '2016-06-01',
            'type' => $loadType,
        ]);
        $this->assertResponseConflict();

        $this->call('POST', '/create', [
            'property_id' => $propertyId,
            'date_began_at' => '2016-06-02',
            'date_ended_at' => '2016-06-02',
            'time_began_at' => '14:35:00',
            'time_ended_at' => '16:20:00',
            'type' => $loadType,
        ]);
        $this->assertResponseConflict();

        // 短期借用衝突（跨結束點）
        $this->call('POST', '/create', [
            'property_id' => $propertyId,
            'date_began_at' => '2016-06-01',
            'date_ended_at' => '2016-06-01',
            'time_began_at' => '17:30:00',
            'time_ended_at' => '19:00:00',
            'type' => $loadType,
        ]);
        $this->assertResponseConflict();

        $this->call('POST', '/create', [
            'property_id' => $propertyId,
            'date_began_at' => '2016-06-02',
            'date_ended_at' => '2016-06-03',
            'time_began_at' => '23:30:00',
            'time_ended_at' => '01:00:00',
            'type' => $loadType,
        ]);
        $this->assertResponseConflict();

        // 短期借用衝突（跨開始點）
        $this->call('POST', '/create', [
            'property_id' => $propertyId,
            'date_began_at' => '2016-06-01',
            'date_ended_at' => '2016-06-01',
            'time_began_at' => '09:30:00',
            'time_ended_at' => '12:30:00',
            'type' => $loadType,
        ]);
        $this->assertResponseConflict();

        $this->call('POST', '/create', [
            'property_id' => $propertyId,
            'date_began_at' => '2016-06-01',
            'date_ended_at' => '2016-06-02',
            'time_began_at' => '23:30:00',
            'time_ended_at' => '01:30:00',
            'type' => $loadType,
        ]);
        $this->assertResponseConflict();
    }

    public function test_it_should_response_422_if_input_is_invalid()
    {
        $this->signIn();

        $this->call('GET', 'others', ['length' => -135]);
        $this->assertResponseUnprocessableEntity();

        $this->call('GET', 'others', ['length' => 0]);
        $this->assertResponseUnprocessableEntity();

        $this->call('GET', 'others', ['length' => 'hello_world']);
        $this->assertResponseUnprocessableEntity();

        $this->call('GET', 'classrooms', ['length' => -135]);
        $this->assertResponseUnprocessableEntity();

        $this->call('GET', 'classrooms', ['length' => 0]);
        $this->assertResponseUnprocessableEntity();

        $this->call('GET', 'classrooms', ['length' => 'hello_world']);
        $this->assertResponseUnprocessableEntity();

        $this->call('POST', '/create');
        $this->assertResponseUnprocessableEntity();

        $this->call('POST', '/create', ['property_id' => 0]);
        $this->assertResponseUnprocessableEntity();

        $this->call('POST', '/create', ['property_id' => '1a2b3c4d5e']);
        $this->assertResponseUnprocessableEntity();

        $this->call('POST', '/create', [
            'property_id' => 'string',
            'date_began_at' => 'string',
            'date_ended_at' => 'string',
            'time_began_at' => 'string',
            'time_ended_at' => 'string',
            'long_term_token' => 'string',
        ]);
        $this->assertResponseUnprocessableEntity();

        $this->call('POST', '/create', [
            'date_began_at' => '2015-12-34',
            'date_ended_at' => '2015-22-33',
            'time_began_at' => '55:00:99',
            'time_ended_at' => '99:75:77',
        ]);
        $this->assertResponseUnprocessableEntity();

        $this->call('POST', '/create', ['long_term_token' => '4096']);
        $this->assertResponseUnprocessableEntity();

        $this->call('POST', '/create', ['long_term_token' => '111111111111111111111111111111111111111111111']);
        $this->assertResponseUnprocessableEntity();

        $this->call('POST', '/create', ['long_term_token' => '-1']);
        $this->assertResponseUnprocessableEntity();

        $this->call('POST', '/create', ['type' => 0]);
        $this->assertResponseUnprocessableEntity();

        $this->call('POST', '/create', ['remark' => str_random(500)]);
        $this->assertResponseUnprocessableEntity();
    }

    public function test_it_should_response_success_and_get_the_data()
    {
        $this->signIn();

        $this->call('GET', 'others');
        $this->assertResponseOk();
        $this->seeJson();

        $this->call('GET', 'classrooms');
        $this->assertResponseOk();
        $this->seeJson();

        $propertyId = Property::first()->getAttribute('id');

        $this->call('POST', '/create', [
            'property_id' => $propertyId,
            'date_began_at' => '2016-03-01',
            'date_ended_at' => '2016-03-01',
            'time_began_at' => '12:00:00',
            'time_ended_at' => '14:00:00',
            'remark' => str_random(16),
            'type' => $this->randomElement('loan.type', true),
            'long_term_token' => '0000000'
        ]);
        $this->assertResponseCreated();

        $this->call('POST', '/create', [
            'property_id' => $propertyId,
            'date_began_at' => '2016-03-02',
            'date_ended_at' => '2016-03-02',
            'time_began_at' => '12:00:00',
            'time_ended_at' => '14:00:00',
            'remark' => str_random(16),
            'type' => $this->randomElement('loan.type', true),
        ]);
        $this->assertResponseCreated();

        $this->call('POST', '/create', [
            'property_id' => $propertyId,
            'date_began_at' => '2016-03-02',
            'date_ended_at' => '2016-03-02',
            'time_began_at' => '14:00:00',
            'time_ended_at' => '16:00:00',
            'remark' => str_random(16),
            'type' => $this->randomElement('loan.type', true),
        ]);
        $this->assertResponseCreated();

        $this->call('DELETE', '/delete/1');
        $this->assertResponseOk();
    }
}
