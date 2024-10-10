import React, { useState, useEffect } from 'react';
import './auction_detail.css';
import './common/root.css';
import { useParams } from 'react-router-dom';
import { useUser } from './common/userContext';

function AuctionDetail() {
    const { user } = useUser();
    const [loggedInUserId, setLoggedInUserId] = useState(null);
    const { auctionId } = useParams(); // URL에서 auction_id를 가져옴
    const [auction, setAuction] = useState(null); // 경매 데이터를 저장할 상태
    const [bidAmount, setBidAmount] = useState(''); // 입력된 입찰 금액을 저장할 상태
    const [chatMessages, setChatMessages] = useState([]); // 채팅 메시지 상태
    const [firstRoundBids, setFirstRoundBids] = useState([]); // 1차 입찰 결과
    const [combinedBids, setCombinedBids] = useState([]); // 1차 + 2차 결과를 저장할 상태
    const [firstRoundCompleted, setFirstRoundCompleted] = useState(false); // 1차 입찰 완료 여부
    const [secondRoundStarted, setSecondRoundStarted] = useState(false); // 2차 입찰 여부를 저장할 상태
    const [auctionEnded, setAuctionEnded] = useState(false); // 경매 종료 여부

    // auction_id에 맞는 경매 항목 불러오기
    useEffect(() => {
        fetch(`/api/auction/items/${auctionId}`) // 경매 항목에 대한 API 요청
            .then((response) => response.json())
            .then((data) => setAuction(data))
            .catch((error) => console.error('Error fetching auction data:', error));
    }, [auctionId]);

    // 사용자의 정보를 가져오는 useEffect
    useEffect(() => {
        fetch('/api/user') // 서버에서 사용자의 정보를 불러오는 API 호출
            .then((response) => response.json())
            .then((data) => {
                setLoggedInUserId(data.userId);
            })
            .catch((error) => {
                console.error('Error fetching user info:', error);
            });
    }, []);

    // 입찰 금액을 서버에 보내는 함수
    const handleSendBid = () => {
        if (!bidAmount || isNaN(bidAmount)) {
            alert('유효한 금액을 입력하세요.');
            return;
        }

        // 입찰 API 호출
        fetch('/api/auctionbid', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                auctionId: auctionId, // 경매Id
                userId: loggedInUserId, // 사용자Id
                auctionBidAmount: parseFloat(bidAmount), // 입찰금액
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                // 입찰이 성공하면 새로운 메시지를 추가
                setChatMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        user: '관리자',
                        message: `입찰가: ${bidAmount}원`,
                        time: new Date().toLocaleTimeString(),
                    },
                ]);

                setBidAmount(''); // 입력 필드 초기화

                // 1차 입찰 완료 후 30초 후 1차 결과 표시
                if (!firstRoundCompleted && !secondRoundStarted) {
                    setTimeout(() => {
                        fetchTop5Results('first'); // 1차 결과를 가져오는 함수 호출
                        setFirstRoundCompleted(true);
                    }, 30 * 1000); // 30초
                }
                // 2차 입찰 후 30초 후 1차 + 2차 결과 표시
                else if (firstRoundCompleted && secondRoundStarted) {
                    setTimeout(() => {
                        fetchTop5Results('combined'); // 1차 + 2차 결과를 가져오는 함수 호출
                        setAuctionEnded(true); // 경매 종료
                    }, 30 * 1000); // 30초
                }
            })
            .catch((error) => {
                console.error('Error sending bid:', error);
            });
    };

    // 상위 5개의 입찰 금액을 불러오는 함수
    const fetchTop5Results = (type) => {
        fetch(`/api/auctionbid/top5/${auctionId}`)
            .then((response) => response.json())
            .then((data) => {
                if (type === 'first') {
                    setFirstRoundBids(data); // 1차 입찰 결과 저장
                    startSecondRound(); // 1차 결과 후 2차 입찰 시작
                } else if (type === 'combined') {
                    setCombinedBids(data); // 1차 + 2차 결과 저장
                }
            })
            .catch((error) => {
                console.error('Error fetching top 5 bids:', error);
            });
    };

    // 2차 입찰을 시작하는 함수
    const startSecondRound = () => {
        setSecondRoundStarted(true);
    };

    return (
        <div id="body">
            <div className="page">
                <div id="contents">
                    <div className="auction_detail_title">
                        <div className="auction_detail_text">경매 상세</div>
                    </div>
                    <div className="auction_detail_container">
                        {auction ? (
                            <>
                                <div>
                                    <img
                                        src={`http://localhost:8080/images/${auction.auctionImage}`}
                                        alt="상품 사진"
                                    />
                                </div>
                                <div className="auction_detail_item">
                                    <div className="item_title">{auction.auctionTitle}</div>
                                    <div className="item_origin">원산지 | 산골짜기</div>
                                    <div className="item_delivery">배송정보 | 무료배송, 08/09 도착예정</div>
                                    <div className="item_minbid">
                                        <div className="minbid_title">최소 입찰가</div>
                                        <div className="minbid_amount">{auction.auctionMinimumbid}원</div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <p>경매 정보를 불러오는 중입니다...</p>
                        )}
                    </div>

                    <div className="auction_detail_separator"></div>

                    <div className="auction_graphs_container">
                        {/* 1차 입찰 결과 표시 */}
                        {firstRoundBids.length > 0 && (
                            <div className="graph_section left">
                                <div className="graph_title">1차 입찰 결과 TOP 5</div>
                                <div className="graph">
                                    {firstRoundBids.map((bid, index) => (
                                        <div key={index} className={`bar bar${index + 1}`}>
                                            <div className="bar_value">{bid}원</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* 1차 + 2차 입찰 결과 표시 */}
                        {combinedBids.length > 0 && (
                            <div className="graph_section right">
                                <div className="graph_title">1차 + 2차 입찰 결과 TOP 5</div>
                                <div className="graph">
                                    {combinedBids.map((bid, index) => (
                                        <div key={index} className={`bar bar${index + 1}`}>
                                            <div className="bar_value">{bid}원</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="chat_container">
                        <div className="chat_box">
                            {chatMessages.map((msg, index) => (
                                <div key={index} className={`chat_message_wrapper`}>
                                    <div className="chat_username">{msg.user}</div>
                                    <div className="chat_message">{msg.message}</div>
                                    <div className="chat_time">{msg.time}</div>
                                </div>
                            ))}
                        </div>

                        {/* 입찰 종료 후 입력 금지 */}
                        {!auctionEnded ? (
                            <div className="chat_input_container">
                                <input
                                    type="text"
                                    className="chat_input"
                                    placeholder={secondRoundStarted ? "2차 입찰 금액을 입력하세요..." : "입찰 금액을 입력하세요..."}
                                    value={bidAmount}
                                    onChange={(e) => setBidAmount(e.target.value)}
                                />
                                <button className="chat_send_btn" onClick={handleSendBid}>
                                    {secondRoundStarted ? "2차 입찰" : "입찰"}
                                </button>
                            </div>
                        ) : (
                            <div className="auction_ended">경매가 종료되었습니다.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuctionDetail;
