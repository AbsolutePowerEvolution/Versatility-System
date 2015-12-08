<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePropertiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('properties', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 64)->comment('財產名稱');
            $table->string('describe', 192)->comment('財產敘述');
            $table->integer('category')->unsigned()->comment('財產類別(分類)');

            $table->index('name');
            $table->index('category');

            $table->foreign('category')->references('id')->on('categories')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('properties', function (Blueprint $table) {
            $table->dropForeign('properties_category_foreign');
        });

        Schema::drop('properties');
    }
}
