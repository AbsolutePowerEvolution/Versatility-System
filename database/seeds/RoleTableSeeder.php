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
            Role::create([
                'name' => $role,
                'display_name' => str_random(8),
                'description' => str_random(8),
            ]);
        }
    }
}
