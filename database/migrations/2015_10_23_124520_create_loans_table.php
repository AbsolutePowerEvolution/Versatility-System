<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLoansTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('loans', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned()->nullable()->comment('借用帳號id');
            $table->integer('property_id')->unsigned()->comment('財產id');
            $table->integer('type')->unsigned()->comment('借用類型');
            $table->date('date_began_at')->comment('開始日期');
            $table->date('date_ended_at')->comment('結束日期');
            $table->time('time_began_at')->nullable()->comment('開始時間');
            $table->time('time_ended_at')->nullable()->comment('結束時間');
            $table->string('remark')->nullable()->comment('附註');
            $table->integer('status')->unsigned()->comment('借用狀態');
            $table->timestamps();
            $table->softDeletes();

            $table->index('user_id');
            $table->index('property_id');
            $table->index('type');
            $table->index('date_began_at');
            $table->index('date_ended_at');
            $table->index('time_began_at');
            $table->index('time_ended_at');
            $table->index('status');
            $table->index('created_at');
            $table->index('deleted_at');

            $table->foreign('user_id')->references('id')->on('users')->onUpdate('cascade')->onDelete('set null');
            $table->foreign('property_id')->references('id')->on('properties')->onUpdate('cascade');
            $table->foreign('type')->references('id')->on('categories')->onUpdate('cascade');
            $table->foreign('status')->references('id')->on('categories')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('loans', function (Blueprint $table) {
            $table->dropForeign('loans_user_id_foreign');
            $table->dropForeign('loans_property_id_foreign');
            $table->dropForeign('loans_type_foreign');
            $table->dropForeign('loans_status_foreign');
        });

        Schema::drop('loans');
    }
}
