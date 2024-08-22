import './payment_success.css';
import './common/root.css';
import './shopping_basket.css';
import './customer_service_notice.css'
import React, {useState, useEffect} from 'react';

function Customer_service_notice() {


    return (
        <div id="body">
            <div id={'payment_success_page'} className={'page'}>
                <div id={'contents'}>
                    <div className={'Customer_service_Btn'}>
                        <div className={'FAQ_Btn'} style={{backgroundColor: 'white'}}>FAQ</div>
                        <div className={'inquiry_Btn'} style={{backgroundColor: 'white'}}>1:1 문의</div>
                        <div className={'notice_Btn'} style={{backgroundColor: '#FFEA8D'}}>공지사항</div>
                    </div>

                    <div className={'Customer_service_div'}>
                        <div className={'Customer_service_top'}>
                            <div className={'Customer_service_top_num'}>No.</div>
                            <div className={'Customer_service_top_title'}>제목</div>
                            <div className={'Customer_service_top_date'}>등록일</div>
                        </div>

                        <div className={'Customer_service_inner'}>
                            <div className={'Customer_service_inner_num'}>04</div>
                            <div className={'Customer_service_inner_title'}>공지사항 테스트</div>
                            <div className={'Customer_service_inner_date'}>08.15</div>
                        </div>
                        <div className={'Customer_service_inner'}>
                            <div className={'Customer_service_inner_num'}>03</div>
                            <div className={'Customer_service_inner_title'}>공지사항3</div>
                            <div className={'Customer_service_inner_date'}>08.07</div>
                        </div>
                        <div className={'Customer_service_inner'}>
                            <div className={'Customer_service_inner_num'}>02</div>
                            <div className={'Customer_service_inner_title'}>공지사항2</div>
                            <div className={'Customer_service_inner_date'}>08.07</div>
                        </div>
                        <div className={'Customer_service_inner'}>
                            <div className={'Customer_service_inner_num'}>01</div>
                            <div className={'Customer_service_inner_title'}>공지사항1</div>
                            <div className={'Customer_service_inner_date'}>08.07</div>
                        </div>
                    </div>

                    <div className={'pagenation'}>1</div>
                </div>
            </div>
        </div>
    );
}

export default Customer_service_notice;