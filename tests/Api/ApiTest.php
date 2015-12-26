<?php

namespace Tests\Api;

use App\Affair\Category;
use App\Affair\Property;
use Tests\TestCase;

class ApiTest extends TestCase
{
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
            'category' => Category::getCategories('property', $classroom ? 'classroom' : 'others', true),
            'status' => Category::getCategories('property.status', $normal ? 'normal' : 'maintenance', true),
        ])->getAttribute('id');
    }

    /**
     * Get random category name.
     *
     * @param string $category
     * @return string
     */
    protected function randomCategoryName($category)
    {
        return Category::getCategories($category)->random()->getAttribute('name');
    }
}
