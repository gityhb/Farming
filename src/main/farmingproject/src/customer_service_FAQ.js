import './payment_success.css';
import './common/root.css';
import './shopping_basket.css';
import './customer_service_FAQ.css'
import React, {useState, useEffect} from 'react';

function Customer_service_FAQ() {


    return (
        <div id="body">
            <div id={'payment_success_page'} className={'page'}>
                <div id={'contents'}>
                    <div className={'Customer_service_Btn'}>
                        <div className={'FAQ_Btn'} style={{backgroundColor: '#FFEA8D'}}>FAQ</div>
                        <div className={'inquiry_Btn'} style={{backgroundColor: 'white'}}>1:1 문의</div>
                        <div className={'notice_Btn'} style={{backgroundColor: 'white'}}>공지사항</div>
                    </div>

                    <div className={'Customer_service_div'}>
                        <div className={'Customer_service_top'}>
                            <div className={'Customer_service_top_num'}>No.</div>
                            <div className={'Customer_service_top_title'}>제목</div>
                        </div>

                        <div className={'Customer_service_inner'}>
                            <div className={'Customer_service_inner_num'}>03</div>
                            <div className={'Customer_service_inner_title'}>언제 배송됨니카</div>
                        </div>
                        <div className={'Customer_service_inner'}>
                            <div className={'Customer_service_inner_num'}>02</div>
                            <div className={'Customer_service_inner_title'}>도대체 언제..</div>
                        </div>
                        <div className={'Customer_service_inner'}>
                            <div className={'Customer_service_inner_num'}>01</div>
                            <div className={'Customer_service_inner_title'}>빨리보내요</div>
                        </div>
                    </div>

                    <div className={'pagenation'}>1</div>
                </div>
            </div>
        </div>
    );
}

export default Customer_service_FAQ;