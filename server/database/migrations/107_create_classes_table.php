<?php

use App\Models\Subject;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('classes', function (Blueprint $table) {
            $table->string('class_id')->unique()->primary();
            // $table->date('start_date');
            $table->string('start_date');
            $table->integer('max_number_students')->default(70);
            $table->integer('current_number_students')->default(0);
            $table->text('schedules')->nullable();
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->string('bg_color')->nullable();
            $table->timestamps();

            // $table->unsignedBigInteger('teacher_subject_id');
            // $table->foreign('teacher_subject_id')->references('id')->on('teacher_subjects')->onDelete('cascade');

            $table->unsignedBigInteger('user_id')->nullable();
            $table->unsignedBigInteger('subject_id')->nullable();

            $table->foreign('user_id')->references('user_id')->on('teachers')->onDelete('set null');
            $table->foreign('subject_id')->references('id')->on('subjects')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('classes');
    }
};
