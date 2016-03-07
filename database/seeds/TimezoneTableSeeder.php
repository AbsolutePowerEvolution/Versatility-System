<?php

use App\Affair\Timezone;
use Illuminate\Database\Seeder;

class TimezoneTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Timezone::class, mt_rand(10, 20))->create();
    }
}
