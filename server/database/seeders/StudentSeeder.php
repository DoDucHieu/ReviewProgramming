<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('students')->insert(
            [
                [
                    'user_id' => 7,
                    // 'GPA' => 4,
                ],
                [
                    'user_id' => 8,
                    // 'GPA' => 4,
                ],
                [
                    'user_id' => 9,
                    // 'GPA' => 4,
                ],
                [
                    'user_id' => 10,
                    // 'GPA' => 4,
                ],
                [
                    'user_id' => 11,
                    // 'GPA' => 4,
                ],
                [
                    'user_id' => 12,
                    // 'GPA' => 4,
                ],
            ]
        );
    }
}
