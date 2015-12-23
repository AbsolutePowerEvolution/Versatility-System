<?php

namespace Tests\Api\User\Loan;

use App\Affair\Property;
use Tests\TestCase;

class LoanTest extends TestCase
{
    /**
     * The base URL to use while testing the application.
     *
     * @var string
     */
    protected $baseUrl = 'http://localhost/api/user/loan';

    /**
     * 產生測試財產資料
     *
     * @return int
     */
    protected function getTestPropertyId()
    {
        return factory(Property::class)->create()->getAttribute('id');
    }
}
