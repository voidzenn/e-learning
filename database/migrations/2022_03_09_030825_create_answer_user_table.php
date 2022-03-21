<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAnswerUserTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create("answer_user", function (Blueprint $table) {
            $table->id();
            $table
                ->foreignId("category_user_id")
                ->nullable()
                ->unsigned();
            $table
                ->foreign("category_user_id")
                ->references("id")
                ->on("category_user")
                ->onDelete("cascade");
            $table
                ->foreignId("word_id")
                ->nullable()
                ->unsigned();
            $table
                ->foreign("word_id")
                ->references("id")
                ->on("words")
                ->onDelete("cascade");
            $table
                ->foreignId("choice_id")
                ->nullable()
                ->unsigned();
            $table
                ->foreign("choice_id")
                ->references("id")
                ->on("choices")
                ->onDelete("cascade");
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
        Schema::dropIfExists("answer_user");
    }
}
