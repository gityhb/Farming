import React, { useState, useEffect, useRef } from 'react';
import './auction_detail.css';
import './common/root.css';
import { useParams } from 'react-router-dom';

function AuctionDetail() {
    const { auctionId } = useParams(); // URL에서 auction_id를 가져옴
    const [auction, setAuction] = useState(null); // 경매 데이터를 저장할 상태
    const [timeLeft, setTimeLeft] = useState(15); // 15초
    const [isAuctionOver, setIsAuctionOver] = useState(false);
    const [chatMessages, setChatMessages] = useState([]);
    const [message, setMessage] = useState("");
    const chatBoxRef = useRef(null);

    // auction_id에 맞는 경매 항목 불러오기
    useEffect(() => {
        fetch(`/api/auction/items/${auctionId}`) // 경매 항목에 대한 API 요청
            .then(response => response.json())
            .then(data => setAuction(data))
            .catch(error => console.error('Error fetching auction data:', error));
    }, [auctionId]);

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

    const getCurrentTime = () => {
        const now = new Date();
        return now.toLocaleString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const handleSendMessage = () => {
        if (message.trim() !== "") {
            setChatMessages((prevMessages) => [
                ...prevMessages,
                { user: "You", text: message, time: getCurrentTime() }
            ]);
            setMessage("");

            // 2초 후에 상대방 메세지 자동으로 전송
            setTimeout(() => {
                setChatMessages((prevMessages) => [
                    ...prevMessages,
                    { user: "상대방", text: "1차 입찰 결과 입니다.\n01) 800,0000 \n02) 798,000 \n\n2차 입찰가를 입력해주세요.", time: getCurrentTime() }
                ]);
            }, 2000);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [chatMessages]);

    return (
        <div id="body">
            <div className="page">
                <div id="contents">
                    <div className="auction_detail_title">
                        <div className="auction_detail_text">경매 상세</div>
                    </div>
                    <div className="auction_detail_container">
                        {/* 경매 데이터가 로드되면 해당 정보를 표시 */}
                        {auction ? (
                            <>
                                <div>
                                    <img src={`http://localhost:8080/images/${auction.auctionImage}`} alt="상품 사진" />
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
                        <div className="auction_time"> 1차 {formatTime(timeLeft)}</div>
                        // <div className="auction_amount">
                        //     <div className="auction_amount_input">
                        //         <div className="auction_time"> 1차 {formatTime(timeLeft)}</div>
                        //         <div className={'auction_input_container'}>
                        //             <input type={'number'} className={'auction_amount_input_field'}
                        //                    placeholder={"입찰가 입력"} />
                        //             <div className="auction_amount_text"> 원</div>
                        //         </div>
                        //     </div>
                        //     <div className="auction_amount_btn">입찰하기</div>
                        // </div>
                    )}
                    <div className="chat_container">
                        <div className="chat_box" ref={chatBoxRef}>
                            <div
                                 className={`chat_message_wrapper other_message_wrapper`}>
                                    <div className="chat_username">사용자</div> {/* 상대방의 경우 닉네임 표시 */}
                                <div className={`chat_message other_message`}>
                                    경매를 시작합니다. 1차 입찰가를 입력해주세요.
                                </div>
                                <div className="chat_time">{getCurrentTime()}</div>
                                {/* 날짜와 시간 표시 */}
                            </div>
                            {chatMessages.map((msg, index) => (
                                <div key={index}
                                     className={`chat_message_wrapper ${msg.user === "You" ? "my_message_wrapper" : "other_message_wrapper"}`}>
                                    {msg.user !== "You" &&
                                        <div className="chat_username">{msg.user}</div>} {/* 상대방의 경우 닉네임 표시 */}
                                    <div
                                        className={`chat_message ${msg.user === "You" ? "my_message" : "other_message"}`}  style={{ whiteSpace: 'pre-wrap' }}>
                                        {msg.text}
                                    </div>
                                    <div className="chat_time">{msg.time}</div>
                                    {/* 날짜와 시간 표시 */}
                                </div>
                            ))}
                        </div>
                        <div className="chat_input_container">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="chat_input"
                                placeholder="메세지를 입력하세요..."
                                onKeyDown={handleKeyPress}
                            />
                            <button onClick={handleSendMessage} className="chat_send_btn">전송</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuctionDetail;
