<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CarMaintenance;
use App\Models\CarModel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MaintenanceLibController extends Controller
{
    public function show(CarModel $model)
    {
        $carmaintenance = CarMaintenance::where('model_id',$model->id)->orWhere('model_id',null)->orderBy('id','DESC')->paginate(100);
        // dd($carmaintenance);
        return Inertia::render('Admin/Maintenance/page',[
                'model' => $model,
            'carmaintenance' => $carmaintenance,
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ]
        ]);
        // return Inertia::render('Admin/Maintenance/index',[
        //     'model' => $model,
        //     'carmaintenance' => $carmaintenance,
        //     'flash' => [
        //         'success' => session('success'),
        //         'error' => session('error'),
        //     ]
        // ]);
    }

    public function store(Request $request, CarModel $model)
    {
        // dd($request->all());
        $validated = $request->validate([
            'mileage' => 'required',
            'item' => 'required|string|max:60',
            // 'price' => 'nullable',
        ]);

        CarMaintenance::create([
            'mileage' => $validated['mileage'],
            'item' => $validated['item'],
            'price' => $request->price,
            'quantity' => $request->quantity,
            'model_id' => $request->model_id,
        ]);

        return redirect()->route('cars.show',$model->id)->with('success','Details created Successfully');
    }

    public function update(Request $request, CarModel $model,CarMaintenance $cm)
    {
        // dd($request->all());
        $validated = $request->validate([
            'mileage' => 'required',
            'item' => 'required|string|max:60',
            // 'price' => 'nullable',
        ]);

        $cm->update([
            'mileage' => $validated['mileage'],
            'item' => $validated['item'],
            'price' => $request->price,
            'quantity' => $request->quantity,
            'model_id' => $request->model_id,
        ]);

        return redirect()->route('cars.show',$model->id)->with('success','Details updated Successfully');
    }

    public function destroy( CarModel $model,CarMaintenance $cm)
    {
        $cm->delete();
        return redirect()->route('cars.show',$model->id)->with('success','Details Deleted');
    }
}
