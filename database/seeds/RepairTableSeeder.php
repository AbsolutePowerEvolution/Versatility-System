<?php

use App\Affair\Repair;
use Illuminate\Database\Seeder;

class RepairTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Repair::class, mt_rand(50, 100))->create();
    }
}
