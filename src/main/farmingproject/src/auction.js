import React from 'react';
import './auction.css';
import './common/root.css';
import { Link } from 'react-router-dom';

function Auction() {
    return (
        <div id="body">
            <div id={'auction_page'} className={'page'}>
                <div id={'contents'}>
                    <div className={'auction_title'}>
                        <div className={'auction_title_text'}>
                            청과 경매
                        </div>
                    </div>
                    <div className={'auction_container'}>
                        <div className={'auction_content'}>
                            <div className={'auction_content_item'}>
                                <div className={'item_sec_1'}>08/05 13:00 예정</div>
                                <div className={'item_sec_2'}>
                                    <img src={"img/peach_1.jpg"} alt="상품 사진" />
                                    <div className={'item_name'}>못나니 딱 복숭아 40kg</div>
                                    <div className={'item_minbid'}>최소 입찰가 | 200,000원</div>
                                </div>
                            </div>

                            <div className={'auction_content_item'}>
                                <Link to={"/auction_detail"}>
                                    <div className={'item_sec_1'}>08/02 13:00 예정</div>
                                    <div className={'item_sec_2'}>
                                        <img src={"img/watermelon_3.png"} alt="상품 사진" />
                                        <div className={'item_name'}>프리미엄 고당도 꿀수박 50통</div>
                                        <div className={'item_minbid'}>최소 입찰가 | 340,000원</div>
                                    </div>
                                    <div className="auction_overlay">경매중</div> {/* 검정색 반투명 경매중 오버레이 */}
                                </Link>
                            </div>

                            <div className={'auction_content_item'}>
                                <div className={'item_sec_1'}>08/05 13:00 예정</div>
                                <div className={'item_sec_2'}>
                                    <img src={"img/plum.png"} alt="상품 사진" />
                                    <div className={'item_name'}>과즙 가득한 꿀자두 15kg</div>
                                    <div className={'item_minbid'}>최소 입찰가 | 100,000원</div>
                                </div>
                            </div>
                            <div className={'auction_content_item'}>
                                <div className={'item_sec_1'}>08/05 13:00 예정</div>
                                <div className={'item_sec_2'}>
                                    <img src={"img/greenapple.png"} alt="상품 사진" />
                                    <div className={'item_name'}>달달한 아오리사과 15kg</div>
                                    <div className={'item_minbid'}>최소 입찰가 | 100,000원</div>
                                </div>
                            </div>
                        </div>

                        <div className={'auction_content'}>
                            <div className={'auction_content_item'}>
                                <div className={'item_sec_1'}>09/17 15:00 예정</div>
                                <div className={'item_sec_2'}>
                                    <img src={"img/tangerine.png"} alt="상품 사진" />
                                    <div className={'item_name'}>제주도 서귀포시 감귤 30kg</div>
                                    <div className={'item_minbid'}>최소 입찰가 | 230,000원</div>
                                </div>
                            </div>
                            <div className={'auction_content_item'}>
                                <div className={'item_sec_1'}>07/05 13:00 예정</div>
                                <div className={'item_sec_2'}>
                                    <img src={"img/carrot_2.png"} alt="상품 사진" />
                                    <div className={'item_name'}>아삭한 당근 20상자</div>
                                    <div className={'item_minbid'}>최소 입찰가 | 170,000원</div>
                                </div>
                                <div className="auction_overlay">경매 완료</div>
                            </div>
                            <div className={'auction_content_item'}>
                                <div className={'item_sec_1'}>10/05 13:00 예정</div>
                                <div className={'item_sec_2'}>
                                    <img src={"img/cabbage.png"} alt="상품 사진" />
                                    <div className={'item_name'}>아삭아삭 겉절이 배추 30kg</div>
                                    <div className={'item_minbid'}>최소 입찰가 | 100,000원</div>
                                </div>
                            </div>
                            <div className={'auction_content_item'}>
                                <div className={'item_sec_1'}>07/05 13:00 예정</div>
                                <div className={'item_sec_2'}>
                                    <img src={"img/watermelon.png"} alt="상품 사진" />
                                    <div className={'item_name'}>딱 주스용 수박 20kg</div>
                                    <div className={'item_minbid'}>최소 입찰가 | 130,000원</div>
                                </div>
                                <div className="auction_overlay">경매 완료</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Auction;
