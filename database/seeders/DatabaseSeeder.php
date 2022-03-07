<?php

namespace Database\Seeders;

use Database\Factories\CategoryFactory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Factories\Sequence;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\User::create([
            "fname" => "New",
            "lname" => "User",
            "email" => "user@user.com",
            "password" => Hash::make("user"),
        ]);

        \App\Models\User::create([
            "fname" => "Admin",
            "lname" => "Admin",
            "email" => "admin@admin.com",
            "password" => Hash::make("admin"),
            "is_admin" => "1",
        ]);

        \App\Models\User::factory()
            ->count(15)
            ->create();

        $categories = \App\Models\Category::factory()
            ->count(15)
            ->create();

        foreach ($categories as $category) {
            $words = \App\Models\Word::factory()
                ->count(5)
                ->create([
                    "category_id" => $category->id,
                ]);
            foreach ($words as $word) {
                \App\Models\Choice::factory()
                    ->count(4)
                    /*
                        This function will make an alternation where one
                        choice will have a is_correct_answer with value
                        of 1 and others will have a value of 0
                    */
                    ->state(
                        new Sequence(
                            ["is_correct_answer" => "0"],
                            ["is_correct_answer" => "0"],
                            ["is_correct_answer" => "1"],
                            ["is_correct_answer" => "0"]
                        )
                    )
                    ->create([
                        "word_id" => $word->id,
                    ]);
            }
        }
    }
}
