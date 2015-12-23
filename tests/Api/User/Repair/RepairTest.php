<?php

namespace Tests\Api\User\Repair;

use App\Affair\Repair;
use Tests\Api\ApiTest;

class RepairTest extends ApiTest
{
    /**
     * The base URL to use while testing the application.
     *
     * @var string
     */
    protected $baseUrl = 'http://localhost/api/user/repair';

    /**
     * 取得測試報修資料 id
     *
     * @param bool $classroom
     * @return int
     */
    protected function getTestRepairId($classroom = false)
    {
        return factory(Repair::class)->create([
            'property_id' => $this->getTestPropertyId(true, $classroom),
        ])->getAttribute('id');
    }
}
