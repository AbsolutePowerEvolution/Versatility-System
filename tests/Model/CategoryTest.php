<?php

namespace Tests\Model;

use App\Affair\Category;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class CategoryTest extends TestCase
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

        $this->seed('CategoryTableSeeder');
    }

    /** @test */
    public function it_should_get_all_categories_if_no_parameter()
    {
        $this->assertEquals(Category::all(), Category::getCategories());
    }

    /** @test */
    public function it_should_get_specific_category_categories_if_category_parameter_is_present()
    {
        $this->assertEquals(
            Category::where('category', 'loan.status')->get(),
            Category::getCategories('loan.status')
        );

        $this->assertEquals(
            Category::where('category', 'loan.type')->get(),
            Category::getCategories('loan.type')
        );

        $this->assertEquals(
            Category::where('category', 'property')->get(),
            Category::getCategories('property')
        );
    }

    /** @test */
    public function it_should_get_specific_category_if_category_and_name_parameters_are_present()
    {
        $this->assertEquals(
            Category::where('category', 'loan.status')->where('name', 'canceled')->first(),
            Category::getCategories('loan.status', 'canceled')
        );

        $this->assertEquals(
            Category::where('category', 'loan.type')->where('name', 'interview')->first(),
            Category::getCategories('loan.type', 'interview')
        );

        $this->assertEquals(
            Category::where('category', 'property')->where('name', 'classroom')->first(),
            Category::getCategories('property', 'classroom')
        );
    }

    /** @test */
    public function it_should_get_specific_category_id_if_all_parameters_are_present()
    {
        $this->assertSame(
            Category::where('category', 'loan.status')->where('name', 'canceled')->first()->getAttribute('id'),
            Category::getCategories('loan.status', 'canceled', true)
        );

        $this->assertSame(
            Category::where('category', 'loan.type')->where('name', 'interview')->first()->getAttribute('id'),
            Category::getCategories('loan.type', 'interview', true)
        );

        $this->assertSame(
            Category::where('category', 'property')->where('name', 'classroom')->first()->getAttribute('id'),
            Category::getCategories('property', 'classroom', true)
        );
    }
}
