<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class NewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('news')->insert(
            [
                [
                    'title' => 'title 1',
                    'desc' => 'Mo ta 1',
                    'img_url' => 'url 1',
                    'html' => '<h1>h1</h1>',
                    'content' => 'content 1',
                    'user_id' => 1,
                    'is_approve' => true,
                ],
                [
                    'title' => 'title 2',
                    'desc' => 'Mo ta 2',
                    'img_url' => 'url 2',
                    'html' => '<h1>h2</h1>',
                    'content' => 'content 2',
                    'user_id' => 1,
                    'is_approve' => false,
                ],
            ]
        );
    }
}
