<?php

use App\Affair\Role;
use App\Affair\User;
use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if (app()->environment(['local', 'testing'])) {
            foreach (['test' => 'student', 'testLab' => 'lab', 'testManager' => 'manager'] as $key => $value) {
                if (! User::where('username', $key)->exists()) {
                    factory(User::class)->create([
                        'username' => $key,
                        'password' => bcrypt('test'),
                    ])->roles()->save(Role::where('name', $value)->first());
                }
            }
        }
    }
}
