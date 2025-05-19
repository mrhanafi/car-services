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
        Schema::create('car_maintenances', function (Blueprint $table) {
            $table->id();
            $table->string('mileage');
            $table->string('item');
            $table->string('car_type');
            $table->decimal('price',2)->nullable();
            $table->unsignedBigInteger('model_id');
            $table->foreign('model_id')->references('id')->on('car_models')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('car_maintenances');
    }
};
