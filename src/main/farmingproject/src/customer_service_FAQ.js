import './payment_success.css';
import './common/root.css';
import './shopping_basket.css';
import './customer_service_FAQ.css'
import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";

function Customer_service_FAQ() {
    const [fitems, setfItems] = useState([
        {
            fnum:4,
            ftitle:"당장 오늘안에 보내주시오",
        },
        {
            fnum:3,
            ftitle:"빨리 보내라",
        },
        {
            fnum:2,
            ftitle:"예상 배송 날짜",
        },
        {
            fnum:1,
            ftitle:"오토바이로 보내주시나요?",
        }
    ]);

    return (
        <div id="body">
            <div id={'payment_success_page'} className={'page'}>
                <div id={'contents'}>
                    <div className={'Customer_service_Btn'}>
                        <Link to={"/customer_service_FAQ"}><div className={'FAQ_Btn'} style={{ backgroundColor: '#FFEA8D' }}>FAQ</div></Link>
                        <Link to={"/customer_service_one"}><div className={'inquiry_Btn'} style={{ backgroundColor: 'white' }}>1:1 문의</div></Link>
                        <Link to={"/customer_service_notice"}><div className={'notice_Btn'} style={{ backgroundColor: '#fff' }}>공지사항</div></Link>
                    </div>

                    <div className={'Customer_service_div'}>
                        <div className={'Customer_service_top'}>
                            <div className={'Customer_service_top_num'}>No.</div>
                            <div className={'Customer_service_top_title'}>제목</div>
                        </div>

                        {/*<div className={'Customer_service_inner'}>*/}
                        {/*    <div className={'Customer_service_inner_num'}>03</div>*/}
                        {/*    <div className={'Customer_service_inner_title'}>언제 배송이 시작되나요?</div>*/}
                        {/*</div>*/}
                        {/*<div className={'Customer_service_inner'}>*/}
                        {/*    <div className={'Customer_service_inner_num'}>02</div>*/}
                        {/*    <div className={'Customer_service_inner_title'}>배송 시작 후 배송 완료까지 몇일 소요되나요?</div>*/}
                        {/*</div>*/}
                        {/*<div className={'Customer_service_inner'}>*/}
                        {/*    <div className={'Customer_service_inner_num'}>01</div>*/}
                        {/*    <div className={'Customer_service_inner_title'}>환불 및 교환 방법이 궁금해요.</div>*/}
                        {/*</div>*/}
                        {fitems.map((item) => (
                            <div className={'Customer_service_inner'}>
                                <div className={'Customer_service_inner_num'}>{item.fnum}</div>
                                <div className={'Customer_service_inner_title'}>{item.ftitle}</div>
                            </div>
                        ))}
                    </div>

                    <div className={'pagenation'}>1</div>
                </div>
            </div>
        </div>
    );
}

export default Customer_service_FAQ;