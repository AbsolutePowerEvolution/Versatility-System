<?php

namespace App\Http\Controllers\Api\User;

use Illuminate\Http\Request;

use Auth;
use App\Affair\Property;
use App\Affair\Category;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class PropertyController extends Controller
{
    /**
     * Display a listing of the normal property.
     *
     * @param Request $request
     * @return Json
     */
    public function index(Request $request)
    {
        // get length
        $length = ($request->input('length') > 0)? ($request->input('length')):10;

        // get property list
        $property_list = Property::with(['category', 'status'])
            ->where('category', Category::getCategoryId('property', 'others'))
            ->paginate($length);

        return response()->json($property_list);
    }

    /**
     * Display the specified property.
     *
     * @param  int $id
     * @return Json
     */
    public function show($id)
    {
        // get property detail
        $property_detail = Property::with(['category', 'status'])
            ->where('category', Category::getCategoryId('property', 'others'))
            ->find($id);

        return response()->json($property_detail);
    }

    /**
     * Display a listing of the normal classroom.
     *
     * @param Request $request
     * @return
     */
    public function indexClassroom(Request $request)
    {
        // get length
        $length = ($request->input('length') > 0)? ($request->input('length')):10;

        $classroom_list = Property::with([
                'category',
                'status',
                'loanClassroom'
            ])
            ->where('category', Category::getCategoryId('property', 'classroom'))
            ->paginate($length);

        return response()->json($classroom_list);
    }
}
