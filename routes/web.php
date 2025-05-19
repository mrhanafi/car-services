<?php

use App\Http\Controllers\Admin\BrandController;
use App\Http\Controllers\Admin\CarModelController;
use App\Http\Controllers\Admin\MaintenanceLibController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('/admin/brands',[BrandController::class,'index'])->name('brands.index');
    Route::post('/admin/brands/store',[BrandController::class,'store'])->name('brands.store');
    Route::put('/admin/brands/update/{brand}',[BrandController::class,'update'])->name('brands.update');
    Route::delete('/admin/brands/delete/{brand}',[BrandController::class,'destroy'])->name('brands.destroy');

    Route::get('/admin/car-models',[CarModelController::class,'index'])->name('cars.index');
    Route::post('/admin/car-models/store',[CarModelController::class,'store'])->name('cars.store');
    Route::put('/admin/car-models/update/{model}',[CarModelController::class,'update'])->name('cars.update');
    Route::delete('/admin/car-models/delete/{model}',[CarModelController::class,'destroy'])->name('cars.destroy');
    
    Route::get('/admin/car-models/{model}',[MaintenanceLibController::class,'show'])->name('cars.show');
    Route::post('/admin/car-models/{model}/store',[MaintenanceLibController::class,'store'])->name('maintenance.store');
    Route::put('/admin/car-models/{model}/update/{cm}',[MaintenanceLibController::class,'update'])->name('maintenance.update');
    Route::delete('/admin/car-models/{model}/delete/{cm}',[MaintenanceLibController::class,'destroy'])->name('maintenance.destroy');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
