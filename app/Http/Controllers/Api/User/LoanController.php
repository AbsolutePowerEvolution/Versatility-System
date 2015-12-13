<?php

namespace App\Http\Controllers\Api\User;

use Illuminate\Http\Request;

use DB;
use Auth;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class LoanController extends Controller
{
    /**
     * Display a listing of the others borrow.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $borrow_list = Loans::with([
                'type',
                'status'
            ])
            ->join('properties as pro_t', function ($query) {
                $query->on('prot.id', '=', 'property_id')
                    ->where('pro_t.category', '=', Category::getCategoryId(['property' => 'others']));
            })
            ->where('user_id', '=', Auth::user()->id)
            ->get([
                'loans.*',
                'pro_t.id as p_id',
                'pro_t.name as p_name',
            ]);

        return response()->json($borrow_list);
    }

    /**
     * Display a listing of the classroom borrow.
     *
     * @return \Illuminate\Http\Response
     */
    public function indexClassroomBorrow()
    {
        $borrow_list = Loans::with([
                'type',
                'status'
            ])
            ->join('properties as pro_t', function ($query) {
                $query->on('prot.id', '=', 'property_id')
                    ->where('pro_t.category', '=', Category::getCategoryId(['property' => 'classroom']));
            })
            ->where('user_id', '=', Auth::user()->id)
            ->get([
                'loans.*',
                'pro_t.id as p_id',
                'pro_t.name as p_name',
            ]);

        return response()->json($borrow_list);
    }

    /**
     * Store a newly created resource in borrow classroom.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function storeClassroomBorrow(Request $request)
    {
        $date_info = [$request->input('date_began_at'), $request->input('date_ended_at')];
        $time_info = [$request->input('time_began_at'), $request->input('time_ended_at')];
        $LTK = $request->input('long_term_token');

        // return if time provided conflict
        if (checkConflict($date_info, $time_info, $LTK)) {
            return response()->json(['status' => 3]);
        }

        // create loan request
        Loan::create(array_merge(array_only($request->all(), [
                'property_id',
                'date_began_at',
                'date_ended_at',
                'time_began_at',
                'time_ended_at',
                'remark',
                'long_term_token',
            ]), [
                'user_id' => Auth::user()->id,
                'type' => Category::getCategoryId('loan.type', $request->input('type')),
                'status' => Category::getCategoryId('loan.status', $request->input('processing'))
            ]));

        return response()->json(['status' => 0]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroyClassroomBorrow($id)
    {
        $affect_rows = Loan::where('id', '=', $id)
            ->where('user_id', '=', Auth::user()->id)
            ->update([
                'status' => Category::getCategoryId('loan.status', 'canceled')
            ]);

        return response()->json(['status' => ($affect==1)? 0:2]);
    }

    /**
     * check loan data conflict or not
     *
     * @param
     * @return bool
     */
    private static function checkConflict($date_info, $time_info, $LTK)
    {
        $LTK = ($LTK === 0)? 1<<date('w'):$LTK;

        $conflict_num = DB::table('Loans')
            ->whereBetween('date_ended_at', $date_info)
            ->whereBetween('time_info', $time_info)
            ->where(function ($query) use ($LTK) {
                $query
                    ->where(DB::raw("long_term_token & {$LTK}"), '>', 0)
                    ->orWhere('long_term_token', '=', NULL);
            })
            ->count();

        return ($conflict_num > 0);
    }
}
