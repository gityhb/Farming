import {useState, useEffect} from "react";
import  './farmer_market_info_seller.css';
import './common/root.css';

function Farmer_market_info_seller() {

    const [product, setProduct] = useState(null);
    const [activeTab, setActiveTab] = useState('orderdetails');

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleViewResume = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
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
                            {activeTab === 'orderdetails' && (
                                <div className="table_container">
                                    <table>
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
                                        <br/>
                                        <tbody>
                                        <tr>
                                            <td>오소정</td>
                                            <td>010-1234-5678</td>
                                            <td>서울 어딘가</td>
                                            <td>2024.08.08</td>
                                            <td>1</td>
                                            <td>배송전</td>
                                        </tr>
                                        <tr>
                                            <td>윤혜빈</td>
                                            <td>010-1111-2222</td>
                                            <td>서울 어딘가</td>
                                            <td>2024.08.07</td>
                                            <td>1</td>
                                            <td>배송중</td>
                                        </tr>
                                        <tr>
                                            <td>민지원</td>
                                            <td>010-2222-3333</td>
                                            <td>서울 어딘가</td>
                                            <td>2024.08.07</td>
                                            <td>1</td>
                                            <td>배송중</td>
                                        </tr>
                                        <tr>
                                            <td>송수빈</td>
                                            <td>010-4444-5555</td>
                                            <td>서울 어딘가</td>
                                            <td>2024.08.06</td>
                                            <td>1</td>
                                            <td>배송완료</td>
                                        </tr>
                                        <tr>
                                            <td>신짱구</td>
                                            <td>010-7171-6666</td>
                                            <td>서울 어딘가</td>
                                            <td>2024.08.02</td>
                                            <td>3</td>
                                            <td>배송완료</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            )}
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
                                    <div className="table_container">
                                        <table>
                                            <thead>
                                            <tr>
                                                <th>Q / A</th>
                                                <th>작성자</th>
                                                <th>문의 내용</th>
                                                <th>작성일</th>
                                                <th>답변 상태</th>
                                            </tr>
                                            </thead>
                                            <br/>
                                            <tbody>
                                            <tr>
                                                <td>Q</td>
                                                <td>PEPSI</td>
                                                <td>업소용인가요?</td>
                                                <td>24.05.05</td>
                                                <td onClick={() => handleViewResume()}>답변 대기</td>
                                            </tr>
                                            <tr>
                                                <td>Q</td>
                                                <td>jiwon</td>
                                                <td>배송료는 개당 붙는건가요?</td>
                                                <td>24.05.03</td>
                                                <td>답변 완료</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    {isModalOpen && (
                                        <div class="modal">
                                            <div className="container">
                                                <div className="header">
                                                    <h2>상품 문의 답변</h2>
                                                </div>
                                                <textarea placeholder="내용을 입력하세요"></textarea>
                                                <div className="button-container">
                                                    <button className="cancel-button" onClick={closeModal}>취소</button>
                                                    <button className="submit-button">등록</button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
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

export default Farmer_market_info_seller;