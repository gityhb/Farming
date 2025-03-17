import './payment_success.css';
import './common/root.css';
import './shopping_basket.css';
import React, {useState, useEffect} from 'react';

function Payment_success() {


    return (
        <div id="body">
            <div id={'payment_success_page'} className={'page'}>
                <div id={'contents'}>
                    <div id="basket_process">
                        <img src="img/next_process3.png" alt="다음3"/>
                    </div>

                    <div class="payment_success">
                        <img src="img/pay_success.png" alt="결제완료 이미지"/>
                        <p id="payment_success_txt"> 주문이 완료 되었습니다 </p>
                        <div id="payment_success_Btn">
                            주문 상세보기
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Payment_success;