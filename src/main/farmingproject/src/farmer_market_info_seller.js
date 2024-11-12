import React, {useState, useEffect} from "react";
import  './farmer_market_info.css';
import './common/root.css';
import {useUser} from "./common/userContext";
import {useParams} from "react-router-dom";
import FarmerReviewModal from "./farmer_market_review_modal";

function Farmer_market_info_seller() {

    const { user } = useUser();
    const { productId } = useParams();

    const [product, setProduct] = useState(null);
    const [activeTab, setActiveTab] = useState('pdinfo');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reviewCounts, setReviewCounts] = useState({});
    const [reviews, setReviews] = useState([]);
    const [sellerComment, setSellerComment] = useState('');
    const [showCommentInput, setShowCommentInput] = useState(false);
    const [statistics, setStatistics] = useState({ taste: 0, fresh: 0, package: 0 });
    const [sortBy, setSortBy] = useState('date');
    const [orders, setOrders] = useState([]);
    const [inquiryContent, setInquiryContent] = useState('');
    const [qnaList, setQnaList] = useState([]);
    const [selectedQnaId, setSelectedQnaId] = useState(null); // 선택된 QNA의 ID

    const openModal = (qnaId) => {
        setSelectedQnaId(qnaId);
        console.log("Selected QNA ID for reply:", qnaId); // Log to verify
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setInquiryContent("");
    };

    const handleReplyClick = (reviewId) => {
        setShowCommentInput(prev => ({
            ...prev,
            [reviewId]: !prev[reviewId]
        }));
    };

    /* 리뷰 막대바 */
    const fetchReviewStatistics = async () => {
        try {
            const response = await fetch(`/api/reviews/statistics/${productId}`);
            if (!response.ok) {
                if (response.status === 500) {
                    console.error('Server error occurred while fetching review statistics');
                    // 사용자에게 서버 오류 메시지를 표시할 수 있습니다.
                    return;
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setStatistics(data);
        } catch (error) {
            console.error('Error fetching review statistics:', error.message);
        }
    };

    // 상품문의 가져오기
    const fetchQNAs = async () => {
        try {
            const response = await fetch(`/api/qna/product/${productId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data); // 데이터를 확인합니다.
            setQnaList(data);
        } catch (error) {
            console.error('Error fetching QNAs:', error);
        }
    };
    
    useEffect(() => {
        fetchProductDetails();
        fetchReviews();
        fetchReviewCounts();
        fetchReviewStatistics();
        sortReviews();
        fetchOrders();
        fetchQNAs();
    }, [productId, sortBy]);

    /*상품정보 가져오기*/
    const fetchProductDetails = async () => {
        try {
            console.log(`Fetching product details for ID: ${productId}`);
            const response = await fetch(`/api/productRG/${productId}`);
            console.log('Response status:', response.status);
            if (response.ok) {
                const data = await response.json();
                console.log('Received data:', data);
                setProduct(data);
            } else {
                console.error('상품 정보 가져오기 실패');
                const errorText = await response.text();
                console.error('Error response:', errorText);
            }
        } catch (error) {
            console.error('상품 정보 가져오는 중 오류 발생:', error);
        }
    };

    /*주문정보 가져오기*/
    const fetchOrders = async () => {
        try {
            const response = await fetch(`/api/orders/product/${productId}`);
            if (response.ok) {
                const data = await response.json();
                console.log('Orders Data:', data);  // 확인용
                setOrders(data);  // 주문 정보 상태 업데이트
            } else {
                console.error('주문 정보 가져오기 실패');
            }
        } catch (error) {
            console.error('주문 데이터 가져오기 실패:', error);
        }
    };

    /*배송상태 업데이트*/
    const updateDeliveryStatus = async (orderItemId, status) => {
        try {
            const response = await fetch(`/api/orderItems/${orderItemId}/deliveryStatus?deliveryStatus=${status}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('배송 상태 업데이트에 실패했습니다');
            }
            fetchOrders(); // 상태 업데이트 후 주문 목록 새로고침
        } catch (error) {
            console.error('배송 상태 업데이트 실패:', error);
        }
        alert('배송상태가 변경되었습니다.');
    };


    /*리뷰 가져오기*/
    const fetchReviews = async () => {
        try {
            const response = await fetch(`/api/reviews/product/${productId}`);
            if (response.ok) {
                const data = await response.json();
                setReviews(data);
            } else {
                console.error('리뷰 가져오기 실패');
            }
        } catch (error) {
            console.error('리뷰 가져오는 중 오류 발생:', error);
        }
    };

    /* 리뷰 정렬 */
    const sortReviews = async () => {
        try {
            const response = await fetch(`/api/reviews/product/${productId}/sorted?sortBy=${sortBy}`);
            if (!response.ok) {
                throw new Error('Failed to fetch reviews');
            }
            const data = await response.json();
            setReviews(data);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    /*리뷰갯수*/
    const fetchReviewCounts = async () => {
        try {
            const response = await fetch('/api/productRG/review-counts');
            if (response.ok) {
                const data = await response.json();
                setReviewCounts(data);
            } else {
                console.error('리뷰 갯수 가져오기 실패');
            }
        } catch (error) {
            console.error('리뷰 갯수 가져오는 중 오류 발생:', error);
        }
    };

    /* 답글 */
    const submitSellerComment = async (reviewId) => {
        try {
            const response = await fetch(`/api/reviews/${reviewId}/sellercomment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ sellerComment }),
            });
            if (response.ok) {
                // 리뷰 목록을 다시 불러오거나 상태를 업데이트
                fetchReviews();
                setShowCommentInput(false);
                setSellerComment('');
            } else {
                console.error('답글 저장 실패');
            }
        } catch (error) {
            console.error('답글 저장 중 오류 발생:', error);
        }
        alert('답글이 작성되었습니다.');
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    /* 별점에 따라 별 채워지게 하기*/
    const RatingStars = ({ rating }) => {
        const percentage = (rating / 5) * 100;

        return (
            <div className="rating_summary">
                <div className="rating_stars">
                    <div className="rating_stars_bg">★★★★★</div>
                    <div className="rating_stars_fg" style={{ width: `${percentage}%` }}>★★★★★</div>
                </div>
                <p className="rating_score_primary">{rating.toFixed(1)}/</p>
                <p className="rating_score_secondary">5 ({reviewCounts[product.productId] || 0})</p>
            </div>
        );
    };

    const getPDeliveryDate = (deliveryDate) => {
        switch (deliveryDate) {
            case 'today' :
                return '오늘 배송';
            case 'tomorrow' :
                return '내일 배송';
            case 'etc' :
                return '상시 배송';
            default :
                return '배송 정보 없음';
        }
    };

    //리뷰 별
    const ReviewStars = ({ star }) => {
        return (
            <div className="review_star">
                <span className="review_stars_bg">★★★★★</span>
                <span className="review_stars_fg">{"★".repeat(star)}</span>
            </div>
        );
    };

    // 날짜 형식을 변경하는 함수
    const formatDate = (review) => {
        if (!review || !review.reviewAt) return ''; // 리뷰나 날짜가 없는 경우 처리

        const date = new Date(review.reviewAt);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}`;
    };

    // 문의답변 등록
    const qnaSubmit = async () => {
        try {
            const response = await fetch(`/api/qna/${selectedQnaId}/reply`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    qnaAnswer: inquiryContent,
                }),
            });

            console.log("응답 상태 코드:", response.status); // 상태 코드 확인
            console.log("응답 본문:", await response.text()); // 응답 본문 출력

            if (!response.ok) {
                throw new Error("답변 제출 실패");
            }

            fetchQNAs(); // QNA 목록 새로고침
            closeModal(); // 모달 닫기
        } catch (error) {
            console.error("QNA 답변 제출 오류:", error);
            fetchQNAs();
            closeModal(); // 모달 닫기
        }
    };





    return (
        <div id={'body'}>
            <div id={'market_farmer_info_page'} className={'page'}>
                <div id={'contents'}>
                    <div id={'search_box'}>
                        <input type={'text'} id={'search_query'} placeholder={'검색 내용을 입력하세요'}/>
                        <button id={'search_btn'}><img src="/img/etc/search.png" alt={"search_btn"}/></button>
                    </div>
                    <div className={'product_detail'}>
                        <div className={'left_area'} style={{height: '350px'}}>
                            <div className={'pd_img'}>
                                <img src={`/${product.productimgPath}`} alt={product.productimgPath}/>
                            </div>
                        </div>
                        <div className={'right_area'} style={{height: '350px'}}>
                            <div className={'pd_info'}>
                                <div className={'pd_title'}>
                                    <div className={'pd_name'}>
                                        <p>{product.productName}</p>
                                    </div>
                                    <div className={'pd_like'}>
                                        <img src={'/img/etc/like_blank.png'}/>
                                    </div>
                                </div>
                                <div className={'pd_value'}>
                                    <span className={'pd_price'}>{product.productPrice3.toLocaleString()}</span>
                                    <span className={'pd_price'}>원 </span>
                                    <span className={'pd_rate'}>{product.salenum}</span>
                                    <span className={'pd_rate'}>%</span>
                                </div>
                                <div className={'pd_star'}>
                                    <img src={'/img/etc/star.png'}/>
                                    <span>{product.astar.toFixed(1)}</span>
                                </div>
                                <div className={'pd_origin'}>
                                    <span>원산지 | </span>
                                    <span>{product.productOrigin}</span>
                                </div>
                                <div className={'pd_deliver'}>
                                    <span>배송정보 | </span>
                                    <span>{getPDeliveryDate(product.productDeliveryDate)} </span>
                                    {/*<span> , </span>
                                    <span>05/07</span>*/}
                                    <span>예정</span>
                                </div>
                                <div className={'pd_purchase_cnt'}>
                                    <span>구매건수 | </span>
                                    <span>{product.sellcount}</span>
                                    <span>건</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={'product_detail_more_area'}>
                        <ul className={'product_detail_tab'}>
                            <li id={'orderdetails'} className={activeTab === 'orderdetails' ? 'active' : ''}
                                onClick={() => setActiveTab('orderdetails')}>주문내역
                            </li>

                            <li id={'pdinfo'} className={activeTab === 'pdinfo' ? 'active' : ''}
                                onClick={() => setActiveTab('pdinfo')}>상품상세
                            </li>
                            <li id={'reviewinfo'} className={activeTab === 'reviewinfo' ? 'active' : ''}
                                onClick={() => setActiveTab('reviewinfo')}>리뷰
                            </li>
                            <li id={'questioninfo'} className={activeTab === 'questioninfo' ? 'active' : ''}
                                onClick={() => setActiveTab('questioninfo')}>상품문의
                            </li>
                            <li id={'deliveryinfo'} className={activeTab === 'deliveryinfo' ? 'active' : ''}
                                onClick={() => setActiveTab('deliveryinfo')}>배송/교환/반품
                            </li>
                        </ul>

                        <div className={'product_detail_info_area'}>

                            {/* 주문 정보 테이블 */}
                            {activeTab === 'orderdetails' && (
                                <div className="table_container">
                                    <table className="table_seller">
                                        <thead>
                                        <tr>
                                            <th>주문자</th>
                                            <th>연락처</th>
                                            <th>주소</th>
                                            <th>주문 날짜</th>
                                            <th>수량</th>
                                            <th>배송 상태</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {Array.isArray(orders) && orders.length > 0 ? (
                                            orders.map(order => (
                                                // orderItem이 객체라면, 아래와 같이 직접 접근합니다.
                                                <tr key={order.orderId}>
                                                    <td>{order.userName}</td>
                                                    <td>{order.userPhone}</td>
                                                    <td>{order.userAddress}</td>
                                                    <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                                                    <td>{order.orderItem.quantity}</td>
                                                    <td>
                                                        <select
                                                            value={order.orderItem.deliveryStatus}
                                                            onChange={(e) => updateDeliveryStatus(order.orderItem.orderItemId, e.target.value)}
                                                        >
                                                            <option value="결제완료">결제완료</option>
                                                            <option value="배송준비">배송준비</option>
                                                            <option value="배송중">배송중</option>
                                                            <option value="배송완료">배송완료</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6">주문 내역이 없습니다.</td>
                                            </tr>
                                        )}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            {/* 상품정보 상세페이지 (이미지화 예정)
                                <img src={`/${product.productInfoimgPath}`} alt={product.productInfoimgPath}/>
                            */}
                            {activeTab === 'pdinfo' && (
                                <img style={{width: '1000px'}} src={`/${product.productInfoimgPath}`}
                                     alt={product.productInfoimgPath}/>
                            )}

                            {/* 리뷰 */}
                            {activeTab === 'reviewinfo' && (
                                <div className={'product_detail_info'}>
                                    <div className="product_review">
                                        <div className="profile_card">
                                            <div className="profile_img">
                                                <img src="/img/etc/user.png"/>
                                            </div>

                                            <div className="profile_info">
                                                <p className="profile_name">{product.storeName}</p>
                                                {/*<p className="profile_followers"></p>*/}
                                            </div>
                                        </div>
                                    </div>
                                    <RatingStars rating={product.astar}/>

                                    <div className="rating_container">
                                        <div className="rating_row">
                                            <span className="rating_label">맛</span>
                                            <span className="rating_text">맛있어요</span>
                                            <div className="rating_bar">
                                                <div className="rating_fill"
                                                     style={{width: `${statistics.taste}%`}}></div>
                                            </div>
                                            <span className="rating_percent">{statistics.taste.toFixed(1)}%</span>
                                        </div>
                                        <div className="rating_row">
                                            <span className="rating_label">신선도</span>
                                            <span className="rating_text">신선해요</span>
                                            <div className="rating_bar">
                                                <div className="rating_fill"
                                                     style={{width: `${statistics.fresh}%`}}></div>
                                            </div>
                                            <span className="rating_percent">{statistics.fresh.toFixed(1)}%</span>
                                        </div>
                                        <div className="rating_row">
                                            <span className="rating_label">포장</span>
                                            <span className="rating_text">꼼꼼해요</span>
                                            <div className="rating_bar">
                                                <div className="rating_fill"
                                                     style={{width: `${statistics.package}%`}}></div>
                                            </div>
                                            <span className="rating_percent">{statistics.package.toFixed(1)}%</span>
                                        </div>
                                    </div>

                                    <div className="review_section">
                                        <div className="review_header">
                                            <h2>리뷰 <span>({reviewCounts[product.productId] || 0}건)</span></h2>

                                            <div className="review_ranking_options">
                                                <span
                                                    onClick={() => setSortBy('date')}>최신순 |</span>
                                                <span
                                                    onClick={() => setSortBy('starDesc')}>평점 높은 순 |</span>
                                                <span
                                                    onClick={() => setSortBy('starAsc')}>평점 낮은 순</span>
                                            </div>

                                        </div>
                                        {reviews.map(review => (
                                            <div key={review.id} className="review_body">
                                                <div className="review_content">
                                                    <div className="review_star">
                                                        <ReviewStars star={review.star}/>
                                                    </div>
                                                    <div className="review_info">
                                                        <span className="review_user">{review.name}</span>
                                                        <span className="review_date">{formatDate(review)}</span>
                                                        <p className="review_text">
                                                            <span className="review_title">맛</span> <span
                                                            className="review_detail">{review.taste}</span>
                                                            <span className="review_title">신선도</span> <span
                                                            className="review_detail">{review.fresh}</span>
                                                            <span className="review_title">포장</span> <span
                                                            className="review_detail">{review.packageQuality}</span><br/>
                                                            <span
                                                                className="review_text_detail">{review.reviewDetail}</span>
                                                        </p>
                                                        <button
                                                            className={'reply_submit_btn'}
                                                            onClick={() => handleReplyClick(review.reviewId)}
                                                        >
                                                            답글 남기기
                                                        </button>
                                                        {showCommentInput[review.reviewId] && (
                                                            <div className="seller_reply_input">
                                                                <textarea
                                                                    value={sellerComment}
                                                                    onChange={(e) => setSellerComment(e.target.value)}
                                                                    placeholder="답글을 입력하세요"
                                                                />
                                                                <button className={'reply_save_btn'}
                                                                        onClick={() => submitSellerComment(review.reviewId)}>답글
                                                                    저장
                                                                </button>
                                                            </div>
                                                        )}
                                                        {review.sellerComment && (
                                                            <div className="seller_reply">
                                                                <div className="seller_reply_header">
                                                                    <span
                                                                        className="seller_reply_user">{product.storeName}</span>
                                                                </div>
                                                                <span
                                                                    className="seller_reply_detail">{review.sellerComment}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* 상품문의 */}
                            {activeTab === 'questioninfo' && (
                                <div className={'product_detail_info'}>
                                    <div className="notice">
                                        <ul>
                                            <li>구매한 상품의 취소 / 반품은 구매내역 신청에서 가능합니다.</li>
                                            <li>상품 문의 및 리뷰를 통해 취소나 환불, 반품 등은 처리되지 않습니다.</li>
                                            <li>가격, 판매자, 교환/환불 및 배송 등 해당 상품 자체와 관련 없는 문의는 고객센터 문의하기를 이용해 주세요.</li>
                                            <li>“해당 상품 자체”와 관계없는 글, 양도, 광고성, 욕설, 비방, 도배 등의 글은 예고없이 삭제조치가 취해질 수 있습니다.
                                            </li>
                                            <li>공개 게시판이므로 전화번호, 메일 주소 등 고객님의 개인정보는 절대 남기지 말아주세요.</li>
                                        </ul>
                                    </div>

                                    <div className="table_container">
                                        <table className="table_consumer">
                                            <thead>
                                            <tr>
                                                <th>Q / A</th>
                                                <th>작성자</th>
                                                <th>문의 내용</th>
                                                <th>작성일</th>
                                                <th>답변 상태</th>
                                                <th>답변하기</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {qnaList && qnaList.length > 0 ? (
                                                qnaList.map((qna) => (
                                                    <React.Fragment key={qna.qnaId}>
                                                        <tr>
                                                            <td>Q</td>
                                                            <td>{qna.user.username}</td>
                                                            <td>{qna.qnaContent}</td>
                                                            <td>{new Date(qna.qnaAt).toLocaleDateString()}</td>
                                                            <td>{qna.qnaStatus}</td>
                                                            <td>
                                                                {/* 답변하기 버튼 */}
                                                                {qna.qnaStatus === "답변대기" && (
                                                                    <button
                                                                        onClick={() => openModal(qna.qnaId)}>답변하기</button>
                                                                )}
                                                            </td>
                                                        </tr>
                                                        {qna.qnaAnswer && (
                                                            <tr>
                                                                <td>↳ A</td>
                                                                <td>판매자</td>
                                                                <td>{qna.qnaAnswer}</td>
                                                                <td>{new Date(qna.qnaAt).toLocaleDateString()}</td>
                                                            </tr>
                                                        )}
                                                    </React.Fragment>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="5"></td>
                                                </tr>
                                            )}
                                            </tbody>
                                        </table>
                                    </div>
                                    {isModalOpen && (
                                        <div className="modal">
                                            <div className="container">
                                                <div className="header">
                                                    <h2>상품 문의 답변</h2>
                                                </div>
                                                <textarea className={"product_ask_reply"} placeholder="문의에 대한 답변을 입력하세요."
                                                          value={inquiryContent}
                                                          onChange={(e) => setInquiryContent(e.target.value)}></textarea>
                                                <div className="response_message">
                                                    <span>문의하신 내용에 대한 답변은 해당 상품의 상세페이지에서 확인하실 수 있습니다.</span>
                                                </div>
                                                <div className="button_container">
                                                    <button className="cancel_button" onClick={closeModal}>취소</button>
                                                    <button className="submit_button" onClick={qnaSubmit}>등록</button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}


                            {activeTab === 'deliveryinfo' && (
                                <div className={'product_detail_info'}>
                                    <div className="exchange_info">
                                        <h3>교환 / 반품 정보</h3>
                                        <div className="exchange_info_line"/>
                                        <ul>
                                            <li><span>반품배송비 (편도) :</span> 3,000원 (최초 배송비 미포함시 6,000원 부과)</li>
                                            <li><span>교환배송비 (왕복) :</span> 6,000원</li>
                                            <li>단, 교환 / 반품 배송은 상품 및 교환 / 반품 사유에 따라 변동될 수 있으므로 교환/반품 신청 화면 확인 부탁드립니다.
                                            </li>
                                        </ul>

                                        <h3>교환 / 반품 사유에 따른 요청 가능 기간</h3>
                                        <div className="exchange_info_line"/>
                                        <ul>
                                            <li>구매자 단순 변심 : 상품 수령 후 7일 이내 (구매자 반품 배송비 부담)</li>
                                            <li>표시/광고와 상이, 계약 내용과 다르게 이행된 경우 : 상품 수령 후 3개월 이내 혹은 표시/광고와 다름을 안 날로부터 30일
                                                이내 (판매자 반품 배송비 부담)
                                            </li>
                                        </ul>

                                        <h3>교환 / 반품 불가능 경우</h3>
                                        <div className="exchange_info_line"/>
                                        <ul>
                                            <li>교환 / 반품 요청이 기간이 지난 경우</li>
                                            <li>소비자의 책임 있는 사유로 상품 등이 분실/파손/훼손된 경우 (단, 확인을 위한 포장 훼손 제외)</li>
                                            <li>소비자의 사용 / 소비에 의해 상품 등의 가치가 현저히 감소한 경우</li>
                                            <li>시간의 경과에 의해 재판매가 곤란할 정도로 상품 등의 가치가 현저히 감소한 경우</li>
                                        </ul>

                                        <h3>거래 조건에 대한 정보</h3>
                                        <div className="exchange_info_line"/>
                                        <ul>
                                            <li>‘전자상거래 등에서의 소비자보호에 관한 법률’이 정하는 바에 따라 소비자의 청약 철회 후 판매자가 재화 등을 반환 받은 날로부터
                                                3영업일 이내에 지급받은 대금의 환급을 명령할 수 있으며, 소비자는 청약철회 등에 따른 상품 반품 및 환불에 소요되는 비용을
                                                부담해야 합니다.
                                            </li>
                                            <li>소화물 택배의 배송은 발송일로부터 1~2영업일이 소요되나, 지역/대행 화물/설치 예약/배송지 제한 등의 특이사항에 따라 배송
                                                기간은 달라질 수 있습니다.
                                            </li>
                                        </ul>

                                        <h3>주의사항</h3>
                                        <div className="exchange_info_line"/>
                                        <ul>
                                            <li>전자상거래 등에서 소비자보호법에 관한 법률에 의거하여 미성년자가 물품을 구매하는 경우, 법정대리인이 동의하지 않으면 미성년자 본인
                                                및 법정대리인이 구매를 취소할 수 있습니다.
                                            </li>
                                            <li>결제 시 유의사항을 반드시 확인해주시기 바랍니다. 구입한 상품과 상이한 상품을 받는 등 불가피한 상황이 발생할 수 있으며, 이로
                                                인해 발생하는 책임을 지지 않습니다.
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Farmer_market_info_seller;