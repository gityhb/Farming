import React, { useState, useEffect } from 'react';
import './auction_detail.css';
import './common/root.css';

function AuctionDetail() {
    const [timeLeft, setTimeLeft] = useState(300); // 5분 (300초)

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    return (
        <div id="body">
            <div className="page">
                <div id="contents">
                    <div className="auction_detail_title">
                        <div className="auction_detail_text">경매 상세</div>
                    </div>
                    <div className="auction_detail_container">
                        <div>
                            <img src="img/watermelon_3.png" alt="상품 사진" />
                        </div>
                        <div className="auction_detail_item">
                            <div className="item_title">프리미엄 고당도 꿀수박 50통</div>
                            <div className="item_origin">원산지 | 산골짜기</div>
                            <div className="item_delivery">배송정보 | 무료배송, 08/09 도착예정</div>
                            <div className="item_minbid">
                                <div className="minbid_title">최소 입찰가</div>
                                <div className="minbid_amount">300,000원</div>
                            </div>
                        </div>
                    </div>

                    <div className="auction_detail_separator"></div>

                    <div className="auction_amount">
                        <div className="auction_amount_input">
                            <div className="auction_time"> 1차 {formatTime(timeLeft)}</div>
                            <div className={'auction_input_container'}>
                                <input type={'number'} className={'auction_amount_input_field'} placeholder={"입찰가 입력"}/>
                                <div className="auction_amount_text"> 원</div>
                            </div>
                        </div>
                        <div className="auction_amount_btn">
                            입찰하기
                        </div>
                    </div>{/*auction_amount*/}
                </div>
            </div>
        </div>
    );
}

export default AuctionDetail;
