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
        Schema::create('my_cars', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('brand');
            $table->unsignedBigInteger('brands_id')->nullable();
            $table->foreign('brands_id')->references('id')->on('brands')->onDelete('cascade');
            $table->unsignedBigInteger('models_id')->nullable();
            $table->string('model');
            $table->foreign('models_id')->references('id')->on('car_models')->onDelete('cascade');
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('my_cars');
    }
};
