import React, { useState, useEffect } from 'react';
import './auction.css';
import './common/root.css';
import { Link } from 'react-router-dom';

function Auction() {
    const [auctions, setAuctions] = useState([]);

    useEffect(() => {
        fetch('/api/auction/items')
            .then(response => response.json())
            .then(data => setAuctions(data))
            .catch(error => console.error('Error fetching auction data:', error));
    }, []);

    return (
        <div id="body">
            <div id={'auction_page'} className={'page'}>
                <div id={'contents'}>
                    <div className={'auction_title'}>
                        <div className={'main_title'}>
                            <h1 style={{textAlign: 'center'}}>청과 경매</h1>
                        </div>
                    </div>
                    <div className={'auction_container'}>
                        <div className={'auction_content'}>
                        {auctions.map((auction) => (
                            <div key={auction.auctionId}>
                                <div className={'auction_content_item'}>
                                    {/* auctionId를 URL에 포함해서 전달 */}
                                    <Link to={`/auction_detail/${auction.auctionId}`}>
                                        <div className={'item_sec_1'}>{auction.auctionDate} 예정</div>
                                        <div className={'item_sec_2'}>
                                            {/* 경매 상품의 이미지 경로를 사용해 이미지 표시 */}
                                            <img src={`http://localhost:8080/uploads/auction_images/${auction.auctionImage}`} alt="상품 사진"/>
                                            <div className={'item_name'}>{auction.auctionTitle}</div>
                                            <div className={'item_minbid'}>최소 입찰가 | {auction.auctionMinimumbid}원</div>
                                        </div>
                                    </Link>
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
