<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SubjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('subjects')->insert(
            [
                [
                    'subject_name' => 'Tiếng anh công nghệ thông tin',
                    'specialty_id' => 1,
                    'credit_id' => 1,
                ],
                [
                    'subject_name' => 'Lập trình web bằng PHP',
                    'specialty_id' => 2,
                    'credit_id' => 1,
                ],
                [
                    'subject_name' => 'Lập trình cơ sở dữ liệu',
                    'specialty_id' => 1,
                    'credit_id' => 2,
                ],
                [
                    'subject_name' => 'Lịch sử đảng',
                    'specialty_id' => 2,
                    'credit_id' => 2,
                ],
                [
                    'subject_name' => 'Mạng máy tính',
                    'specialty_id' => 1,
                    'credit_id' => 2,
                ],
                [
                    'subject_name' => 'Truyền thông đa phương tiện',
                    'specialty_id' => 1,
                    'credit_id' => 2,
                ],
                [
                    'subject_name' => 'Thiết kế web',
                    'specialty_id' => 2,
                    'credit_id' => 2,
                ],
                [
                    'subject_name' => 'Nhập môn lập trình',
                    'specialty_id' => 1,
                    'credit_id' => 2,
                ],
                [
                    'subject_name' => '.net',
                    'specialty_id' => 2,
                    'credit_id' => 2,
                ],
            ]
        );
    }
}
