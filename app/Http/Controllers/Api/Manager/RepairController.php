<?php

namespace App\Http\Controllers\Api\Manager;

use App\Affair\Property;
use App\Affair\Repair;
use App\Affair\Category;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class RepairController extends Controller
{
    /**
     * Get repair list that has status -'submitted'.
     *
     * @param Request $request
     * @return Json
     */
    public function index(Request $request)
    {
        // get length
        $length = ($request->input('length') > 0) ? $request->input('length') : 10;
        $status = $request->input('status', 'submitted');

        $repair_list = Repair::with([
                'status',
                'type',
                'user',
            ])
            ->where('status', '=', Category::getCategoryId('repair.status', $status))
            ->paginate($length);

        // return
        return response()->json($repair_list);
    }

    /**
     * Update the repair list's status to finished
     * and also update the aim property to status -normal.
     *
     * @param  Request  $request
     * @return Json
     */
    public function update(Request $request)
    {
        // get repair list
        $repair_list = $request->input('repair_list');

        if (! is_array($repair_list)) {
            return response()->json(['status' => 2]); // paramater error.
        }

        $property_list = Repair::whereIn('id', $repair_list)
            ->get()
            ->pluck('property_id');

        // update repair status
        $affect_repairs = Repair::whereIn('id', $repair_list)
            ->update(['status' => Category::getCategoryId('repair.status', 'finished')]);

        return response()->json(['status' => 0]);
    }
}
