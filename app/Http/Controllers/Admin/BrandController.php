<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BrandController extends Controller
{
    public function index()
    {
        $brands = Brand::paginate(10);
        return Inertia::render('Admin/Brand/index',[
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
            'name' => 'required|exists:brands,name|string|max:60',
        ]);

        Brand::create($validated);

        return redirect()->route('brands.index')->with('success','Task Created Successfully');
    }

    public function update(Request $request,Brand $brand)
    {
        // dd($brand);
        $validated = $request->validate([
            'name' => 'required|string|max:60',
        ]);

        $brand->update($validated);

        return redirect()->route('brands.index')->with('success','Brand Updated Successfully');
    }

    public function destroy(Brand $brand)
    {
        $brand->delete();
        return redirect()->route('brands.index')->with('success','Brand Deleted');
    }
}
