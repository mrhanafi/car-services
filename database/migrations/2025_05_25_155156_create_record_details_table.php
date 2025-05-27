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
        Schema::create('record_details', function (Blueprint $table) {
            $table->id();
            $table->string('item');
            $table->string('remark')->nullable();
            $table->decimal('price',10,2)->default(0);
            $table->unsignedBigInteger('service_id')->nullable();
            $table->foreign('service_id')->references('id')->on('car_maintenances')->onDelete('cascade');
            $table->unsignedBigInteger('record_id')->nullable();
            $table->foreign('record_id')->references('id')->on('my_car_records')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('record_details');
    }
};
