<?php

namespace App\Http\Controllers;

use App\Models\CarMaintenance;
use App\Models\MyCar;
use App\Models\MyCarRecord;
use App\Models\RecordDetail;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MyCarRecordController extends Controller
{
    public function showItem(MyCar $mycar, $recId)
    {
        $records = MyCarRecord::where('id', $recId)->with('recordDetails')->first();
        $services = CarMaintenance::where('model_id', $mycar->models_id)
            ->where(function ($query) use ($records) {
                $query->where('mileage', $records->service_mileage)
                    ->orWhere('mileage', '0');
            })
            ->get();
        // dd($services);
        return Inertia::render('User/CarDetails/view-details', [
            'carrecords' => $records,
            'services' => $services,
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ]
        ]);
    }

    public function getServices(Request $request)
    {
        $service = CarMaintenance::where('mileage', $request->mileage)->get();
        return response()->json($service);
    }

    public function store(Mycar $mycar, $recId, Request $request)
    {
        // dd($request->all());
        $validated = $request->validate([
            'item' => 'required|string|max:60',
        ]);

        $service = CarMaintenance::findOrFail($request->item);

        RecordDetail::create([
            'item' => $service['item'],
            'price' => $service['price'],
            'remark' => $request->remark,
            'service_id' => $service->id,
            'record_id' => $recId,
        ]);

        return redirect()->route('mycar.details.records.show', [$mycar, $recId])->with('success', 'Service added successfully');
    }

    public function update(Mycar $mycar, RecordDetail $recId, Request $request)
    {
        $validated = $request->validate([
            'item' => 'required|string|max:60',
        ]);

        $recId->update([]);
    }

    public function destroy(RecordDetail $recId)
    {
        $recId->delete();

        return redirect()->back()->with('success', 'Service deleted successfully');
    }
}
