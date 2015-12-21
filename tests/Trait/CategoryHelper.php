<?php

use App\Affair\Category;

trait CategoryHelper
{
    /**
     * @param string $category
     * @param bool $getId
     * @return \Illuminate\Database\Eloquent\Collection|static[]|int
     */
    public function randomElement($category, $getId = false)
    {
        $categories = Category::where('category', '=', $category)->get()->random();

        return $getId ? $categories->getAttribute('id') : $categories;
    }

    /**
     * @param string $category
     * @param string $name
     * @param bool $getId
     * @return \Illuminate\Database\Eloquent\Model|mixed|null|static|int
     */
    public function specificElement($category, $name, $getId = false)
    {
        $result = Category::where('category', '=', $category)
            ->where('name', '=', $name)
            ->first();

        return $getId ? $result->getAttribute('id') : $result;
    }
}
