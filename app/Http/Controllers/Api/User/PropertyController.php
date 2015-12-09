<?php

namespace App\Http\Controllers\Api\User;

use App\Affair\Property;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Auth;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class PropertyController extends Controller
{
    /**
     * get property list with page & category
     *
     * @param Request $request
     *  @param int page
     *  @param int category
     * @return JSON-array $property_list
     *  @return int id
     *  @return string name
     *  @return int category
     *  @return int status
     *  @return string code
     */
    public function getPropertyList(Request $request){
        // get query
        $property_query = new Property;

        // where category if provided
        if($request->has('category')){
            $property_query = Property::where('category', '=', $request->input('category'));
        }

        // get data with query
        $property_list = $property_query->paginate(10, [
            'id',
            'name',
            'status',
            'code',
            'category'
        ]);

        // return data
        return response()->json($property_list);
    }

    /**
     * get property detail with property_id
     *
     * @param int $property_id
     * @return mixed all of property data
     */
    public function getPropertyDetail($property_id){
        $property_detail = Property::find($property_id);

        if($property_detail === null){
            return 2;
        }else{
            return response()->json($property_detail);
        }
    }
}
