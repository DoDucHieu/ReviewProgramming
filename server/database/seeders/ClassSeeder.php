<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ClassSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('classes')->insert(
            [
                [
                    'class_id' => 'TA-CNTT',
                    'start_date' => '2020-01-01',
                    'max_number_students' => 70,
                    'current_number_students' => 20,
                    'user_id' => 2,
                    'subject_id' => 1,
                    // 'teacher_subject_id' => 1,
                    'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ",
                    'image' => 'https://files.fullstack.edu.vn/f8-prod/banners/Banner_03_youtube.png',
                    'schedules' => '[{"day":0,"lessons":[0,1,2,3]},{"day":1,"lessons":[0,1,2,3]}]',
                    'bg_color' => 'linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6)'
                ],
                [
                    'class_id' => 'PHP',
                    'start_date' => '2020-01-01',
                    'max_number_students' => 70,
                    'current_number_students' => 20,
                    'user_id' => 3,
                    'subject_id' => 2,
                    // 'teacher_subject_id' => 2,
                    'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ",
                    'image' => 'https://files.fullstack.edu.vn/f8-prod/banners/Banner_03_youtube.png',
                    'schedules' => '[{"day":0,"lessons":[11, 12, 13]},{"day":3,"lessons":[11, 12, 13]}]',
                    'bg_color' => 'linear-gradient(to right, #fc4a1a, #f7b733)'
                ],
                [
                    'class_id' => 'CSDL',
                    'start_date' => '2020-01-01',
                    'max_number_students' => 70,
                    'current_number_students' => 20,
                    'user_id' => 4,
                    'subject_id' => 3,
                    // 'teacher_subject_id' => 3,
                    'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ",
                    'image' => 'https://files.fullstack.edu.vn/f8-prod/banners/Banner_03_youtube.png',
                    'schedules' => '[{"day":2,"lessons":[0,1,2,3]},{"day":3,"lessons":[0,1,2,3]}]',
                    'bg_color' => 'linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6)'
                ],
                [
                    'class_id' => 'LSD',
                    'start_date' => '2020-01-01',
                    'max_number_students' => 70,
                    'current_number_students' => 20,
                    'user_id' => 5,
                    'subject_id' => 4,
                    // 'teacher_subject_id' => 4,
                    'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ",
                    'image' => 'https://files.fullstack.edu.vn/f8-prod/banners/Banner_03_youtube.png',
                    'schedules' => '[{"day":4,"lessons":[11, 12, 13]},{"day":5,"lessons":[11, 12, 13]}]',
                    'bg_color' => 'linear-gradient(to right, #fc4a1a, #f7b733)'
                ],
                [
                    'class_id' => 'MMT',
                    'start_date' => '2020-01-01',
                    'max_number_students' => 70,
                    'current_number_students' => 20,
                    'user_id' => 6,
                    'subject_id' => 5,
                    // 'teacher_subject_id' => 5,
                    'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ",
                    'image' => 'https://files.fullstack.edu.vn/f8-prod/banners/Banner_03_youtube.png',
                    'schedules' => '[{"day":4,"lessons":[1, 2, 3]},{"day":5,"lessons":[1, 2, 3]}]',
                    'bg_color' => 'linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6)'
                ],
            ]
        );
    }
}
