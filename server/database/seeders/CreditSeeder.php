<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CreditSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('credits')->insert(
            [
                [
                    'number_of_credits' => 2,
                    'number_of_lessons' => 20
                ],
                [
                    'number_of_credits' => 3,
                    'number_of_lessons' => 30
                ],
                [
                    'number_of_credits' => 4,
                    'number_of_lessons' => 44
                ]
            ]
        );
    }
}
