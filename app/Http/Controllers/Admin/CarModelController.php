<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\CarMaintenance;
use App\Models\CarModel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CarModelController extends Controller
{
    public function index()
    {
        $models = CarModel::with('carBrand')->paginate(10);
        $brands = Brand::all();
        // dd($brands);
        return Inertia::render('Admin/Model/index',[
            'models' => $models,
            'brands' => $brands,
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ]
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'model' => 'required|string|max:60',
        ]);

        CarModel::create([
            'model' => $validated['model'],
            'brand_id' => $request->brand_id,
        ]);

        return redirect()->route('cars.index')->with('success','Car Model Created Successfully');
    }

    // public function show(CarModel $model)
    // {
    //     $carmaintenance = CarMaintenance::where('model_id',$model->id)->paginate(10);
        
    //     return Inertia::render('Admin/Maintenance/index',[
    //         'model' => $model,
    //         'carmaintenance' => $carmaintenance,
    //         'flash' => [
    //             'success' => session('success'),
    //             'error' => session('error'),
    //         ]
    //     ]);
    // }

    public function update(Request $request,CarModel $model)
    {
        // dd($model);
        $validated = $request->validate([
            'model' => 'required|string|max:60',
        ]);

        $model->update([
            'model' => $validated['model'],
            'brand_id' => $request->brand_id
        ]);

        return redirect()->route('cars.index')->with('success','Car model updated Successfully');
    }

    public function destroy(CarModel $model)
    {
        $model->delete();
        return redirect()->route('cars.index')->with('success','Car model Deleted');
    }
}
