import {useState, useEffect} from "react";
import {Link, Route} from 'react-router-dom';
import './common/root.css';
import './farmer_market_seller.css';

function Farmer_market_seller() {

    return (
        <div id={'body'}>
            <div id={'farmer_market_page'} className={'page'}>
                <div id={'contents'}>
                    <div id={'search_box'}>
                        <input type={'text'} id={'search_query'} placeholder={'검색 내용을 입력하세요'}/>
                        <button id={'search_btn'}><img src="img/etc/search.png" alt={"search_btn"}/></button>
                    </div>
                    <div id={'align_box'}>
                        <div id={'category_box'}>
                            <ul>
                                <li>상품목록</li>
                            </ul>
                        </div>
                        <div id={'page_location'}>
                            <ul>
                                <li>판매순</li>
                                <li>|</li>
                                <li>인기순</li>
                            </ul>
                        </div>
                    </div>
                    <div id={'product_list'}>
                        {/*첫번째 줄*/}
                        <ul className={'pd_list'}>
                            <li>
                                <div className={'pd_info'}>
                                    <Link to={"/farmer_market_info_seller"}>
                                        <img src={'img/watermelon.png'} style={{width: '190px', height: '190px'}}/>
                                        <p className={'pd_name'}>
                                            프리미엄 고당도 수박
                                        </p>
                                    </Link>
                                </div>
                            </li>
                            <li>
                                <div className={'pd_info'}>
                                    <Link to={"/"}>
                                        <img src={'img/cucumber.png'} style={{width: '190px', height: '190px'}}/>
                                        <p className={'pd_name'}>
                                            오이지오이 10kg
                                        </p>
                                    </Link>
                                </div>
                            </li>
                            <li>
                                <div className={'pd_info'}>
                                    <Link to={"/"}>
                                        <img src={'img/snow_white_strawberry.png'} style={{width: '190px', height: '190px'}}/>
                                        <p className={'pd_name'}>
                                            백설향 딸기
                                        </p>
                                    </Link>
                                </div>
                            </li>
                            <li>
                                <div className={'pd_info'}>
                                    <Link to={"/"}>
                                        <img src={'img/zucchini_2.png'} style={{width: '190px', height: '190px'}}/>
                                        <p className={'pd_name'}>
                                            국산 애호박 5개
                                        </p>
                                    </Link>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Farmer_market_seller;
