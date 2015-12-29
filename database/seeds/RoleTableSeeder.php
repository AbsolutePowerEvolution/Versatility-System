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
        $static = [
            'manager',
            'lab',
            'student'
        ];

        foreach ($static as $ele) {
            $role = new Role;
            $role->name = $ele;
            $role->display_name = str_random(10);
            $role->description = str_random(10);
            $role->save();
        }
    }
}
