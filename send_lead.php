<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));
    $mobile = isset($data->mobile) ? htmlspecialchars(strip_tags($data->mobile)) : '';

    if (!empty($mobile)) {
        $to = "support@vedhavarshini.com";
        $subject = "New Diet Plan Lead - Vedha Varshini Wellness";
        $message = "You have received a new request for the Free Diet Plan Guide.\n\n";
        $message .= "Mobile Number: " . $mobile . "\n\n";
        $message .= "Please reach out to them on WhatsApp or phone to get started.";
        
        $headers = "From: no-reply@vedhavarshini.com" . "\r\n" .
                   "Reply-To: support@vedhavarshini.com" . "\r\n" .
                   "X-Mailer: PHP/" . phpversion();

        if(mail($to, $subject, $message, $headers)) {
            http_response_code(200);
            echo json_encode(array("message" => "Lead sent successfully."));
        } else {
            http_response_code(500);
            echo json_encode(array("message" => "Unable to send email. Please try again later."));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Mobile number is required."));
    }
} else {
    http_response_code(405);
    echo json_encode(array("message" => "Method not allowed."));
}
?>
