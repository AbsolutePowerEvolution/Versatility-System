<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('username', 32)->comment('帳號');
            $table->string('password', 96)->comment('密碼');
            $table->string('nickname', 32)->comment('暱稱');
            $table->string('email', 128)->nullable()->comment('信箱');
            $table->string('phone', 10)->nullable()->comment('聯絡電話');
            $table->rememberToken();
            $table->timestamps();

            $table->unique('username');

            $table->index('email');
            $table->index('remember_token');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('users');
    }
}
