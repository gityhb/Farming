import './payment_success.css';
import './common/root.css';
import './shopping_basket.css';
import './customer_service_one.css';
import './customer_service_FAQ.css';
import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";

function Customer_service_one() {


    return (
        <div id="body">
            <div id={'payment_success_page'} className={'page'}>
                <div id={'contents'}>
                    <div className={'Customer_service_Btn'}>
                        <Link to={"/customer_service_FAQ"}><div className={'FAQ_Btn'} style={{ backgroundColor: 'white' }}>FAQ</div></Link>
                        <Link to={"/customer_service_one"}><div className={'inquiry_Btn'} style={{ backgroundColor: '#FFEA8D' }}>1:1 문의</div></Link>
                        <Link to={"/customer_service_notice"}><div className={'notice_Btn'} style={{ backgroundColor: 'white' }}>공지사항</div></Link>
                    </div>

                    <div className={'Customer_service_div'}>
                        <div className={'Customer_service_top'}>
                            <div className={'Customer_service_top_num'}>No.</div>
                            <div className={'Customer_service_top_title'}>제목</div>
                            <div className={'Customer_service_top_o_date'}>등록일</div>
                            <div className={'Customer_service_top_answer'}>답변여부</div>
                        </div>

                        <div className={'Customer_service_inner'}>
                            <div className={'Customer_service_inner_num'}>04</div>
                            <div className={'Customer_service_inner_title'}>문의 테스트 테스트</div>
                            <div className={'Customer_service_inner_o_date'}>08.15</div>
                            <div className={'Customer_service_inner_answer'}>답변대기</div>
                        </div>
                        <div className={'Customer_service_inner'}>
                            <div className={'Customer_service_inner_num'}>03</div>
                            <div className={'Customer_service_inner_title'}>문의3</div>
                            <div className={'Customer_service_inner_o_date'}>08.07</div>
                            <div className={'Customer_service_inner_answer'}>답변대기</div>
                        </div>
                        <div className={'Customer_service_inner'}>
                            <div className={'Customer_service_inner_num'}>02</div>
                            <div className={'Customer_service_inner_title'}>문의2</div>
                            <div className={'Customer_service_inner_o_date'}>08.07</div>
                            <div className={'Customer_service_inner_answer'}>답변완료</div>
                        </div>
                        <div className={'Customer_service_inner'}>
                            <div className={'Customer_service_inner_num'}>01</div>
                            <div className={'Customer_service_inner_title'}>문의1</div>
                            <div className={'Customer_service_inner_o_date'}>08.07</div>
                            <div className={'Customer_service_inner_answer'}>답변완료</div>
                        </div>
                    </div>

                    <div className={'one_add_Btn'}>1:1 문의하기</div>
                    <div className={'pagenation'}>1</div>
                </div>
            </div>
        </div>
    );
}

export default Customer_service_one;