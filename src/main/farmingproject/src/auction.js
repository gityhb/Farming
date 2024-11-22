import React, { useState, useEffect } from 'react';
import './auction.css';
import './common/root.css';
import { useNavigate } from 'react-router-dom';

function Auction() {
    const [auctions, setAuctions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/api/auction/items')
            .then(response => response.json())
            .then(data => setAuctions(data))
            .catch(error => console.error('Error fetching auction data:', error));
    }, []);

    const handleAuctionClick = (auction) => {
        const currentTime = new Date();
        const auctionStartTime = new Date(auction.auctionDate);  // 경매 시작 시간
        const auctionEndTime = new Date(auctionStartTime.getTime() + 2 * 60 * 60 * 1000); // 시작 시간으로부터 2시간 후 종료

        if (currentTime < auctionStartTime) {
            alert("경매가 아직 시작되지 않았습니다. 경매 시작 전에는 입장할 수 없습니다.");
        } else if (currentTime >= auctionStartTime && currentTime <= auctionEndTime) {
            navigate(`/auction_detail/${auction.auctionId}`); // 진행 중인 경매로 이동
        } else {
            navigate(`/auction_result/${auction.auctionId}`); // 종료된 경매의 결과 페이지로 이동
        }
    };

    return (
        <div id="body">
            <div id={'auction_page'} className={'page'}>
                <div id={'contents'}>
                    <div className={'auction_title'}>
                        <div className={'main_title'}>
                            <h1 style={{ textAlign: 'center' }}>청과 경매</h1>
                        </div>
                    </div>
                    <div className={'auction_container'}>
                        <div className={'auction_content'}>
                            {auctions.map((auction) => (
                                <div key={auction.auctionId}>
                                    <div className={'auction_content_item'}>
                                        <div onClick={() => handleAuctionClick(auction)}>
                                            <div className={'item_sec_1'}>
                                                {new Date(auction.auctionDate).toLocaleString('ko-KR', {
                                                    year: 'numeric',
                                                    month: '2-digit',
                                                    day: '2-digit',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })} 예정
                                            </div>

                                            <div className={'item_sec_2'}>
                                                <img
                                                    src={`${auction.auctionImage}`}
                                                    alt="상품 사진"
                                                />
                                                <div className={'item_name'}>{auction.auctionTitle}</div>
                                                <div className={'item_minbid'}>최소 입찰가 | {auction.auctionMinimumbid}원</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Auction;
