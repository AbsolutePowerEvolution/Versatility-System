<?php

use App\Affair\Category;
use Illuminate\Database\Seeder;

class CategoryTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $static = [
            'property' => ['classroom', 'others'],
            'property.status' => ['normal', 'deleted'],
            'repair.type' => ['cleanup', 'maintain'],
            'repair.status' => ['submitted', 'canceled', 'processing', 'finished'],
            'loan.type' => ['meeting', 'course', 'speech', 'interview', 'others'],
            'loan.status' => ['submitted', 'canceled', 'accepted', 'refused', 'deleted'],
            'time.type' => ['semester', 'vacation'],
        ];

        foreach ($static as $category => $collections) {
            foreach ($collections as $value) {
                Category::firstOrCreate(['category' => $category, 'name' => $value]);
            }
        }
    }
}
