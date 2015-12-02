<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLongTermLoansTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('long_term_loans', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('loan_id')->unsigned();

            $table->unique('loan_id');

            $table->foreign('loan_id')->references('id')->on('loans')->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('long_term_loans', function (Blueprint $table) {
            $table->dropForeign('long_term_loans_loan_id_foreign');
        });

        Schema::drop('long_term_loans');
    }
}
