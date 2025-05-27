<?php

namespace App\Http\Controllers;

use App\Models\CarMaintenance;
use App\Models\MyCar;
use App\Models\MyCarRecord;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MyCarDetailsController extends Controller
{
    public function index(MyCar $mycar)
    {
        // dd($mycar);
        $records = MyCarRecord::where('mycar_id',$mycar->id)->with('recordDetails')->get();
        $services = CarMaintenance::where('model_id',$mycar->id)->get();
        // $maintenanceList = CarMaintenance::where('')
        return Inertia::render('User/CarDetails/index',[
            'mycar' => $mycar,
            'carrecords' => $records,
            // 'services' => $services,
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ]
        ]);
    }

    public function getItem(Request $request,MyCar $mycar)
    {
        // dd($request->all());
        $service = CarMaintenance::where('mileage',$request->mileage)->get();
        return response()->json($service);
    }

    public function store(Request $request,MyCar $mycar)
    {
        // dd($request->all());
        $validated = $request->validate([
            'current_mileage' => 'required',
            'date_of_service' => 'required',
        ]);

        MyCarRecord::create([
            'current_mileage' => $validated['current_mileage'],
            'date_of_service' => $validated['date_of_service'],
            'service_mileage' => $request->mileage,
            'remark' => $request->remark,
            'mycar_id' => $mycar->id,
        ]);

        return redirect()->back()->with('success','Your car added successfully');
    }

    public function update(Request $request, MyCarRecord $mycar)
    {
        // dd($mycar);
        $validated = $request->validate([
            'current_mileage' => 'required',
            'date_of_service' => 'required',
        ]);

        $mycar->update([
            'current_mileage' => $validated['current_mileage'],
            'date_of_service' => $validated['date_of_service'],
            'service_mileage' => $request->mileage,
            'remark' => $request->remark,
        ]);

        return redirect()->back()->with('success','Your car record updated successfully');
    }

    public function destroy(MyCarRecord $mycar)
    {
        $mycar->delete();
        return redirect()->back()->with('success','Your car record deleted successfully');
    }

    public function addDetails(MyCar $mycar)
    {
        $services = CarMaintenance::where('model_id',$mycar->id)->get();
        return Inertia::render('User/CarDetails/add-details',[
            'services' => $services,
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ]
        ]);
    }

    
}
