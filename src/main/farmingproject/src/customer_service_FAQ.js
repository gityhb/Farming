import './payment_success.css';
import './common/root.css';
import './shopping_basket.css';
import React, {useState, useEffect} from 'react';

function Customer_service_FAQ() {


    return (
        <div id="body">
            <div id={'payment_success_page'} className={'page'}>
                <div id={'contents'}>
                    <div className={'Customer_service_Btn'}>
                        <div className={'FAQ_Btn'}>FAQ</div>
                        <div className={'inquiry_Btn'}>1:1 문의</div>
                        <div className={'notice_Btn'}>공지사항</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Customer_service_FAQ;