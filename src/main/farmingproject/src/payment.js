import './payment.css';
import './common/root.css';
import './shopping_basket.css';
import React, {useState, useEffect} from 'react';
import DaumPostcode from 'react-daum-postcode';
import Modal from 'react-modal';
import {useLocation, Navigate, useNavigate} from 'react-router-dom';
import {useUser} from "./common/userContext";



// Modal 스타일 정의
const modalStyles = {
    content: {
        width: '600px', // 모달 창의 너비
        height: '400px', // 모달 창의 높이
        margin: 'auto', // 중앙 정렬
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 검정색 배경
    },
};

function Payment() {
    const [isOpen, setIsOpen] = useState(false);
    const [inputUser, setInputUser] = useState({
        userZipcode: '',
        userAddr: '',
        userDetailAddr: '',
    });
    const location = useLocation();
    const { user } = useUser();
    const [orderItems, setOrderItems] = useState([]);
    const [productInfo, setProductInfo] = useState(null);
    const navigate = useNavigate();

    const new_addr = () => {
        setIsOpen(!isOpen);
    }

    const completeHandler = (data) => {
        setInputUser({
            ...inputUser,
            userZipcode: data.zonecode,
            userAddr: data.roadAddress,
        });
        setIsOpen(false);
    }

    useEffect(() => {
        console.log(location);

        if (location.state && location.state.product) {
            setProductInfo(location.state.product);
            console.log("상품 정보:", location.state.product);
        }

        if (location.state && location.state.orderItems) {
            setOrderItems(location.state.orderItems);
            console.log("Order Items 활인:", location.state.orderItems);
        }

        const script = document.createElement('script');
        script.src = "https://cdn.iamport.kr/js/iamport.payment-1.2.0.js";
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            var IMP = window.IMP;
            IMP.init("imp67515151");
        };

        return () => {
            document.body.removeChild(script);
        };
    }, [location]);

    if (!user) {
        return <div>Loading...</div>;
    }

    const totalAmount = orderItems.length > 0
        ? orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
        : (productInfo ? productInfo.price : 0);

    const requestPay = () => {
        const { IMP } = window;
        IMP.request_pay(
            {
                pg: "html5_inicis",
                pay_method: "card",
                merchant_uid: `mid_${new Date().getTime()}`, // 고유한 주문번호 생성
                name: orderItems.length > 0 ? `${orderItems[0].name} 외 ${orderItems.length - 1}건` : (productInfo ? productInfo.name : "상품"),
                amount: totalAmount,
                buyer_email: user.email,
                buyer_name: user.name,
                buyer_tel: user.phoneNumber,
                buyer_addr: inputUser.userAddr || user.address,
                buyer_postcode: inputUser.userZipcode || "00000"
            },
            async function (rsp) {
                if (rsp.success) {
                    console.log("결제 성공:", rsp);
                    try {
                        const response = await fetch('/api/orders/create', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                userId: user.userId,
                                items: orderItems.map(item => ({
                                    productId: item.id,
                                    quantity: item.quantity,
                                    price: item.price,
                                    deliveryStatus: "배송대기"
                                })),
                                deliveryAddress: inputUser.userAddr + " " + inputUser.userDetailAddr,
                                deliveryRequest: document.getElementById('delivery-notes').value,
                                totalAmount: totalAmount,
                                status: "success"
                            }),
                        });

                        if (response.ok) {
                            const orderResult = await response.json();
                            navigate('/payment_success', { state: { orderInfo: orderResult } });
                        } else {
                            throw new Error('주문 생성 실패');
                        }
                    } catch (error) {
                        console.error("주문 처리 중 오류 발생:", error);
                        alert("주문 처리 중 오류가 발생했습니다.");
                    }
                } else {
                    alert("결제에 실패하였습니다. 에러 내용: " + rsp.error_msg);
                }
            }
        );
    };

    return (
        <div id="body">
            <div id={'payment_page'} className={'page'}>
                <div id={'contents'}>
                    <div id="basket_title">
                        <h1>결제하기</h1>
                    </div>
                    <div id="basket_process">
                        <img src="img/next_process2.png" alt="다음2"/>
                    </div>


                    {/* 결제창 배송지 정보 */}
                    <div className="payment_title"> 배송지 정보</div>
                    <table id="t_address_info">
                        <tr>
                            <td className="address_tbl_title">배송지</td>
                            <td className="address_tbl_info">
                                <form id="address_info_form">
                                    <label>
                                        <input type="radio" id="old_add" name="address" value="old_add" defaultChecked/>
                                        기존배송지
                                    </label>
                                    <label>
                                        <input type="radio" id="new_add" name="address" value="new_add"
                                               onClick={new_addr}/>
                                        신규배송지
                                    </label>
                                </form>
                            </td>
                        </tr>

                        <Modal isOpen={isOpen} style={modalStyles} ariaHideApp={false}
                               onRequestClose={() => setIsOpen(false)}>
                            <DaumPostcode onComplete={completeHandler} height="100%"/>
                        </Modal>


                        <tr>
                            <td className="address_tbl_title">이름/연락처</td>
                            <td className="address_tbl_info">{user.name} | {user.phoneNumber}</td>
                        </tr>
                        <tr>
                            <td className="address_tbl_title">주소</td>
                            <td className="new_address_tbl_info">
                                우편번호
                                <div id="zipcode">
                                    <input value={inputUser.userZipcode || ''} readOnly placeholder="우편번호"
                                           className="new_zipcode"/>
                                    <div id="zipcode_Btn" onClick={new_addr}>
                                        우편번호 찾기
                                    </div>
                                </div>
                                주소
                                <input value={inputUser.userAddr || ''} readOnly placeholder="도로명 주소"
                                       className="new_addr"/>
                                <input type="text" value={inputUser.userDetailAddr || ''} placeholder="상세주소"
                                       className="new_detailaddr"
                                       onChange={(e) => setInputUser({...inputUser, userDetailAddr: e.target.value})}/>
                            </td>
                        </tr>
                        <tr>
                            <td className="address_tbl_title">배송 요청사항</td>
                            <td className="address_tbl_info">
                                <select id="delivery-notes" class="delivery-notes">
                                    <option value="delivery-notes1" selected>요청사항 없음</option>
                                    <option value="delivery-notes2">문 앞에 놔주세요</option>
                                    <option value="delivery-notes3">도착 전 전화주세요</option>
                                    <option value="delivery-notes4">경비실에 놔주세요</option>
                                    <option value="delivery-notes5">벨 눌러주세요</option>
                                    <option value="delivery-notes6">직접 입력</option>
                                </select>
                            </td>
                        </tr>
                    </table>


                    {/* 결제창 상품 정보 */}
                    <div className="payment_title"> 상품정보</div>
                    <table id="t_product_info">
                        <tr className={"product_info_title"}>
                            <th>상품정보</th>
                            <th>수량</th>
                            <th>적립금</th>
                            <th>주문금액</th>
                        </tr>
                        {orderItems.length > 0 ? (
                            orderItems.map(item => (
                                <tr key={item.id} className={"product_info_content"}>
                                    <td>
                                        <div id="product_info_content_info">
                                            <img src={item.imgPath} alt="market_img"/>
                                            <div id="product_info_content_info_p">
                                                <p id="product_info_content_info_title">{item.name}</p>
                                                <p id="product_info_content_info_origin">{item.storeName}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{item.quantity}</td>
                                    <td>{Math.floor(item.price * item.quantity * 0.01)}원</td>
                                    <td>{(item.price * item.quantity).toLocaleString()}원</td>
                                </tr>
                            ))
                        ) : productInfo && (
                            <tr className={"product_info_content"}>
                                <td>
                                    <div id="product_info_content_info">
                                        <img src={productInfo.imgPath} alt="market_img"/>
                                        <div id="product_info_content_info_p">
                                            <p id="product_info_content_info_title">{productInfo.name}</p>
                                            <p id="product_info_content_info_origin">{productInfo.storeName}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>1</td>
                                <td>{Math.floor(productInfo.price * 0.01)}원</td>
                                <td>{productInfo.price.toLocaleString()}원</td>
                            </tr>
                        )}
                    </table>


                    {/* 결제창 결제금액 */}
                    <div className="payment_title">결제금액</div>
                    <table id="t_address_info" className={"payment_table"}>
                        <tr>
                            <td className="address_tbl_title">상품금액</td>
                            <td className="address_tbl_info">{totalAmount.toLocaleString()}원</td>
                        </tr>
                        <tr>
                            <td className="address_tbl_title">상품할인</td>
                            <td className="address_tbl_info"></td>
                        </tr>
                        <tr>
                            <td className="address_tbl_title">상품 쿠폰 할인</td>
                            <td className="address_tbl_info">
                                <div id="coupon_Btn">
                                    쿠폰 조회
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="address_tbl_title">적립금 사용</td>
                            <td className="address_tbl_info" style={{color: '#ababab'}}>3000원 이상 보유시 사용가능 (보유 적립금
                                116원)
                            </td>
                        </tr>
                        <tr>
                            <td className="address_tbl_title">배송비</td>
                            <td className="address_tbl_info">배송비 무료</td>
                        </tr>
                    </table>


                    {/* 결제창 결제수단선택 */}
                    <div className="payment_title">결제수단 선택</div>
                    <div id="rdo_pay_select">
                        <form id="payment_type_form">
                            <label>
                                <input type="radio" id="card" name="payment_type" value="card" defaultChecked/>
                                신용카드
                            </label>
                            <label>
                                <input type="radio" id="payco" name="payment_type" value="payco"/>
                                페이코
                            </label>
                            <label>
                                <input type="radio" id="kakaopay" name="payment_type" value="kakaopay"/>
                                카카오페이
                            </label>
                            <label>
                                <input type="radio" id="naverpay" name="payment_type" value="naverpay"/>
                                네이버페이
                            </label>
                            <label>
                                <input type="radio" id="account" name="payment_type" value="account"/>
                                계좌이체
                            </label>
                        </form>
                    </div>


                    {/* 결제창 결제정보 */}
                    <div className="payment_title"> 결제정보</div>
                    <table id="t_payment_info">
                        <tr className={"payment_info_title"}>
                            <th>
                                <p>총 상품금액</p>
                                <p>{totalAmount.toLocaleString()}원</p>
                            </th>
                            <th>
                                <p>총 추가금액</p>
                                <p>0원</p>
                            </th>
                            <th>
                                <p>총 할인금액</p>
                                <p>0원</p>
                            </th>
                            <th rowSpan={2} style={{backgroundColor: 'white'}}>
                                <p>최종 결제금액</p>
                                <p>{totalAmount.toLocaleString()}원</p>
                            </th>
                        </tr>
                        <tr className={"payment_info_content"}>
                            <td>
                                <div className="info-container">
                                    <div className="info-row">
                                        <span id="item-name">상품 {orderItems.length || 1}개</span>
                                        <span id="item-price">{totalAmount.toLocaleString()}원</span>
                                    </div>
                                    <div className="info-row">
                                        <span id="discount-name">ㄴ상품할인</span>
                                        <span id="discount-price">0원</span>
                                    </div>
                                </div>
                            </td>
                            <td></td>
                            <td></td>
                        </tr>
                    </table>

                    <div id={"payment_Btn"} onClick={requestPay}>결제하기</div>

                </div>
            </div>
        </div>
    );
}

export default Payment;