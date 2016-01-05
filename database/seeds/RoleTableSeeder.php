<?php

use App\Affair\Role;
use Illuminate\Database\Seeder;

class RoleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach (['manager', 'lab', 'student'] as $role) {
            Role::firstOrCreate(['name' => $role]);
        }
    }
}
