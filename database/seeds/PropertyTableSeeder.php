<?php

use App\Affair\Loan;
use App\Affair\Property;
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
        factory(Property::class, mt_rand(50, 100))->create()->each(function (Property $property) {
            factory(Loan::class, mt_rand(2, 10))
                ->make()
                ->each(function (Loan $loan) use ($property) {
                    $property->loans()->save($loan);
                });
        });
    }
}
