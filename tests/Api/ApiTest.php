<?php

namespace Tests\Api;

use App\Affair\Property;
use Tests\Helper\CategoryHelper;
use Tests\TestCase;

class ApiTest extends TestCase
{
    use CategoryHelper;

    /**
     * 取得測試財產資料 id
     *
     * @param bool $normal
     * @param bool $classroom
     * @return int
     */
    protected function getTestPropertyId($normal = true, $classroom = false)
    {
        return factory(Property::class)->create([
            'category' => $this->specificElement('property', $classroom ? 'classroom' : 'others'),
            'status' => $this->specificElement('property.status', $normal ? 'normal' : 'maintenance'),
        ])->getAttribute('id');
    }
}
