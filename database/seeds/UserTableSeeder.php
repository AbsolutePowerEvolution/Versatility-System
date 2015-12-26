<?php

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
        if (app()->environment(['local', 'testing']) && ! User::where('username', '=', 'test')->exists()) {
            factory(User::class)->create([
                'username' => 'test',
                'password' => bcrypt('test'),
            ]);
        }

        factory(User::class, random_int(30, 50))->create();
    }
}
