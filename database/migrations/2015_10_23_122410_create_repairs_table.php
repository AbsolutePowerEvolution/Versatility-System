<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRepairsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('repairs', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned()->nullable()->comment('報修帳號id');
            $table->string('title')->nullable();
            $table->integer('type')->unsigned()->comment('報修類型');
            $table->string('remark')->nullable()->comment('附註');
            $table->integer('status')->unsigned()->comment('報修狀態');
            $table->timestamps();
            $table->softDeletes();

            $table->index('user_id');
            $table->index('type');
            $table->index('status');
            $table->index('created_at');
            $table->index('deleted_at');

            $table->foreign('user_id')->references('id')->on('users')->onUpdate('cascade')->onDelete('set null');
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
        Schema::table('repairs', function (Blueprint $table) {
            $table->dropForeign('repairs_user_id_foreign');
            $table->dropForeign('repairs_type_foreign');
            $table->dropForeign('repairs_status_foreign');
        });

        Schema::drop('repairs');
    }
}
