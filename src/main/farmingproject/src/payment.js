import './payment.css';
import './common/root.css';
import './shopping_basket.css';
import React, {useState, useEffect} from 'react';
import DaumPostcode from 'react-daum-postcode';
import Modal from 'react-modal';


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
    }, []);

    const requestPay = () => {
        const { IMP } = window;
        IMP.request_pay(
            {
                pg: "html5_inicis",
                pay_method: "card",
                merchant_uid: "123", //주문번호
                name: "프리미엄 고당도 꿀수박 1.35KG",
                amount: 1, //가격
                buyer_email: "gildong@gmail.com",
                buyer_name: "홍길동",
                buyer_tel: "010-4242-4242",
                buyer_addr: "서울특별시 강남구 신사동",
                buyer_postcode: "01181"
            },
            function (rsp) {
                if (rsp.success) {
                    console.log("결제 성공:", rsp);
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
                                        <input type="radio" id="new_add" name="address" value="new_add" onClick={new_addr}/>
                                            신규배송지
                                    </label>
                                </form>
                            </td>
                        </tr>

                        <Modal isOpen={isOpen} style={modalStyles} ariaHideApp={false} onRequestClose={()=>setIsOpen(false)}>
                            <DaumPostcode onComplete={completeHandler} height="100%"/>
                        </Modal>


                        <tr>
                            <td className="address_tbl_title">이름/연락처</td>
                            <td className="address_tbl_info">오소정 | 010-1234-5678</td>
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
                    <div className="payment_title"> 상품정보 </div>
                    <table id="t_product_info">
                        <tr className={"product_info_title"}>
                            <th>상품정보</th>
                            <th>수량</th>
                            <th>적립금</th>
                            <th>주문금액</th>
                        </tr>
                        <tr  className={"product_info_content"}>
                            <td>
                                <div id="product_info_content_info">
                                    <img src="img/watermelon.png" alt="market_img"/>
                                    <div id="product_info_content_info_p">
                                        <p id="product_info_content_info_title">프리미엄 고당도 미니 꿀수박</p>
                                        <p id="product_info_content_info_origin">원산지: 산골짜기</p>
                                    </div>
                                </div>
                            </td>
                            <td>1</td>
                            <td>30원</td>
                            <td>3,000원</td>
                        </tr>
                    </table>


                    {/* 결제창 결제금액 */}
                    <div className="payment_title">결제금액</div>
                    <table id="t_address_info" className={"payment_table"}>
                        <tr>
                            <td className="address_tbl_title">상품금액</td>
                            <td className="address_tbl_info">3,000원</td>
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
                            <td className="address_tbl_info" style={{ color: '#ababab' }}>3000원 이상 보유시 사용가능 (보유 적립금 116원)</td>
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

                    {/*
                    <table id="t_payment_select">
                        <tr>
                            <td className="payselect_tbl_title">카드 종류</td>
                            <td className="address_tbl_info">
                                <select id="card_type" class="delivery-notes">
                                    <option value="card_type0" selected>카드를 선택해주세요</option>
                                    <option value="card_type1">KB국민카드</option>
                                    <option value="card_type2">농협카드</option>
                                    <option value="card_type3">현대카드</option>
                                    <option value="card_type4">우리카드</option>
                                    <option value="card_type5">삼성카드</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td className="payselect_tbl_title">할부 종류</td>
                            <td className="address_tbl_info">
                                <select id="card_month" class="delivery-notes">
                                    <option value="card_month0" selected>일시불</option>
                                    <option value="card_month1">1개월</option>
                                    <option value="card_month2">2개월</option>
                                    <option value="card_month3">3개월</option>
                                    <option value="card_month4">4개월</option>
                                    <option value="card_month5">5개월</option>
                                    <option value="card_month6">6개월</option>
                                </select>
                            </td>
                        </tr>
                    </table>
                    */}


                    {/* 결제창 결제정보 */}
                    <div className="payment_title"> 결제정보</div>
                    <table id="t_payment_info" className={"table_container"} >
                        <tr className={"payment_info_title"}>
                            <th>
                                <p>총 상품금액</p>
                                <p>3,000원</p>
                            </th>
                            <th>
                                <p>총 추가금액</p>
                                <p>0원</p>
                            </th>
                            <th>
                                <p>총 할인금액</p>
                                <p>0원</p>
                            </th>
                            <th rowSpan={2} style={{ backgroundColor: 'white' }}>
                                <p>최종 결제금액</p>
                                <p>3,000</p>
                            </th>
                        </tr>
                        <tr className={"payment_info_content"}>
                            <td>
                                <div className="info-container">
                                    <div className="info-row">
                                        <span id="item-name">상품 1개</span>
                                        <span id="item-price">3,000원</span>
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