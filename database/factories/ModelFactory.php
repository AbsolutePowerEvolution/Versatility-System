<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

/** @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Affair\Category;
use App\Affair\User;
use Carbon\Carbon;

$factory->define(User::class, function (Faker\Generator $faker) {
    return [
        'username' => $faker->userName,
        'password' => bcrypt($faker->password),
        'nickname' => $faker->name,
        'email' => $faker->email,
        'phone' => str_random(10),
    ];
});

$factory->define(\App\Affair\Property::class, function (Faker\Generator $faker) {
    return [
        'name' => $faker->name,
        'describe' => $faker->sentence,
        'category' => Category::where('category', '=', 'property')->get()->random()->getAttribute('id'),
        'code' => str_random(8)
    ];
});

$factory->define(\App\Affair\Repair::class, function (Faker\Generator $faker) {
    return [
        'user_id' => User::all()->random()->getAttribute('id'),
        'type' => Category::where('category', '=', 'repair.type')->get()->random()->getAttribute('id'),
        'remark' => $faker->sentence,
        'status' => Category::where('category', '=', 'repair.status')->get()->random()->getAttribute('id'),
    ];
});

$factory->define(\App\Affair\Loan::class, function (Faker\Generator $faker) {
    $day = Carbon::now()->startOfDay()->addHours(8)->addDays(mt_rand(1, 30));
    $time = mt_rand(0, 1);

    return [
        'user_id' => User::all()->random()->getAttribute('id'),
        'type' => Category::where('category', '=', 'loan.type')->get()->random()->getAttribute('id'),
        'date_began_at' => $day->toDateString(),
        'date_ended_at' => $day->addDays(mt_rand(0, 3))->toDateString(),
        'time_began_at' => $time ? $day->toTimeString() : null,
        'time_ended_at' => $time ? $day->addHours(mt_rand(1, 8))->toTimeString() : null,
        'remark' => $faker->sentence,
        'status' => Category::where('category', '=', 'loan.status')->get()->random()->getAttribute('id'),
        'long_term_token' => $time ? str_random(16) : null,
    ];
});
