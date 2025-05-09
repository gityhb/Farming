import React, {useEffect, useState} from 'react';
import './mypage.css';
import {useUser} from "./common/userContext";
import {Link} from 'react-router-dom';

function MyPage(){
    const { user } = useUser();
    const [likedProducts, setLikedProducts] = useState([]);
    const [statusCount, setStatusCount] = useState({
        결제완료: 0,
        배송준비중: 0,
        배송중: 0,
        배송완료: 0
    });
    
    useEffect(() => {
        if (user && user.id) {
            fetchLikedProducts(user.id);
            fetchDeliveryStatusCount(user.id);
        }
    }, [user]);

    const fetchLikedProducts = async (userId) => {
        try {
            const response = await fetch(`/api/productRG/user/${userId}/likes`);
            if (response.ok) {
                const data = await response.json();
                console.log("좋아요 목록:", data);  // 여기서 좋아요 목록 콘솔에 출력
                setLikedProducts(data);
            } else {
                const errorData = await response.json();
                console.error('좋아요 목록 가져오기 실패:', errorData);
                console.log(userId)
            }
        } catch (error) {
            console.error('좋아요 목록을 가져오는 중 오류 발생:', error);
        }
    };

    //배송상태 카운트
    const fetchDeliveryStatusCount = async (userId) => {
        try {
            const response = await fetch(`/api/orderItems/delivery-status-count/${userId}`);
            if (!response.ok) {
                throw new Error('서버 응답이 실패했습니다');
            }
            const data = await response.json();
            setStatusCount(data);
        } catch (error) {
            console.error('배송 상태 카운트 가져오기 실패:', error);
        }
    };


    return(
        <div className="mypage">
            <div className="title_component">
                <div className="title">
                    마이페이지
                </div>
            </div>
            <div className="delivery_component">
                <div className="hello">
                    <img src="/img/etc/user.png" style={{width: '50px', height: '50px'}}/>
                    <div className="hello_text">
                        {user ? `${user.name}님, 반갑습니다.` : "로그인해주세요."}
                    </div>
                </div>
                <div className="delivery_detail">
                    <div className="detail_item">
                        <div className="item_1">
                            {statusCount.결제완료}<br/>
                        </div>
                        <div className="item_2">
                            결제완료
                        </div>
                    </div>
                    <div className="detail_item">
                        <div className="item_3">
                            {statusCount.배송준비중}<br/>
                        </div>
                        <div className="item_4">
                            배송준비중
                        </div>
                    </div>
                    <div className="detail_item">
                        <div className="item_5">
                            {statusCount.배송중}<br/>
                        </div>
                        <div className="item_6">
                            배송중
                        </div>
                    </div>
                    <div className="detail_item">
                        <div className="item_7">
                            {statusCount.배송완료}<br/>
                        </div>
                        <div className="item_8">
                            배송완료
                        </div>
                    </div>
                </div>
            </div>
            {/*delivery_detail*/}
            <div className="like_list_container">
                <div className="like_text_content">
                    <div className="like_text">좋아요 목록</div>
                    <div className="more">더보기 ></div>
                </div>
                <div className="like_separator"></div>
                <div className="like_container">
                    {likedProducts.slice(0, 3).map((product) => (
                        <Link to={`/farmer_market_info/${product.productId}`}>
                        <div key={product.productId} className="like_content">
                            {/* 상품 이미지 경로가 product.productImg인 경우 */}
                            <img src={product.productimgPath} alt={product.productName}/>
                        </div>
                        </Link>
                    ))}
                </div>
                <div className="like_separator"></div>
            </div>


            <div className="info_qna">
                <div className="my_info_container">
                    <div className="my_info">
                        내정보
                    </div>
                    <div className="like_separator_1"></div>
                    <div className="my_info_item">
                        주문 내역
                    </div>
                    <div className="like_separator_2"></div>
                    <div className="my_info_item">
                        내가 쓴 후기
                    </div>
                    <div className="like_separator_2"></div>
                    <div className="my_info_item">
                        경매 참여 내역
                    </div>
                    <div className="like_separator_2"></div>
                    <div className="my_info_item">
                        개인정보 수정
                    </div>
                    <div className="like_separator_2"></div>
                    <div className="my_info_item">
                        회원탈퇴
                    </div>
                </div>
                <div className="qna_container">
                    <div className="product_qna">
                        <div className="product_qna_title">
                            상품 문의 내역
                        </div>
                        <div className="more">
                            더보기 >
                        </div>
                    </div>
                    <div className="like_separator_1"></div>
                    {/*<div className="qna_content">*/}
                    {/*    <div className="answer_new">new</div>*/}
                    {/*    <div>Q. 지금 시키면 언제와요 ?</div>*/}
                    {/*</div>*/}
                    {/*<div className="qna_content">*/}
                    {/*    <div className="answer_new">new</div>*/}
                    {/*    <div className="answer_qna">Q. 한포대에 몇개씩 들어있습니까?</div>*/}
                    {/*</div>*/}
                    <div className="personal_qna">
                        <div className="personal_qna_title_content">
                            <div className="personal_qna_title">
                                1:1 문의 내역
                            </div>
                            <div className="more">
                                더보기 >
                            </div>
                        </div>
                        <div className="like_separator_1"></div>
                        {/*<div className="qna_content">*/}
                        {/*    <div className="answer_wait">*/}
                        {/*        답변대기*/}
                        {/*    </div>*/}
                        {/*    <div className="answer_qna">*/}
                        {/*        Q. 아니 상추에서 달팽이가;;;*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        {/*<div className="qna_content">*/}
                        {/*    <div className="answer_done">*/}
                        {/*        답변완료*/}
                        {/*    </div>*/}
                        {/*    <div className="answer_qna">*/}
                        {/*        Q. 맛이 없어요 환불부탁*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        {/*<div className="qna_content">*/}
                        {/*    <div className="answer_done">*/}
                        {/*        답변완료*/}
                        {/*    </div>*/}
                        {/*    <div className="answer_qna">*/}
                        {/*        Q. 이 곳 주인장 전화번호 뭔가요. 물어볼게 있소.*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                </div>
                {/*qna_container*/}
            </div>
        </div>
    );
}

export default MyPage;