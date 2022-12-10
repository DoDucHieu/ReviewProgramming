<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert(
            [
                [
                    'full_name' => 'admin',
                    'email' => 'admin@gmail.com',
                    'date_of_birth' => '1996-01-01',
                    'gender' => 'male',
                    'address' => 'Bac Ninh',
                    'avatar' => '',
                    'username' => 'admin',
                    'password' => bcrypt('admin'),
                    'role_id' => 'r1',
                ],
                [
                    'full_name' => 'teacher',
                    'email' => 'teacher@gmail.com',
                    'date_of_birth' => '1996-01-01',
                    'gender' => 'male',
                    'address' => 'Bac Ninh',
                    'avatar' => '',
                    'username' => 'teacher',
                    'password' => bcrypt('teacher'),
                    'role_id' => 'r2',
                ],
                [
                    'full_name' => 'Hoang Tuan Hieu',
                    'email' => 'tranducha8@gmail.com',
                    'date_of_birth' => '1996-01-01',
                    'gender' => 'fe-male',
                    'address' => 'Bac Ninh',
                    'avatar' => '',
                    'username' => 'hoangtuanhieu8',
                    'password' => bcrypt('123'),
                    'role_id' => 'r2',
                ],
                [
                    'full_name' => 'Do Van Hau',
                    'email' => 'tranducha1@gmail.com',
                    'date_of_birth' => '1996-01-01',
                    'gender' => 'male',
                    'address' => 'Bac Ninh',
                    'avatar' => '',
                    'username' => 'dovanhau',
                    'password' => bcrypt('123'),
                    'role_id' => 'r2',
                ],
                [
                    'full_name' => 'Hoang Tuan Hieu',
                    'email' => 'tranducha2@gmail.com',
                    'date_of_birth' => '1996-01-01',
                    'gender' => 'fe-male',
                    'address' => 'Bac Ninh',
                    'avatar' => '',
                    'username' => 'hoangtuanhieu',
                    'password' => bcrypt('123'),
                    'role_id' => 'r2',
                ],
                [
                    'full_name' => 'Hoang Tuan Hieu',
                    'email' => 'tranducha3@gmail.com',
                    'date_of_birth' => '1996-01-01',
                    'gender' => 'fe-male',
                    'address' => 'Bac Ninh',
                    'avatar' => '',
                    'username' => 'hoangtuanhieu3',
                    'password' => bcrypt('123'),
                    'role_id' => 'r2',
                ],
                [
                    'full_name' => 'student',
                    'email' => 'student@gmail.com',
                    'date_of_birth' => '1996-01-01',
                    'gender' => 'male',
                    'address' => 'Bac Ninh',
                    'avatar' => '',
                    'username' => 'student',
                    'password' => bcrypt('student'),
                    'role_id' => 'r3',
                ],
                [
                    'full_name' => 'Hoang Tuan Hieu',
                    'email' => 'tranducha4@gmail.com',
                    'date_of_birth' => '1996-01-01',
                    'gender' => 'fe-male',
                    'address' => 'Bac Ninh',
                    'avatar' => '',
                    'username' => 'hoangtuanhieu4',
                    'password' => bcrypt('123'),
                    'role_id' => 'r3',
                ],
                [
                    'full_name' => 'Tran Duc Ha',
                    'email' => 'tranducha5@gmail.com',
                    'date_of_birth' => '1996-01-01',
                    'gender' => 'male',
                    'address' => 'Bac Ninh',
                    'avatar' => '',
                    'username' => 'tranducha5',
                    'password' => bcrypt('123'),
                    'role_id' => 'r3',
                ],
                [
                    'full_name' => 'Do Van Hau',
                    'email' => 'tranducha51@gmail.com',
                    'date_of_birth' => '1996-01-01',
                    'gender' => 'male',
                    'address' => 'Bac Ninh',
                    'avatar' => '',
                    'username' => 'dovanhau51',
                    'password' => bcrypt('123'),
                    'role_id' => 'r3',
                ],
                [
                    'full_name' => 'Hoang Tuan Hieu',
                    'email' => 'tranducha6@gmail.com',
                    'date_of_birth' => '1996-01-01',
                    'gender' => 'fe-male',
                    'address' => 'Bac Ninh',
                    'avatar' => '',
                    'username' => 'hoangtuanhieu6',
                    'password' => bcrypt('123'),
                    'role_id' => 'r3',
                ],
                [
                    'full_name' => 'Hoang Tuan Hieu',
                    'email' => 'tranducha7@gmail.com',
                    'date_of_birth' => '1996-01-01',
                    'gender' => 'fe-male',
                    'address' => 'Bac Ninh',
                    'avatar' => '',
                    'username' => 'hoangtuanhieu7',
                    'password' => bcrypt('123'),
                    'role_id' => 'r3',
                ],
            ]
        );
    }
}
