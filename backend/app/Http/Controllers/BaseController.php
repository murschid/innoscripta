<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BaseController extends Controller
{
    public function sendResponse($result, $message)
    {
        $response = [
            'success' => true,
            'data' => $result,
            'message' => $message
        ];

        return response()->json($response, 200);
    }

    /**
     * return error message
     * @param string $error
     */
    public function sendError($message, $errors = [], $code = 404)
    {
        $response = [
            'success' => false,
            'message' => $message
        ];

        if (!empty($errors)) $response['data'] = $errors;

        return response()->json($response, $code);
    }
}
