<?php

namespace App\Http\Controllers;

use App\Models\MyCar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $myCars = MyCar::where('user_id',Auth::user()->id)->get();
        // dd($totalCars);
        return Inertia::render('dashboard',[
            'myCars' => $myCars
        ]);
    }
}
