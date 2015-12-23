<?php

namespace Tests\Helper;

use App\Affair\Category;

trait CategoryHelper
{
    /**
     * @param string $category
     * @param bool $getName
     * @return \Illuminate\Database\Eloquent\Collection|static[]|int
     */
    public function randomElement($category, $getName = false)
    {
        $categories = Category::where('category', '=', $category)->get()->random();

        return $getName ? $categories->getAttribute('name') : $categories;
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
