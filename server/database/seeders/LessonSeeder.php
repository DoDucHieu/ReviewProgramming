<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LessonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('lessons')->insert(
            [
                [
                    'name' => '1',
                    'start_time' => '8:00',
                    'end_time' => '9:00'
                ],
                [
                    'name' => '2',
                    'start_time' => '8:00',
                    'end_time' => '9:00'
                ],
                [
                    'name' => '3',
                    'start_time' => '8:00',
                    'end_time' => '9:00'
                ],
                [
                    'name' => '4',
                    'start_time' => '8:00',
                    'end_time' => '9:00'
                ],
                [
                    'name' => '5',
                    'start_time' => '8:00',
                    'end_time' => '9:00'
                ],
                [
                    'name' => '6',
                    'start_time' => '8:00',
                    'end_time' => '9:00'
                ],
                [
                    'name' => '7',
                    'start_time' => '8:00',
                    'end_time' => '9:00'
                ],
                [
                    'name' => '8',
                    'start_time' => '8:00',
                    'end_time' => '9:00'
                ],
                [
                    'name' => '9',
                    'start_time' => '8:00',
                    'end_time' => '9:00'
                ],
                [
                    'name' => '10',
                    'start_time' => '8:00',
                    'end_time' => '9:00'
                ],
                [
                    'name' => '11',
                    'start_time' => '8:00',
                    'end_time' => '9:00'
                ],
                [
                    'name' => '12',
                    'start_time' => '8:00',
                    'end_time' => '9:00'
                ],
            ]
        );
    }
}
