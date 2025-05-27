<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('my_car_records', function (Blueprint $table) {
            $table->id();
            $table->string('current_mileage');
            $table->string('remark')->nullable();
            $table->date('date_of_service');
            $table->string('service_mileage')->nullable();
            $table->unsignedBigInteger('mycar_id');
            $table->foreign('mycar_id')->references('id')->on('my_cars')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('my_car_records');
    }
};
