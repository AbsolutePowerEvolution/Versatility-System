<?php

namespace Tests\Helper;

use App\Affair\Category;

trait CategoryHelper
{
    /**
     * @param string $category
     * @return string
     */
    public function randomElement($category)
    {
        return Category::where('category', '=', $category)->get()->random()->getAttribute('name');
    }

    /**
     * @param string $category
     * @param string $name
     * @return int
     */
    public function specificElement($category, $name)
    {
        return Category::where('category', '=', $category)
            ->where('name', '=', $name)
            ->first()
            ->getAttribute('id');
    }
}
