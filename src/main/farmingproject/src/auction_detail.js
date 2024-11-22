import React, { useState, useEffect } from 'react';
import './auction_detail.css';
import './common/root.css';
import { useParams } from 'react-router-dom';
import { useUser } from './common/userContext';

function AuctionDetail() {
    const { user } = useUser();
    const [loggedInUserId, setLoggedInUserId] = useState(null);
    const { auctionId } = useParams();// URL에서 auction_id를 가져옴
    const [auction, setAuction] = useState(null);// 경매 데이터를 저장할 상태
    const [bidAmount, setBidAmount] = useState('');// 입력된 입찰 금액을 저장할 상태
    const [chatMessages, setChatMessages] = useState([]);// 채팅 메시지 상태
    const [firstRoundBids, setFirstRoundBids] = useState([]);// 1차 입찰 결과
    const [combinedBids, setCombinedBids] = useState([]);// 1차 + 2차 결과를 저장할 상태
    const [firstRoundCompleted, setFirstRoundCompleted] = useState(false);// 1차 입찰 완료 여부
    const [secondRoundStarted, setSecondRoundStarted] = useState(false);// 2차 입찰 여부를 저장할 상태
    const [auctionEnded, setAuctionEnded] = useState(false); // 경매 종료 상태
    const [remainingTime, setRemainingTime] = useState(10);// 남은 시간을 10초로 설정
    const [firstRoundBidMade, setFirstRoundBidMade] = useState(false);
    const [secondRoundBidMade, setSecondRoundBidMade] = useState(false);

    // auction_id에 맞는 경매 항목 불러오기
    useEffect(() => {
        fetch(`/api/auction/items/${auctionId}`)// 경매 항목에 대한 API 요청
            .then((response) => response.json())
            .then((data) => setAuction(data))
            .catch((error) => console.error('경매 데이터를 불러오는 중 오류:', error));
    }, [auctionId]);

    // 사용자의 정보를 가져오는 useEffect
    useEffect(() => {
        fetch('/api/user')// 서버에서 사용자의 정보를 불러오는 API 호출
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
                console.error('사용자 정보를 불러오는 중 오류:', error);
            });
    }, []);

    // 남은 시간을 업데이트하는 타이머
    useEffect(() => {
        if (!auctionEnded && remainingTime > 0) {
            const timer = setInterval(() => {
                setRemainingTime((prevTime) => prevTime - 1);
            }, 1000);

            return () => clearInterval(timer);
        }

        if (remainingTime === 0) {
            if (!firstRoundCompleted) {
                fetchTop5Results('first');
                setFirstRoundCompleted(true);
                setSecondRoundStarted(true);
                setChatMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        user: '관리자',
                        message: '2차 입찰 금액을 입력하세요.',
                        time: new Date().toLocaleTimeString(),
                    },
                ]);
                setRemainingTime(10);
            } else if (firstRoundCompleted && secondRoundStarted) {
                fetchTop5Results('combined');
                setAuctionEnded(true); // 경매 종료 상태 설정
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

    const handleSendBid = () => {
        if (firstRoundCompleted && !secondRoundStarted) {
            setChatMessages((prevMessages) => [
                ...prevMessages,
                {
                    user: '관리자',
                    message: '2차 입찰이 아직 시작되지 않았습니다.',
                    time: new Date().toLocaleTimeString(),
                },
            ]);
            return;
        }

        if (!secondRoundStarted && firstRoundBidMade) {
            setChatMessages((prevMessages) => [
                ...prevMessages,
                {
                    user: '관리자',
                    message: '1차 입찰은 한 번만 가능합니다.',
                    time: new Date().toLocaleTimeString(),
                },
            ]);
            return;
        }

        if (secondRoundStarted && secondRoundBidMade) {
            setChatMessages((prevMessages) => [
                ...prevMessages,
                {
                    user: '관리자',
                    message: '2차 입찰은 한 번만 가능합니다.',
                    time: new Date().toLocaleTimeString(),
                },
            ]);
            return;
        }

        if (!bidAmount || isNaN(bidAmount)) {
            setChatMessages((prevMessages) => [
                ...prevMessages,
                {
                    user: '관리자',
                    message: '유효한 금액을 입력하세요.',
                    time: new Date().toLocaleTimeString(),
                },
            ]);
            return;
        }

        if (parseFloat(bidAmount) < auction.auctionMinimumbid) {
            setChatMessages((prevMessages) => [
                ...prevMessages,
                {
                    user: '관리자',
                    message: `최소 입찰가는 ${auction.auctionMinimumbid}원입니다. 다시 확인해주세요.`,
                    time: new Date().toLocaleTimeString(),
                },
            ]);
            return;
        }

        fetch('/api/auctionbid', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                auctionId: auctionId,
                userId: loggedInUserId,
                auctionBidAmount: parseFloat(bidAmount),
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                setChatMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        user: loggedInUserId,
                        message: `입찰가: ${bidAmount}원`,
                        time: new Date().toLocaleTimeString(),
                        isUserMessage: true,
                    },
                ]);

                setBidAmount('');
                if (!firstRoundCompleted) {
                    setFirstRoundBidMade(true);
                } else if (secondRoundStarted) {
                    setSecondRoundBidMade(true);
                }
            })
            .catch((error) => {
                console.error('입찰 전송 중 오류:', error);
            });
    };

    const fetchTop5Results = (type) => {
        fetch(`/api/auctionbid/top5/${auctionId}`)
            .then((response) => response.json())
            .then((data) => {
                if (type === 'first') {
                    setFirstRoundBids(data);
                } else if (type === 'combined') {
                    setCombinedBids(data);
                }
            })
            .catch((error) => {
                console.error('상위 5개 입찰 데이터를 불러오는 중 오류:', error);
            });
    };

    return (
        <div id="body">
            <div className="page">
                <div id="contents">
                    <div className="auction_detail_title">
                        <div className="main_title"><h1 style={{ textAlign: 'center' }}>경매 상세</h1></div>
                    </div>
                    <div className="auction_detail_container">
                        {auction ? (
                            <>
                                <div>
                                    <img
                                        src={`${auction.auctionImage}`}
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
                    {!auctionEnded && (
                        <div className="remaining_time">
                            남은 시간 : {remainingTime}초
                        </div>
                    )}

                    {/* 경매가 종료되지 않은 경우에만 채팅 및 입찰창 표시 */}
                    {!auctionEnded && (
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
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AuctionDetail;
