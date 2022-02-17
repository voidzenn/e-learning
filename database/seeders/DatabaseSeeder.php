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
    }
}
