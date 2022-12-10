<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SpecialtySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('specialties')->insert(
            [
                [
                    'specialty_name' => 'Công nghệ thông tin',
                ],
                [
                    'specialty_name' => 'Kỹ thuật phần mềm',
                ]
            ]
        );
    }
}
