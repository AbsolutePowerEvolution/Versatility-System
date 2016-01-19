<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(CategoryTableSeeder::class);

        $this->call(RoleTableSeeder::class);

        $this->call(UserTableSeeder::class);

        $this->call(PropertyTableSeeder::class);

        $this->call(RepairTableSeeder::class);
    }
}
