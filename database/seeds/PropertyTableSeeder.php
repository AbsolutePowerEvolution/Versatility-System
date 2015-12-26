<?php

use App\Affair\Loan;
use App\Affair\Property;
use App\Affair\Repair;
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
        factory(Property::class, random_int(50, 100))->create()->each(function (Property $property) {
            factory(Repair::class, random_int(2, 10))
                ->make()
                ->each(function (Repair $repair) use ($property) {
                    $property->repairs()->save($repair);
                });

            factory(Loan::class, random_int(2, 10))
                ->make()
                ->each(function (Loan $loan) use ($property) {
                    $property->loans()->save($loan);
                });
        });
    }
}
