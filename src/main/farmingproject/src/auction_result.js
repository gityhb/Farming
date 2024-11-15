import React, { useState, useEffect } from 'react';
import './auction_result.css';
import { useParams } from 'react-router-dom';

function AuctionResult() {
    const { auctionId } = useParams();
    const [auction, setAuction] = useState(null); // 경매 기본 정보
    const [combinedBids, setCombinedBids] = useState([]); // 최종 입찰 결과

    useEffect(() => {
        // 경매 기본 정보 가져오기
        fetch(`/api/auction/items/${auctionId}`)
            .then((response) => response.json())
            .then((data) => setAuction(data))
            .catch((error) => console.error('경매 데이터를 불러오는 중 오류:', error));

        // 최종 입찰 결과 가져오기
        fetch(`/api/auctionbid/top5/${auctionId}`)
            .then((response) => response.json())
            .then((data) => {
                console.log("최종 입찰 데이터:", data); // 데이터 확인
                setCombinedBids(data);
            })
            .catch((error) => console.error('최종 입찰 데이터를 불러오는 중 오류:', error));
    }, [auctionId]);

    if (!auction) {
        return <p>경매 결과를 불러오는 중입니다...</p>;
    }

    return (
        <div className="auction_result_page">
            <h1>경매 결과</h1>
            <div className="auction_result_details">
                <h2>{auction.auctionTitle}</h2>
                <img src={`http://localhost:8080/uploads/auction_images/${auction.auctionImage}`} alt="상품 사진" />
                <p>최소 입찰가: {auction.auctionMinimumbid}원</p>

                <div className="auction_graphs_container">
                    {combinedBids.length > 0 ? (
                        <div className="graph_section">
                            <div className="graph_title">최종 입찰 결과 TOP 5</div>
                            <div className="graph">
                                {combinedBids.map((bid, index) => (
                                    <div key={index} className={`bar bar${index + 1}`}>
                                        <div className="bar_value">{bid || 0}원</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <p>최종 입찰 결과가 없습니다.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AuctionResult;
