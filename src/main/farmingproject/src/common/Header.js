import React, { useState } from 'react';
import {useLocation} from "react-router-dom";
import './Header.css';

function Header() {
    const[isCategoryDropdownOpen,setCategoryDropdownOpen]=useState(false); //카테고리 드롭다운 메뉴
    const [isMarketDropdownOpen,setMarketDropdownOpen]=useState(false); //농부마켓 드롭다운 메뉴
    const location = useLocation(); //현재 url을 확인하고 해당 경로와 일치하는 링크에 대해 bold처리

    const handleCategoryMouseEnter=()=>{
        setCategoryDropdownOpen(true);
    };

    const handleCategoryMouseLeave=()=>{
        setCategoryDropdownOpen(false);
    };

    const handleMarketMouseEnter=()=>{
        setMarketDropdownOpen(true);
    };

    const handleMarketMouseLeave=()=>{
        setMarketDropdownOpen(false);
    };

    return (
        <header id="header">
            <nav id="nav_container">
                <span id="logo">
                    <a href="/main">Farming 파밍</a>
                </span>
                <ul id="nav_links">
                    <li onMouseEnter={handleCategoryMouseEnter} onMouseLeave={handleCategoryMouseLeave}>
                        <a href="/category" className={location.pathname.startsWith('/category') ? 'active' : ''}>카테고리</a>
                        {isCategoryDropdownOpen && (
                            <ul className="dropdown">
                                <div className="category_group">
                                    <li><a href="/category/vegetables">채소</a></li>
                                    <li><a href="/category/vegetables/1">배추/무/파</a></li>
                                    <li><a href="/category/vegetables/2">고추/마늘/양파/생강</a></li>
                                    <li><a href="/category/vegetables/3">고구마/감자/밥/옥수수</a></li>
                                    <li><a href="/category/vegetables/4">쌈채소/깻잎</a></li>
                                    <li><a href="/category/vegetables/5">나물</a></li>
                                    <li><a href="/category/vegetables/6">기타</a></li>
                                </div>
                                <div className="category_group">
                                    <li><a href="/category/fruits">과일</a></li>
                                    <li><a href="/category/fruits/1">사과/배/감</a></li>
                                    <li><a href="/category/fruits/2">딸기/포도/블루베리</a></li>
                                    <li><a href="/category/fruits/3">오렌지/자몽/레몬</a></li>
                                    <li><a href="/category/fruits/4">참외/복숭아</a></li>
                                    <li><a href="/category/fruits/5">기타</a></li>
                                </div>
                            </ul>
                        )}
                    </li>
                    <li onMouseEnter={handleMarketMouseEnter} onMouseLeave={handleMarketMouseLeave}>
                        <a href="/farmer_market" className={location.pathname === '/farmer_market' ? 'active' : ''}>농부마켓</a>
                        {isMarketDropdownOpen && (
                            <ul className="dropdown">
                                <div className="farmer_market_group">
                                    <li><a href="/farmermarket/single">1인 가구 마켓</a></li>
                                    <li><a href="/farmermarket/general">일반 마켓</a></li>
                                </div>
                            </ul>
                        )}
                    </li>
                    <li><a href="/farmer_recommend" className={location.pathname === '/farmer_recommend' ? 'active' : ''}>농부추천</a></li>
                    <li><a href="/auction" className={location.pathname === '/auction' ? 'active' : ''}>청과경매</a></li>
                    <li><a href="/farmer_job" className={location.pathname === '/farmer_job' ? 'active' : ''}>파머직</a></li>
                    <li><a href="/service" className={location.pathname === '/service' ? 'active' : ''}>고객센터</a></li>
                    <li><a href="/shopping_basket" className={location.pathname === '/shopping_basket' ? 'active' : ''}>장바구니</a></li>
                    <li><a href="/mypage_seller" className={location.pathname === '/mypage_seller' ? 'active' : ''}>마이페이지</a></li>
                    <li><a href="/login" className={location.pathname === '/login' ? 'active' : ''}>로그인</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;