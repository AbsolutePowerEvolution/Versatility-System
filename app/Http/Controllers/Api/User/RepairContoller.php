<?php

namespace App\Http\Controllers\Api\User;

use App\Affair\Repair;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Auth;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class RepairController extends Controller
{
    /**
     * get property repair list
     *
     * @param
     * @return
     */
    public function getPropertyRepairList(Request $request){
        $repair_list = Repair::with([
            'property' => function($query){
                $query->get('name');
            },
            'user' => function($query){
                $query->where('id', '=', Auth::user()->id);
            }
        ])
        ->get([
            'type',
            'remark',
            'status'
        ]);

        return reponse()->json($repair_lost);
    }

    /**
     * create property repair request
     *
     * @param
     * @return
     */
    public function postPropertyRepair(Request $request){
        ;
    }
}
