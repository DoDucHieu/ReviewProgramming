<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(
            [
                RoleSeeder::class,
                UserSeeder::class,
                StudentSeeder::class,
                SpecialtySeeder::class,
                TeacherSeeder::class,
                CreditSeeder::class,
                SubjectSeeder::class,
                TeacherSubjectSeeder::class,
                ClassSeeder::class,
                StudentClassSeeder::class,
                LessonSeeder::class,
                // ScheduleSeeder::class,
            ]
        );
    }
}
