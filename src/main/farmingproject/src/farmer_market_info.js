import {useState, useEffect} from "react";
import  './farmer_market_info.css';
import './root.css';

function Farmer_market_info() {
    return (
        <div id={'body'}>
            <div id={'market_farmer_info_page'}>
                <div id={'contents'}>
                    <div id={'search_box'}>
                        <input type={'text'} id={'search_query'} placeholder={'검색 내용을 입력하세요'}/>
                        <button id={'search_btn'}><img src="res/search.png" alt={"search_btn"}/></button>
                    </div>
                    <div className={'product_detail'}>
                        <div className={'left_area'}>
                            <div className={'pd_img'}>
                                <img src={'res/products/premium_watermelon.png'} />
                            </div>
                        </div>
                        <div className={'right_area'}>
                            <div className={'pd_info'}>
                                <div className={'pd_name'}>
                                    <p>프리미엄 고당도 꿀수박 1.35KG</p>
                                </div>
                                <div className={'pd_star'}>
                                    <img src={'res/star.png'} />
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
                                <div className={'pd_value'}>
                                    <span className={'pd_price'}>18,900</span>
                                    <span className={'pd_price'}>원 </span>
                                    <span className={'pd_rate'}>65</span>
                                    <span className={'pd_rate'}>%</span>
                                </div>
                                <div className={'purchase_cnt'}>
                                    <span>구매 수량</span>
                                    <table>
                                        <tr>
                                            <td><button>-</button></td>
                                            <td><input type={"text"}/> </td>
                                            <td><button>+</button></td>
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
                </div>
            </div>
        </div>
    );
}

export default Farmer_market_info;