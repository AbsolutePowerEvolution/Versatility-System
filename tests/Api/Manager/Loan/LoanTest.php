<?php

namespace Tests\Api\Manager\Loan;

use App\Affair\Loan;
use Tests\Api\ApiTest;

class LoanTest extends ApiTest
{
    /**
     * The base URL to use while testing the application.
     *
     * @var string
     */
    protected $baseUrl = 'http://localhost/api/manager/loan';

    /**
     * 取得測試借用資料 id
     *
     * @param bool $classroom
     * @return int
     */
    protected function getTestLoanId($classroom = false)
    {
        return factory(Loan::class)->create([
            'property_id' => $this->getTestPropertyId(true, $classroom),
            'long_term_token' => null,
        ])->getAttribute('id');
    }
}
