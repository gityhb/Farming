import React, { useState, useEffect } from 'react';
import './auction_detail.css';
import './common/root.css';

function AuctionDetail() {
    const [timeLeft, setTimeLeft] = useState(5); // 5분 (300초)
    const [isAuctionOver, setIsAuctionOver] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime > 0) {
                    return prevTime - 1;
                } else {
                    clearInterval(timer);
                    setIsAuctionOver(true); // 경매가 종료되었음을 표시
                    return 0;
                }
            });
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

                    {isAuctionOver ? (
                        <>
                            <div className="auction_amount">
                                <div className="auction_complete_input">
                                    <div className="auction_complete_box"></div>
                                    <div className="auction_complete_text">경매완료</div>
                                </div>
                                <div className="auction_amount_btn">입찰하기</div>
                            </div>

                            <div className="auction_graphs_container">
                                <div className="graph_section">
                                    <div className="graph_title">1차 입찰 결과 TOP5</div>
                                    <div className="graph">
                                        <div className="bar bar1">
                                            <div className="bar_value">400,000</div>
                                        </div>
                                        <div className="bar bar2">
                                            <div className="bar_value">397,000</div>
                                        </div>
                                        <div className="bar bar3">
                                            <div className="bar_value">395,000</div>
                                        </div>
                                        <div className="bar bar4">
                                            <div className="bar_value">394,000</div>
                                        </div>
                                        <div className="bar bar5">
                                            <div className="bar_value">388,000</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="graph_section">
                                    <div className="graph_title">1차 + 2차 입찰 결과 TOP5</div>
                                    <div className="graph">
                                        <div className="bar bar1">
                                            <div className="bar_value">470,000</div>
                                        </div>
                                        <div className="bar bar2">
                                            <div className="bar_value">450,000</div>
                                        </div>
                                        <div className="bar bar3">
                                            <div className="bar_value">435,000</div>
                                        </div>
                                        <div className="bar bar4">
                                            <div className="bar_value">400,000</div>
                                        </div>
                                        <div className="bar bar5">
                                            <div className="bar_value">397,000</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="auction_amount">
                            <div className="auction_amount_input">
                                <div className="auction_time"> 1차 {formatTime(timeLeft)}</div>
                                <div className={'auction_input_container'}>
                                    <input type={'number'} className={'auction_amount_input_field'}
                                           placeholder={"입찰가 입력"}/>
                                    <div className="auction_amount_text"> 원</div>
                                </div>
                            </div>
                            <div className="auction_amount_btn">입찰하기</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AuctionDetail;
