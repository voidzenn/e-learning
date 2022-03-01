<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateChoicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create("choices", function (Blueprint $table) {
            $table->id();
            $table->foreignId("word_id");
            $table->foreign("word_id")->references("word")->on("id")->onDelete("cascade");
            $table->string("name");
            $table->boolean("is_correct_answer")->default("0");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists("choices");
    }
}
