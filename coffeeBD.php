<?php
$dbc = mysqli_connect('localhost', 'root', '', 'base');
$data = json_decode(file_get_contents('php://input'), true);

// Извлечение данных о заказе
$name = $data['name'];
$mail = $data['email'];
$phone = $data['phone'];
$adres = $data['adres'];
$total = $data['total'];
$items = $data['items']; // Массив с товарами

// Проверка, что items существует и является массивом


// Вставка данных о заказе в таблицу orders
$query = "INSERT INTO orders (name, email, phone, adres, total) VALUES ('$name', '$mail', '$phone', '$adres', '$total')";
$result = mysqli_query($dbc, $query);

// Получаем ID последнего вставленного заказа
$order_id = mysqli_insert_id($dbc);

// Вставка данных о товарах в таблицу order_items
// foreach ($items as $item) {
//     $product_id = $item['productId'];
//     $item_name = $item['name'];
//     $price = $item['price'];
//     $quantity = $item['quantity'];

//     $query_item = "INSERT INTO order_items (order_id, product_id, name, price, quantity) 
//                    VALUES ('$order_id', '$product_id', '$item_name', '$price', '$quantity')";
//     mysqli_query($dbc, $query_item);
// }
foreach($items as $item){
    $item_name = $item['name'];
    $price = $item['price'];
    $quantity = $item['quantity'];
    $product_id = $item['productId'];
    

    $query_item = "INSERT INTO order_items (order_id, product_id, name, price, quantity) 
        VALUES ('$order_id', '$product_id', '$item_name', '$price', '$quantity')";
    mysqli_query($dbc, $query_item);

}

// Установка кода ответа и заголовков
http_response_code(201);
header('Content-type: application/json');

// Возврат успешного сообщения
echo json_encode(array('message' => 'Заказ успешно оформлен', 'total' => $total));

// Закрытие соединения с базой данных
mysqli_close($dbc);
?>