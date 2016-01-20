<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTimezonesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('timezones', function (Blueprint $table) {
            $table->increments('id');
            $table->string('zone_name');
            $table->integer('type')->unsigned();
            $table->date('date_began_at');
            $table->date('date_ended_at');
            $table->date('stu_date_began_at');
            $table->date('lab_date_began_at');

            $table->timestamps();

            $table->foreign('type')->references('id')->on('categories')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('timezones');
    }
}
