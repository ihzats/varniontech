<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            ['id' => 1, 'name' => 'admin 1'],
            ['id' => 2, 'name' => 'admin 2'],
            // Tambahkan data pengguna lainnya sesuai kebutuhan
        ];
    
        foreach ($users as $user) {
            User::create($user);
        }
    }
}