<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StudentClassSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('student_classes')->insert(
            [
                [
                    'class_id' => 'TA-CNTT',
                    'user_id' => 7,
                    // 'score' => 9.5,
                ],
                [
                    'class_id' => 'CSDL',
                    'user_id' => 8,
                    // 'score' => 9.5,
                ],
                [
                    'class_id' => 'LSD',
                    'user_id' => 9,
                    // 'score' => 9.5,
                ],
                [
                    'class_id' => 'MMT',
                    'user_id' => 10,
                    // 'score' => 9.5,
                ],
                [
                    'class_id' => 'PHP',
                    'user_id' => 11,
                    // 'score' => 9.5,
                ],
                [
                    'class_id' => 'TA-CNTT',
                    'user_id' => 12,
                    // 'score' => 9.5,
                ],
            ]
        );
    }
}
