import React from 'react';
import './mypage.css';

function MyPage(){

    return(
        <div className="mypage">
            <div className="title_component">
                <div className="title">
                    마이페이지
                </div>
            </div>
            <div className="delivery_component">
                <div className="hello">
                    <img src="/img/subin.png" style={{width: '81px', height: '81px'}}/>
                    <div className="hello_text">
                        송수빈님, 반갑습니다.
                    </div>
                </div>
                <div className="delivery_detail">
                    <div className="detail_item">
                        <div className="item_1">
                            0<br/>
                        </div>
                        <div className="item_2">
                            결제완료
                        </div>
                    </div>
                    <div className="detail_item">
                        <div className="item_3">
                            0<br/>
                        </div>
                        <div className="item_4">
                            배송준비중
                        </div>
                    </div>
                    <div className="detail_item">
                        <div className="item_5">
                            2<br/>
                        </div>
                        <div className="item_6">
                            배송중
                        </div>
                    </div>
                    <div className="detail_item">
                        <div className="item_7">
                            2<br/>
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
                    <div className="like_text">
                        좋아요 목록
                    </div>
                    <div className="more">
                        더보기 >
                    </div>
                </div>
                <div className="like_separator"></div>
                <div className="like_container">
                    <div className="like_content"></div>
                    <div className="like_content"></div>
                    <div className="like_content"></div>
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
                    <div className="qna_content">
                        <div className="answer_new">new</div>
                        <div>Q. 지금 시키면 언제와요 ?</div>
                    </div>
                    <div className="qna_content">
                        <div className="answer_new">new</div>
                        <div className="answer_qna">Q. 한포대에 몇개씩 들어있습니까?</div>
                    </div>
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
                        <div className="qna_content">
                            <div className="answer_wait">
                                답변대기
                            </div>
                            <div className="answer_qna">
                                Q.  아니 상추에서 달팽이가;;;
                            </div>
                        </div>
                        <div className="qna_content">
                            <div className="answer_done">
                                답변완료
                            </div>
                            <div className="answer_qna">
                                Q. 맛이 없어요 환불부탁
                            </div>
                        </div>
                        <div className="qna_content">
                            <div className="answer_done">
                                답변완료
                            </div>
                            <div className="answer_qna">
                                Q. 이 곳 주인장 전화번호 뭔가요. 물어볼게 있소.
                            </div>
                        </div>
                    </div>
                </div>
                {/*qna_container*/}
            </div>
        </div>
    );
}
export default MyPage;