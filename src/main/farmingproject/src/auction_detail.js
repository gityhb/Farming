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
    const [remainingTime, setRemainingTime] = useState(10); // 남은 시간을 10초로 설정

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
                // 사용자가 불러와진 후에 '관리자' 메시지를 추가
                setChatMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        user: '관리자',
                        message: '1차 입찰 금액을 입력하세요.',
                        time: new Date().toLocaleTimeString(),
                    },
                ]);
            })
            .catch((error) => {
                console.error('Error fetching user info:', error);
            });
    }, []);

    // 남은 시간을 업데이트하는 타이머
    useEffect(() => {
        if (!auctionEnded && remainingTime > 0) {
            const timer = setInterval(() => {
                setRemainingTime((prevTime) => prevTime - 1);
            }, 1000);

            return () => clearInterval(timer); // 타이머 정리
        }

        // 남은 시간이 0이 되면 입찰 라운드를 종료
        if (remainingTime === 0) {
            if (!firstRoundCompleted) {
                // 1차 입찰 종료
                fetchTop5Results('first'); // 1차 결과를 가져옴
                setFirstRoundCompleted(true); // 1차 완료 상태 업데이트
                setSecondRoundStarted(true); // 2차 입찰 시작
                setChatMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        user: '관리자',
                        message: '2차 입찰 금액을 입력하세요.',
                        time: new Date().toLocaleTimeString(),
                    },
                ]);
                setRemainingTime(10); // 2차 입찰을 위해 타이머 리셋 (10초로 설정)
            } else if (firstRoundCompleted && secondRoundStarted) {
                // 2차 입찰 종료
                fetchTop5Results('combined'); // 최종 결과를 가져옴
                setAuctionEnded(true); // 경매 종료
                setChatMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        user: '관리자',
                        message: '경매가 종료되었습니다.',
                        time: new Date().toLocaleTimeString(),
                    },
                ]);
            }
        }
    }, [remainingTime, auctionEnded, firstRoundCompleted, secondRoundStarted]);

    // 입찰 금액을 서버에 보내는 함수
    const handleSendBid = () => {
        // 유효하지 않은 금액일 경우
        if (!bidAmount || isNaN(bidAmount)) {
            // 관리자가 유효한 금액을 입력하라고 채팅창에 메시지 추가
            setChatMessages((prevMessages) => [
                ...prevMessages,
                {
                    user: '관리자',
                    message: '유효한 금액을 입력하세요.',
                    time: new Date().toLocaleTimeString(),
                },
            ]);
            return; // 입찰을 처리하지 않고 함수 종료
        }

        // 최소 입찰가 확인
        if (parseFloat(bidAmount) < auction.auctionMinimumbid) {
            // 최소 입찰가보다 낮으면 채팅창에 경고 메시지를 추가
            setChatMessages((prevMessages) => [
                ...prevMessages,
                {
                    user: '관리자',
                    message: `최소 입찰가는 ${auction.auctionMinimumbid}원입니다. 다시 확인해주세요.`,
                    time: new Date().toLocaleTimeString(),
                },
            ]);
            return; // 입찰을 처리하지 않고 함수 종료
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
                        user: loggedInUserId, // 사용자 ID 추가
                        message: `입찰가: ${bidAmount}원`,
                        time: new Date().toLocaleTimeString(),
                        isUserMessage: true, // 사용자 메시지 여부를 표시
                    },
                ]);

                setBidAmount(''); // 입력 필드 초기화
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
                } else if (type === 'combined') {
                    setCombinedBids(data); // 1차 + 2차 결과 저장
                }
            })
            .catch((error) => {
                console.error('Error fetching top 5 bids:', error);
            });
    };

    return (
        <div id="body">
            <div className="page">
                <div id="contents">
                    <div className="auction_detail_title">
                        <div className="main_title"><h1 style={{textAlign: 'center'}}>경매 상세</h1></div>
                    </div>
                    <div className="auction_detail_container">
                        {auction ? (
                            <>
                                <div>
                                    <img
                                        src={`http://localhost:8080/uploads/auction_images/${auction.auctionImage}`}
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
                    {/* 남은 시간 표시 */}
                    {!auctionEnded && (
                        <div className="remaining_time">
                            남은 시간 : {remainingTime}초
                        </div>
                    )}

                    <div className="chat_container">
                        <div className="chat_box">
                            {chatMessages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`chat_message_wrapper ${msg.isUserMessage ? 'my_message_wrapper' : ''}`}
                                >
                                    <div className="chat_username">{msg.user}</div>
                                    <div
                                        className={`chat_message ${msg.isUserMessage ? 'my_message' : 'other_message'}`}>
                                        {msg.message}
                                    </div>
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
                                    placeholder={secondRoundStarted ? '2차 입찰 금액을 입력하세요...' : '입찰 금액을 입력하세요...'}
                                    value={bidAmount}
                                    onChange={(e) => setBidAmount(e.target.value)}
                                />
                                <button className="chat_send_btn" onClick={handleSendBid}>
                                    {secondRoundStarted ? '2차 입찰' : '입찰'}
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
