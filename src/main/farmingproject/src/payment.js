import './payment.css';
import './common/root.css';
import './shopping_basket.css';
import React, {useState, useEffect} from 'react';

function Payment() {


    return (
        <div id="body">
            <div id={'payment_page'} className={'page'}>
                <div id={'contents'}>
                    <div id="basket_title">
                        <h1>결제하기</h1>
                    </div>
                    <div id="basket_process">
                        <img src="img/next_process.png" alt="다음"/>
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
                                        <input type="radio" id="new_add" name="address" value="new_add"/>
                                            신규배송지
                                    </label>
                                </form>
                            </td>
                        </tr>
                        <tr>
                            <td className="address_tbl_title">이름/연락처</td>
                            <td className="address_tbl_info">오소정 | 010-1234-5678</td>
                        </tr>
                        <tr>
                            <td className="address_tbl_title">주소</td>
                            <td className="address_tbl_info">서울특별시에 있는 잠실역</td>
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
                            <td>수박 이미지/프리미엄 고당도 꿀수박</td>
                            <td>1</td>
                            <td>133원</td>
                            <td>132434원</td>
                        </tr>
                    </table>


                    {/* 결제창 결제금액 */}
                    <div className="payment_title">결제금액</div>
                    <table id="t_address_info">
                        <tr>
                            <td className="address_tbl_title">상품금액</td>
                            <td className="address_tbl_info">2342원</td>
                        </tr>
                        <tr>
                            <td className="address_tbl_title">상품할인</td>
                            <td className="address_tbl_info"></td>
                        </tr>
                        <tr>
                            <td className="address_tbl_title">상품 쿠폰 할인</td>
                            <td className="address_tbl_info">쿠폰 조회 버튼</td>
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


                    {/* 결제창 결제정보 */}
                    <div className="payment_title"> 결제정보</div>
                    <table id="t_payment_info">
                        <tr className={"payment_info_title"}>
                            <th>
                                <p>총 상품금액</p>
                                <p>18,900원</p>
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
                                <p>23,900</p>
                            </th>
                        </tr>
                        <tr className={"payment_info_content"}>
                            <td>
                                <p>상품 1개 18,000원</p>
                                <p>ㄴ상품할인 0원</p>
                            </td>
                            <td></td>
                            <td></td>
                        </tr>
                    </table>

                    <div id={"payment_Btn"}>결제하기</div>

                </div>
            </div>
        </div>
    );
}

export default Payment;