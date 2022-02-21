<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Seeder;

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
            'fname' => 'user',
            'lname' => 'text',
            'email' => 'user@test.com',
            'password' => Hash::make('test')
        ]);

        \App\Models\User::create([
            'fname' => 'Admin',
            'lname' => 'Admin',
            'email' => 'admin@admin.com',
            'password' => Hash::make('admin'),
            'is_admin' => '1'
        ]);

        \App\Models\Category::create([
            'name' => 'Basic 50',
            'description' => 'Lorem Ipsum',
        ]);

        \App\Models\Category::create([
            'name' => 'Basic 100',
            'description' => 'Lorem Ipsum',
        ]);

        \App\Models\Category::create([
            'name' => 'Basic 150',
            'description' => 'Lorem Ipsum',
        ]);

        \App\Models\Category::create([
            'name' => 'Basic 200',
            'description' => 'Lorem Ipsum',
        ]);

        \App\Models\Category::create([
            'name' => 'Basic 250',
            'description' => 'Lorem Ipsum',
        ]);

        \App\Models\Category::create([
            'name' => 'Basic 300',
            'description' => 'Lorem Ipsum',
        ]);
        
        \App\Models\Category::create([
            'name' => 'Basic 350',
            'description' => 'Lorem Ipsum',
        ]);

        \App\Models\Category::create([
            'name' => 'Basic 400',
            'description' => 'Lorem Ipsum',
        ]);

        \App\Models\Category::create([
            'name' => 'Basic 450',
            'description' => 'Lorem Ipsum',
        ]);

        \App\Models\Category::create([
            'name' => 'Basic 500',
            'description' => 'Lorem Ipsum',
        ]);

        \App\Models\Category::create([
            'name' => 'Basic 550',
            'description' => 'Lorem Ipsum',
        ]);

        \App\Models\Category::create([
            'name' => 'Basic 600',
            'description' => 'Lorem Ipsum',
        ]);

        \App\Models\Category::create([
            'name' => 'Basic 650',
            'description' => 'Lorem Ipsum',
        ]);

        \App\Models\Category::create([
            'name' => 'Basic 700',
            'description' => 'Lorem Ipsum',
        ]);

        \App\Models\Category::create([
            'name' => 'Basic 750',
            'description' => 'Lorem Ipsum',
        ]);
    }
}
