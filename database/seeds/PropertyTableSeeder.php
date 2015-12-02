<?php

use App\Affair\Loan;
use App\Affair\Property;
use App\Affair\Repair;
use App\Affair\User;
use Illuminate\Database\Seeder;

class PropertyTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = User::all();

        factory(Property::class, 50)->create()->each(function (Property $property) use ($users) {
            factory(Repair::class, mt_rand(2, 5))
                ->make()
                ->each(function (Repair $repair) use ($property) {
                    $property->repairs()->save($repair);
                });

            factory(Loan::class, mt_rand(2, 5))
                ->make()
                ->each(function (Loan $loan) use ($property) {
                    $property->loans()->save($loan);
                });
        });
    }
}
