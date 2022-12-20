<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VideoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('videos')->insert(
            [
                [
                    'title' => 'title 1',
                    'desc' => 'Mo ta 1',
                    'url_video' => 'url 1',
                    'is_approve' => true,
                ],
                [
                    'title' => 'title 2',
                    'desc' => 'Mo ta 2',
                    'url_video' => 'url 2',
                    'is_approve' => false,
                ],
            ]
        );
    }
}
