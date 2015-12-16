<?php

namespace App\Http\Controllers\Api\User;

use Illuminate\Http\Request;

use Auth;
use App\Affair\Property;
use App\Affair\Repair;
use App\Affair\Category;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class RepairController extends Controller
{
    /**
     * Display a listing of the repair request.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // get length
        $length = $request->input('length', 10);

        $repair_list = Repair::with([
                'property',
                'type',
                'status'
            ])
            ->where('user_id', Auth::user()->id)
            ->paginate($length);

        return response()->json($repair_list);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $repair_property = Property::find($request->input('property_id'));

        // To avoid user to request for repair two or more times.
        if ($repair_property === null || $repair_property->status != Category::getCategoryId('property.status', 'normal')) {
            return response()->json(['status' => 2]);
        } else {
            Repair::create(array_merge(array_only($request->all(), [
                    'property_id',
                    'remark'
                ]),[
                    'user_id' => Auth::user()->id,
                    'type' => Category::getCategoryId('repair.type', $request->input('type')),
                    'status' => Category::getCategoryId('repair.status', 'submitted')
                ]));

            $repair_property->status = Category::getCategoryId('property.status', 'maintenance');
            $repair_property->save();
        }

        return response()->json(['status' => 0]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $repair = Repair::where('user_id', Auth::user()->id)->find($id);

        if ($repair === null) {
            return response()->json(['status' => 2]);
        }

        $repair->status = Category::getCategoryId('repair.status', 'canceled');
        $repair->save();

        $affect_rows = Property::where('id', $repair->property_id)
            ->update(['status' => Category::getCategoryId('property.status', 'normal')]);

        return response()->json(['status' => ($affect_rows==1)? 0:2]);
    }
}
