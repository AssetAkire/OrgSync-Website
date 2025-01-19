<?php
// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// Initialize API
require_once(dirname(__FILE__) . '/../core/initialize.php');

// Start the session
session_start();

try {
    // Check if the request method is POST
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
 
        $data = json_decode(file_get_contents("php://input"));


        if (!empty($data->email) && !empty($data->password)) {
           
            $user = new UserHandler($db);

  
            $result = $user->login($data->email, $data->password);
            if ($result) {
       
                $_SESSION['student_id'] = $result['student_id']; 
                $_SESSION['email'] = $result['email'];
                $_SESSION['account_type'] = $result['account_type']; 
                
                http_response_code(200);
                echo json_encode(array(
                    'message' => 'Login successful',
                    'user' => $result
                ));
            } else {
                
                http_response_code(401);
                echo json_encode(array('message' => 'Invalid email or password'));
            }
        } else {
            http_response_code(400);
            echo json_encode(array('message' => 'Email and password are required'));
        }
    } else {
        http_response_code(405);
        echo json_encode(array('message' => 'Method not allowed'));
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(array('message' => 'Internal Server Error', 'error' => $e->getMessage()));
}
