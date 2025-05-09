import React, {useEffect, useState} from 'react';
import {useLocation, Link, useNavigate} from "react-router-dom";
import './Header.css';
import axios from "axios";
import {useUser} from "./userContext";

function Header() {

    const { user } = useUser();
    console.log("User in Header: ", user);

    const handleClick = async () => {
        try {
            // 서버에 로그아웃 요청을 보냄
            const response = await fetch('/api/logout', {
                method: 'POST',
                credentials: 'include', // 쿠키를 포함하여 요청
                headers: {
                    'Content-Type': 'application/json', // 요청 본문이 JSON 형식임을 명시
                },
                body: JSON.stringify({}), // 빈 객체 전송
            });

            // 응답 상태 코드 확인
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // 세션 쿠키 삭제
            document.cookie = "JSESSIONID=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";

            // 페이지 새로 고침
            window.location.reload();
        } catch (error) {
            console.error("There was an error logging out!", error);
        }
    };

    const[isCategoryDropdownOpen,setCategoryDropdownOpen]=useState(false); //카테고리 드롭다운 메뉴
    const [isMarketDropdownOpen,setMarketDropdownOpen]=useState(false); //농부마켓 드롭다운 메뉴

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
                    <Link to={"/"}>Farming 파밍</Link>
                </span>
                {user ? (
                    user.authority === 1 ? (
                    // 소비자 권한
                    <ul id="nav_links">
                        {/*<li onMouseEnter={handleCategoryMouseEnter} onMouseLeave={handleCategoryMouseLeave}>*/}
                        {/*    <ul><Link to={"/..."}>카테고리</Link></ul>*/}
                        {/*    {isCategoryDropdownOpen && (*/}
                        {/*        <ul className="dropdown">*/}
                        {/*            <div className="category_group">*/}
                        {/*                <li><a href="/category/vegetables">채소</a></li>*/}
                        {/*                <li><a href="/category/vegetables/1">배추/무/파</a></li>*/}
                        {/*                <li><a href="/category/vegetables/2">고추/마늘/양파/생강</a></li>*/}
                        {/*                <li><a href="/category/vegetables/3">고구마/감자/밥/옥수수</a></li>*/}
                        {/*                <li><a href="/category/vegetables/4">쌈채소/깻잎</a></li>*/}
                        {/*                <li><a href="/category/vegetables/5">나물</a></li>*/}
                        {/*                <li><a href="/category/vegetables/6">기타</a></li>*/}
                        {/*            </div>*/}
                        {/*            <div className="category_group">*/}
                        {/*                <li><a href="/category/fruits">과일</a></li>*/}
                        {/*                <li><a href="/category/fruits/1">사과/배/감</a></li>*/}
                        {/*                <li><a href="/category/fruits/2">딸기/포도/블루베리</a></li>*/}
                        {/*                <li><a href="/category/fruits/3">오렌지/자몽/레몬</a></li>*/}
                        {/*                <li><a href="/category/fruits/4">참외/복숭아</a></li>*/}
                        {/*                <li><a href="/category/fruits/5">기타</a></li>*/}
                        {/*            </div>*/}
                        {/*        </ul>*/}
                        {/*    )}*/}
                        {/*</li>*/}
                        <li onMouseEnter={handleMarketMouseEnter} onMouseLeave={handleMarketMouseLeave}>
                            <Link to={"/farmer_market"}>농부마켓</Link>
                            {/*{isMarketDropdownOpen && (*/}
                            {/*    <ul className="dropdown">*/}
                            {/*        <div className="farmer_market_group">*/}
                            {/*            <li><Link to={"/farmer_market"}>1인 가구 마켓</Link></li>*/}
                            {/*            <li><Link to={"/farmer_market"}>일반 마켓</Link></li>*/}
                            {/*        </div>*/}
                            {/*    </ul>*/}
                            {/*)}*/}
                        </li>
                        <li><Link to={"/farmer_recommend"}>농부추천</Link></li>
                        <li><Link to={"/auction"}>청과경매</Link></li>
                        <li><Link to={"/farmer_job"}>파머직</Link></li>
                        <li><Link to={"/customer_service_FAQ"}>고객센터</Link></li>
                        <li><Link to={"/shopping_basket"}>장바구니</Link></li>
                        <li><Link to={"/mypage"}>마이페이지</Link></li>
                        <li>소비자 {user.name}님</li>
                        <li><Link to={"/"} onClick={handleClick}>로그아웃</Link></li>
                    </ul>
                ) : user.authority === 2 ? (
                    // 판매자 권한
                        <ul id="nav_links">
                            {/*<li onMouseEnter={handleCategoryMouseEnter} onMouseLeave={handleCategoryMouseLeave}>*/}
                            {/*    <ul><Link to={"/..."}>카테고리</Link></ul>*/}
                            {/*    {isCategoryDropdownOpen && (*/}
                            {/*        <ul className="dropdown">*/}
                            {/*            <div className="category_group">*/}
                            {/*                <li><a href="/category/vegetables">채소</a></li>*/}
                            {/*                <li><a href="/category/vegetables/1">배추/무/파</a></li>*/}
                            {/*                <li><a href="/category/vegetables/2">고추/마늘/양파/생강</a></li>*/}
                            {/*                <li><a href="/category/vegetables/3">고구마/감자/밥/옥수수</a></li>*/}
                            {/*                <li><a href="/category/vegetables/4">쌈채소/깻잎</a></li>*/}
                            {/*                <li><a href="/category/vegetables/5">나물</a></li>*/}
                            {/*                <li><a href="/category/vegetables/6">기타</a></li>*/}
                            {/*            </div>*/}
                            {/*            <div className="category_group">*/}
                            {/*                <li><a href="/category/fruits">과일</a></li>*/}
                            {/*                <li><a href="/category/fruits/1">사과/배/감</a></li>*/}
                            {/*                <li><a href="/category/fruits/2">딸기/포도/블루베리</a></li>*/}
                            {/*                <li><a href="/category/fruits/3">오렌지/자몽/레몬</a></li>*/}
                            {/*                <li><a href="/category/fruits/4">참외/복숭아</a></li>*/}
                            {/*                <li><a href="/category/fruits/5">기타</a></li>*/}
                            {/*            </div>*/}
                            {/*        </ul>*/}
                            {/*    )}*/}
                            {/*</li>*/}
                            <li onMouseEnter={handleMarketMouseEnter} onMouseLeave={handleMarketMouseLeave}>
                                <Link to={"/farmer_market_seller"}>농부마켓</Link>
                                {/*{isMarketDropdownOpen && (*/}
                                {/*    <ul className="dropdown">*/}
                                {/*        <div className="farmer_market_group">*/}
                                {/*            <li><Link to={"/farmer_market_seller"}>1인 가구 마켓</Link></li>*/}
                                {/*            <li><Link to={"/farmer_market_seller"}>일반 마켓</Link></li>*/}
                                {/*        </div>*/}
                                {/*    </ul>*/}
                                {/*)}*/}
                            </li>
                            <li><Link to={"/farmer_recommend"}>농부추천</Link></li>
                            <li><Link to={"/auction"}>청과경매</Link></li>
                            <li><Link to={"/farmer_job"}>파머직</Link></li>
                            <li><Link to={"/farmer_product_apply"}>판매신청</Link></li>
                            <li><Link to={"/customer_service_FAQ"}>고객센터</Link></li>
                            <li><Link to={"/mypage_seller"}>마이페이지</Link></li>
                            <li>판매자 {user.name}님</li>
                            <li><Link to={"/"} onClick={handleClick}>로그아웃</Link></li>
                        </ul>
                    ) : (
                        // 관리자 권한 (authority가 3인 경우)
                        <ul id="nav_links">
                            <li>
                                <Link to={'/admin/product_apply_check'}>판매자 상품 등록 관리</Link>
                            </li>
                            <li>
                                <Link to={'/admin/users'}>회원 관리</Link>
                            </li>
                            {/*<li>*/}
                            {/*    <Link to={'/admin/reports'}>리포트 관리</Link>*/}
                            {/*</li>*/}
                            <li>
                                {user.name}님
                            </li>
                            <li>
                                <Link to={'/'} onClick={handleClick}>
                                    로그아웃
                                </Link>
                            </li>
                        </ul>
                    )
                ) : (
                    // 로그인되지 않은 경우
                    <ul id="nav_links">
                        {/*<li onMouseEnter={handleCategoryMouseEnter} onMouseLeave={handleCategoryMouseLeave}>*/}
                        {/*    <ul><Link to={"/..."}>카테고리</Link></ul>*/}
                        {/*    {isCategoryDropdownOpen && (*/}
                        {/*        <ul className="dropdown">*/}
                        {/*            <div className="category_group">*/}
                        {/*                <li><a href="/category/vegetables">채소</a></li>*/}
                        {/*                <li><a href="/category/vegetables/1">배추/무/파</a></li>*/}
                        {/*                <li><a href="/category/vegetables/2">고추/마늘/양파/생강</a></li>*/}
                        {/*                <li><a href="/category/vegetables/3">고구마/감자/밥/옥수수</a></li>*/}
                        {/*                <li><a href="/category/vegetables/4">쌈채소/깻잎</a></li>*/}
                        {/*                <li><a href="/category/vegetables/5">나물</a></li>*/}
                        {/*                <li><a href="/category/vegetables/6">기타</a></li>*/}
                        {/*            </div>*/}
                        {/*            <div className="category_group">*/}
                        {/*                <li><a href="/category/fruits">과일</a></li>*/}
                        {/*                <li><a href="/category/fruits/1">사과/배/감</a></li>*/}
                        {/*                <li><a href="/category/fruits/2">딸기/포도/블루베리</a></li>*/}
                        {/*                <li><a href="/category/fruits/3">오렌지/자몽/레몬</a></li>*/}
                        {/*                <li><a href="/category/fruits/4">참외/복숭아</a></li>*/}
                        {/*                <li><a href="/category/fruits/5">기타</a></li>*/}
                        {/*            </div>*/}
                        {/*        </ul>*/}
                        {/*    )}*/}
                        {/*</li>*/}
                        <li onMouseEnter={handleMarketMouseEnter} onMouseLeave={handleMarketMouseLeave}>
                            <Link to={"/farmer_market"}>농부마켓</Link>
                            {/*{isMarketDropdownOpen && (*/}
                            {/*    <ul className="dropdown">*/}
                            {/*        <div className="farmer_market_group">*/}
                            {/*            <li><Link to={"/farmer_market"}>1인 가구 마켓</Link></li>*/}
                            {/*            <li><Link to={"/farmer_market"}>일반 마켓</Link></li>*/}
                            {/*        </div>*/}
                            {/*    </ul>*/}
                            {/*)}*/}
                        </li>
                        <li><Link to={"/farmer_recommend"}>농부추천</Link></li>
                        <li><Link to={"/auction"}>청과경매</Link></li>
                        <li><Link to={"/farmer_job"}>파머직</Link></li>
                        <li><Link to={"/customer_service_FAQ"}>고객센터</Link></li>
                        <li><Link to={"/login"}>로그인</Link></li>
                        <li><Link to={"/join"}>회원가입</Link></li>
                    </ul>
                )}

            </nav>
        </header>
    );
}

export default Header;