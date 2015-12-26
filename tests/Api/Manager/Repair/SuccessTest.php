<?php

namespace Tests\Api\Manager\Repair;

use App\Affair\Category;
use App\Affair\Property;
use App\Affair\Repair;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class SuccessTest extends RepairTest
{
    use DatabaseTransactions;

    /**
     * Setup the test environment.
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();

        $this->signInWithManager();
    }

    /** @test */
    public function update_repair()
    {
        $property = Property::find($this->getTestPropertyId(true));

        factory(Repair::class, 5)
            ->make([
                'status' => Category::getCategories('repair.status', 'processing', true),
            ])
            ->each(function (Repair $repair) use ($property) {
                $property->repairs()->save($repair);
            });

        $this->call('PUT', '/', [
            'repair_list' =>  $property->getRelation('repairs')->pluck('id'),
        ]);
        $this->assertResponseOk();
        $this->seeJson();
        $this->assertSame(
            Category::getCategories('property.status', 'normal', true),
            Property::find($this->getTestPropertyId(true))->getAttribute('status')
        );

        foreach (Property::find($this->getTestPropertyId(true))->getRelation('repairs') as $repair) {
            $this->assertSame(
                Category::getCategories('repair.status', 'finished', true),
                $repair->getAttribute('status')
            );
        }
    }
}
