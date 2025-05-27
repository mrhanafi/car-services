<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\CarModel;
use App\Models\MyCar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MyCarController extends Controller
{
    public function index()
    {
        $cars = MyCar::where('user_id',Auth::user()->id)->get();
        // $cars = MyCar::all();
        $brands = Brand::all();
        // dd($brands);
        // $models = CarModel::all();
        return Inertia::render('User/Car/index',[
            'mycars' => $cars,
            'brands' => $brands,
            // 'models' => $models,
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ]
        ]);
    }

    public function getModel(Request $request)
    {
        // dd($request->all());
        $carmodels = CarModel::where('brand_id',$request->brand_id)->get();
        return response()->json($carmodels);
    }

    public function store(Request $request)
    {
        // dd($request->all());
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'brand' => 'required',
            'model' => 'required',
        ]);

        $model = CarModel::findOrFail($validated['model']);

        MyCar::create([
            'title' => $validated['title'],
            'brand' => $model->carBrand->name,
            'brand_id' => $validated['brand'],
            'model' => $model->model,
            'model_id' => $validated['model'],
            'user_id' => Auth::user()->id,
        ]);

        return redirect()->route('mycar.index')->with('success','Your car added successfully');
    }

    public function update(Request $request,Mycar $mycar)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'brand' => 'required',
            'model' => 'required',
        ]);

        $mycar->update([
            'title' => $validated['title'],
            'brands_id' => $validated['brand'],
            'models_id' => $validated['model'],
        ]);

        return redirect()->route('mycar.index')->with('success','Your car updated successfully');
    }

    public function destroy(MyCar $mycar)
    {
        $mycar->delete();
        return redirect()->route('mycar.index')->with('success','Your car deleted successfully');
    }
}
