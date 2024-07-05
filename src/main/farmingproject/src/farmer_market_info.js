import {useState, useEffect} from "react";
import  './farmer_market_info.css';
import './common/root.css';

function Farmer_market_info() {

    const [product, setProduct] = useState(null);
    const [activeTab, setActiveTab] = useState('pdinfo');

    return (
        <div id={'body'}>
            <div id={'market_farmer_info_page'} className={'page'}>
                <div id={'contents'}>
                    <div id={'search_box'}>
                        <input type={'text'} id={'search_query'} placeholder={'검색 내용을 입력하세요'}/>
                        <button id={'search_btn'}><img src="img/etc/search.png" alt={"search_btn"}/></button>
                    </div>
                    <div className={'product_detail'}>
                        <div className={'left_area'}>
                            <div className={'pd_img'}>
                                <img src={'img/watermelon.png'} />
                            </div>
                        </div>
                        <div className={'right_area'}>
                            <div className={'pd_info'}>
                                <div className={'pd_title'}>
                                    <div className={'pd_name'}>
                                        <p>프리미엄 고당도 꿀수박 1.35KG</p>
                                    </div>
                                    <div className={'pd_like'}>
                                        <img src={'img/etc/like_blank.png'}/>
                                    </div>
                                </div>
                                <div className={'pd_value'}>
                                    <span className={'pd_price'}>18,900</span>
                                    <span className={'pd_price'}>원 </span>
                                    <span className={'pd_rate'}>65</span>
                                    <span className={'pd_rate'}>%</span>
                                </div>
                                <div className={'pd_star'}>
                                    <img src={'img/etc/star.png'}/>
                                    <span>4.6</span>
                                </div>
                                <div className={'pd_origin'}>
                                    <span>원산지 | </span>
                                    <span>산골짜기</span>
                                </div>
                                <div className={'pd_deliver'}>
                                    <span>배송정보 | </span>
                                    <span>무료배송</span>
                                    <span> , </span>
                                    <span>05/07</span>
                                    <span> 도착예정</span>
                                </div>
                                <div className={'pd_purchase_cnt'}>
                                    <span>구매건수 | </span>
                                    <span>256</span>
                                    <span>건</span>
                                </div>
                                <div className={'purchase_cnt'}>
                                    <span>구매 수량</span>
                                    <table>
                                        <tr>
                                            <td>
                                                <button>-</button>
                                            </td>
                                            <td><input type={"text"}/></td>
                                            <td>
                                                <button>+</button>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className={'total_purchase'}>
                            <div className={'total_price'}>
                                <span>총 금액 </span>
                                <span>18,900</span>
                                <span>원</span>
                            </div>
                            <div className={'purchase_btn'}>
                                <button id={'basket_btn'}>장바구니</button>
                                <button id={'buy_btn'}>바로구매</button>
                            </div>
                        </div>
                    </div>
                    <div className={'product_detail_more_area'}>
                        <ul className={'product_detail_tab'}>
                            <li id={'pdinfo'} className={activeTab === 'pdinfo' ? 'active' : ''} onClick={() => setActiveTab('pdinfo')}>상품상세</li>
                            <li id={'reviewinfo'} className={activeTab === 'reviewinfo' ? 'active' : ''} onClick={() => setActiveTab('reviewinfo')}>리뷰</li>
                            <li id={'questioninfo'} className={activeTab === 'questioninfo' ? 'active' : ''} onClick={() => setActiveTab('questioninfo')}>상품문의</li>
                            <li id={'deliveryinfo'} className={activeTab === 'deliveryinfo' ? 'active' : ''} onClick={() => setActiveTab('deliveryinfo')}>배송/교환/반품</li>
                        </ul>
                        <div className={'product_detail_info_area'}>
                            {activeTab === 'pdinfo' && (
                                <div className={'product_detail_info'}>
                                    <h1 className={'info_title'}>프리미엄 고당도 꿀수박</h1>
                                    <p>믿고 사세요! 고창 군수 10년차, 농사 30년차 김홍만 입니다.</p>
                                    <img src={'img/watermelon_2.png'}/>
                                    <p>"저희 꿀 수박은 평균 당도 14Brix 이상의 높은 당도를 자랑하며, 농가에서 직접 선별하여 보내드립니다."</p>
                                    <br/><br/><br/><br/>
                                    <h2 className={'info_sub_title'}>| 수박 레시피 |</h2>
                                    <p>노화 방지, 피로회복 및 각종 암 예방 등 몸에 좋은 수박!</p>
                                    <p>아삭아삭 달콤한 맛으로 그냥 먹어도 맛있지만, 갈아서 쥬스로 먹거나 아이스크림, 빙수 등으로 다양하게 만들어 즐겨보세요.</p>
                                    <img src={'img/watermelon_icecream.png'}/>
                                    <img src={'img/watermelon_smoothie.png'}/>
                                    <br/><br/><br/><br/>
                                    <h2 className={'info_sub_title'}>| 고당도 꿀수박 보관방법 |</h2>
                                    <p>1. 수령 후 바람이 잘 통하고 서늘한 그늘에서 하루 정도 보관 후 드시면 더욱 달콤하게 드실 수 있습니다. 수박은 보관 기간이 길지 않으므로
                                        빠른 시일 내에 드셔주세요!</p>
                                    <p>2. 냉장 보관 시 깍뚝 썰어 밀폐용기에 담아 냉장보관 하신 후 꺼내드시면 좋습니다. 수박은 섭씨 4도 이하로 보관하면 냉해를 입을 수 있으니
                                        주의하시기 바랍니다.</p>
                                </div>
                            )}
                            {activeTab === 'reviewinfo' && (
                                <div className={'product_detail_info'}>
                                    <img src={'img/etc/review_img.png'}/>
                                </div>
                            )}
                            {activeTab === 'questioninfo' && (
                                <div className={'product_detail_info'}>
                                    <img src={'img/etc/question_img.png'}/>
                                </div>
                            )}
                            {activeTab === 'deliveryinfo' && (
                                <div className={'product_detail_info'}>
                                    <img src={'img/etc/delivery_img.png'}/>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Farmer_market_info;