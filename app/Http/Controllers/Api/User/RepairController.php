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
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $repair_list = Repair::with([
                'property',
                'type',
                'status'
            ])
            ->where('user_id', Auth::user()->id)
            ->get();

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
        $repair_property = Property::find($request->input('id'));

        if ($repair_property->getAttribute('status') != Category::getCategoryId('property.status', 'normal')) {
            return response()->json(['status' => 0]);
        } else {
            Repair::create(array_merge(array_only($request->all(), [
                    'property_id',
                    'type',
                    'remark'
                ]),[
                    'user_id' => Auth::user()->id,
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
