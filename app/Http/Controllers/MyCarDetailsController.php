<?php

namespace App\Http\Controllers;

use App\Models\MyCar;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MyCarDetailsController extends Controller
{
    public function index(MyCar $mycar)
    {
        return Inertia::render('User/CarDetails/index');
    }
}
