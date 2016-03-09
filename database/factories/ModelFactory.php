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
use App\Affair\Timezone;
use App\Affair\Category;
use App\Affair\User;
use Carbon\Carbon;

$factory->define(User::class, function () {
    $faker = Faker\Factory::create('zh_TW');
    $groups = ['manager', 'lab', '104-A', '104-B', '三年A組', '銀八老師', '105-A', '105-B'];

    return [
        'username' => $faker->userName,
        'password' => bcrypt($faker->password),
        'nickname' => $faker->name,
        'email' => $faker->email,
        'phone' => '09'.mt_rand(10000000, 99999999),
        'group' => $groups[mt_rand(0, 7)],
    ];
});

$factory->define(\App\Affair\Property::class, function () {
    $faker = Faker\Factory::create('zh_TW');

    return [
        'name' => $faker->name,
        'describe' => $faker->realText(16),
        'category' => Category::getCategories('property')->random()->getAttribute('id'),
        'status' => Category::getCategories('property.status')->random()->getAttribute('id'),
        'code' => mt_rand(10000000, 99999999),
    ];
});

$factory->define(\App\Affair\Repair::class, function () {
    $faker = Faker\Factory::create('zh_TW');

    return [
        'user_id' => User::all()->random()->getAttribute('id'),
        'title' => mt_rand(0, 1) ? $faker->realText(mt_rand(10, 15)) : '',
        'type' => Category::getCategories('repair.type')->random()->getAttribute('id'),
        'remark' => $faker->realText(32),
        'status' => Category::getCategories('repair.status')->random()->getAttribute('id'),
    ];
});

$factory->define(\App\Affair\Loan::class, function () {
    $faker = Faker\Factory::create('zh_TW');
    $time = mt_rand(0, 1);
    $began_date = Timezone::all()->random()->getAttribute('date_began_at');

    $day = (new Carbon($began_date))->addDays(rand(1, 10));
    return [
        'user_id' => User::all()->random()->getAttribute('id'),
        'type' => Category::getCategories('loan.type')->random()->getAttribute('id'),
        'date_began_at' => $day->toDateString(),
        'date_ended_at' => $day->addDays(mt_rand(0, 10))->toDateString(),
        'time_began_at' => $time ? $day->toTimeString() : null,
        'time_ended_at' => $time ? $day->addHours(mt_rand(1, 8))->toTimeString() : null,
        'remark' => $faker->realText(32),
        'status' => Category::getCategories('loan.status')->random()->getAttribute('id'),
        'long_term_token' => $time ? mt_rand(0, 127) : null,
    ];
});

$factory->define(\App\Affair\Timezone::class, function () {
    $faker = Faker\Factory::create('zh_TW');
    $day = Carbon::now()->startOfDay()->addDays(mt_rand(1, 365));
    $stu_start = clone $day;
    $lab_start = clone $day;

    if (mt_rand(0, 1) === 1) {
        $type = Category::getCategoryId('time.type', 'semester');
    } else {
        $type = Category::getCategoryId('time.type', 'vacation');
        $stu_start->subDays(7);
    }

    return [
        'zone_name' => $faker->realText(mt_rand(10, 15)),
        'type' => $type,
        'date_began_at' => $day->toDateString(),
        'date_ended_at' => $day->addDays(mt_rand(30, 150))->toDateString(),
        'stu_date_began_at' => $stu_start->toDateString(),
        'lab_date_began_at' => $lab_start->toDateString(),
    ];
});
