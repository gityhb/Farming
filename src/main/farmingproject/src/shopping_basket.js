import './shopping_basket.css';
import './common/root.css';
import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useUser} from "./common/userContext";

function Shopping_Basket() {
    const navigate = useNavigate();
    const { user } = useUser();
    const [items, setItems] = useState([]);
    const [allChecked, setAllChecked] = useState(false);

    useEffect(() => {
        if (user && user.userId) {
            fetchBasketItems(user.userId);
        }
    }, [user]);

    const fetchBasketItems = async (userId) => {
        try {
            const response = await fetch(`/api/basket/${userId}`);
            if (response.ok) {
                const data = await response.json();
                setItems(data.map(item => ({
                    ...item,
                    checked: true,
                    totalAmount: item.productRG.productPrice3 * item.quantity
                })));
            } else {
                console.error('장바구니 아이템 가져오기 실패');
            }
        } catch (error) {
            console.error('장바구니 아이템을 가져오는 중 오류 발생:', error);
        }
    };

    useEffect(() => {
        const areAllItemsChecked = items.every(item => item.checked);
        setAllChecked(areAllItemsChecked);
    }, [items]);

    const incrementQuantity = (id) => {
        setItems(items.map(item =>
            item.id === id
                ? {...item, quantity: item.quantity + 1, totalAmount: item.totalAmount + item.price}
                : item
        ));
    };

    const decrementQuantity = (id) => {
        setItems(items.map(item =>
            item.id === id && item.quantity > 0
                ? {...item, quantity: item.quantity - 1, totalAmount: item.totalAmount - item.price}
                : item
        ));
    };

    const toggleCheck = (id) => {
        setItems(items.map(item =>
            item.id === id
                ? {...item, checked: !item.checked}
                : item
        ));
    };

    const toggleAllCheck = () => {
        const newAllChecked = !allChecked;
        setAllChecked(newAllChecked);
        setItems(items.map(item => ({
            ...item,
            checked: newAllChecked
        })));
    };

    const handleSelectOrder = () => {
        const selectedItems = items.filter(item => item.checked);
        if (selectedItems.length === 0) {
            alert("선택된 상품이 없습니다.");
            return;
        }
        navigateToPayment(selectedItems);
    };

    const handleAllOrder = () => {
        if (items.length === 0) {
            alert("장바구니에 상품이 없습니다.");
            return;
        }
        navigateToPayment(items);
    };

    const navigateToPayment = (orderItems) => {
        navigate('/payment', {
            state: {
                orderItems: orderItems.map(item => ({
                    id: item.productRG.id,
                    name: item.productRG.productName,
                    price: item.productRG.productPrice3,
                    quantity: item.quantity,
                    imgPath: item.productRG.productimgPath,
                    storeName: item.productRG.storeName
                }))
            }
        });
    };

    const totalSum = items.reduce((acc, item) => item.checked ? acc + item.totalAmount : acc, 0);

    return (
        <div id="body">
            <div id={'shopping_basket_page'} className={'page'}>
                <div id={'contents'}>
                    <div id="basket_title">
                        <h1>장바구니</h1>
                    </div>
                    <div id="basket_process">
                        <img src="img/next_process.png" alt="다음"/>
                    </div>
                    <div id="basket_table">
                        <table id="basket_table_list">
                            <thead>
                            <tr>
                                <th>
                                    <button type="button" id="all_check" onClick={toggleAllCheck}>
                                        <img src={allChecked ? "img/basket_check.png" : "img/basket_uncheck.png"}
                                             alt="check"/>
                                    </button>
                                </th>
                                <th>상품정보</th>
                                <th>수량</th>
                                <th>가격</th>
                            </tr>
                            </thead>
                            <tbody>
                            {items.map(item => (
                                <tr key={item.id}>
                                    <td>
                                        <button type="button" id="basket_check_btn"
                                                onClick={() => toggleCheck(item.id)}>
                                            <img src={item.checked ? "img/basket_check.png" : "img/basket_uncheck.png"}
                                                 alt="check"/>
                                        </button>
                                    </td>
                                    <td id="basket_list_td">
                                        <div id="basket_list">
                                            <div id="basket_list_img">
                                                <img src={`${item.productRG.productimgPath}`} alt="market_img"/>
                                            </div>
                                            <div id="basket_list_name">
                                                <div id="basket_list_market_name">{item.productRG.storeName}</div>
                                                <div id="basket_list_product_name">{item.productRG.productName}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td id="basket_list_quantity_td">
                                        <div id="basket_list_quantity">
                                            <button onClick={() => decrementQuantity(item.id)}>-</button>
                                            <span> {item.quantity} </span>
                                            <button onClick={() => incrementQuantity(item.id)}>+</button>
                                        </div>
                                    </td>
                                    <td id="quantity_total_price_td">{item.totalAmount}원</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <div id="total_sum_price">
                            <span id={'sum_title'}>총 결제금액</span>
                            <span id={'sum_txt'}>{totalSum}원</span>
                        </div>
                    </div>
                    <div id="order_button">
                        <button id="order_select_btn" onClick={handleSelectOrder}>선택주문</button>
                        <button id="order_all_btn" onClick={handleAllOrder}>전체주문</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Shopping_Basket;