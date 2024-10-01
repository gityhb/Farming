import './payment_success.css';
import './common/root.css';
import './shopping_basket.css';
import './customer_service_notice.css'
import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";

function Customer_service_notice() {
    const [nitems, setnItems] = useState([
        {
            nnum:3,
            ntitle:"1공지사항 테스트3",
            ndate:"08.02"
        },
        {
            nnum:2,
            ntitle:"공지사항 테스트3",
            ndate:"08.04"
        },
        {
            nnum:1,
            ntitle:"공지사항 테스트3",
            ndate:"08.08"
        }
    ]);

    return (
        <div id="body">
            <div id={'payment_success_page'} className={'page'}>
                <div id={'contents'}>
                    <div className={'Customer_service_Btn'}>
                        <Link to={"/customer_service_FAQ"}><div className={'FAQ_Btn'} style={{ backgroundColor: 'white' }}>FAQ</div></Link>
                        <Link to={"/customer_service_one"}><div className={'inquiry_Btn'} style={{ backgroundColor: 'white' }}>1:1 문의</div></Link>
                        <Link to={"/customer_service_notice"}><div className={'notice_Btn'} style={{ backgroundColor: '#FFEA8D' }}>공지사항</div></Link>
                    </div>

                    <div className={'Customer_service_div'}>
                        <div className={'Customer_service_top'}>
                            <div className={'Customer_service_top_num'}>No.</div>
                            <div className={'Customer_service_top_title'}>제목</div>
                            <div className={'Customer_service_top_date'}>등록일</div>
                        </div>

                        {nitems.map((item) => (
                            <div className={'Customer_service_notice_inner'}>
                                <div className={'Customer_service_inner_num'}>{item.nnum}</div>
                                <div className={'notice_Customer_service_inner_title'}>{item.ntitle}</div>
                                <div className={'notice_Customer_service_inner_o_date'}>{item.ndate}</div>
                            </div>
                        ))}
                    </div>

                    <div className={'pagenation'}>1</div>
                </div>
            </div>
        </div>
    );
}

export default Customer_service_notice;