import './shopping_basket.css';
import './farmer_recommend.css'
import React from "react";

const formatDate = () => {
    const date = new Date();

    // 날짜 형식 포맷 지정
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = date.toLocaleDateString('ko-KR', options);

    // 요일을 영어 약어로 변환하기 위한 배열
    const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const dayOfWeek = weekdays[date.getDay()];

    // 날짜 포맷을 "YYYY.MM.DD"로 만들기 위해 변환
    const [year, month, day] = formattedDate.split('. ');
    const formattedDay = day.replace('.', ''); // 마지막 마침표 제거

    return `${year}.${month}.${formattedDay} (${dayOfWeek})`;
};

function Farmer_recommend(){
    const todayDate = formatDate();
    return(
        <div id="main">
            <div id="search">
                <input id="recommend_search" placeholder="검색어를 입력하세요."/>
                <button type="button" id="search_btn">
                    <img src="img/search.png" alt="검색"/>
                </button>
            </div>
            <div id="today_recommend_5">
                <img id="recommend_text_png" src="img/recommend_top5_text.png" alt="top5_text"/>
                <div id="today_recommend_5_list">
                    <div id="today_recommend_5_product">
                        <img src="img/strawberry.png" alt="상품 사진"/>
                        <p id="recommend_product_name">신우청 딸기</p>
                        <div id="recommend_product_sale">
                            <span id="recommend_product_sale_percent">45%</span>
                            <span id="recommend_product_sale_price">8900원</span>
                        </div>
                        <button type="button" id="recommend_buy">
                            구매하러 가기
                        </button>
                    </div>
                    <div id="today_recommend_5_product">
                        <img src="img/strawberry.png" alt="상품 사진"/>
                        <p id="recommend_product_name">신우청 딸기</p>
                        <div id="recommend_product_sale">
                            <span id="recommend_product_sale_percent">45%</span>
                            <span id="recommend_product_sale_price">8900원</span>
                        </div>
                        <button type="button" id="recommend_buy">
                            구매하러 가기
                        </button>
                    </div>
                    <div id="today_recommend_5_product">
                        <img src="img/strawberry.png" alt="상품 사진"/>
                        <p id="recommend_product_name">신우청 딸기</p>
                        <div id="recommend_product_sale">
                            <span id="recommend_product_sale_percent">45%</span>
                            <span id="recommend_product_sale_price">8900원</span>
                        </div>
                        <button type="button" id="recommend_buy">
                            구매하러 가기
                        </button>
                    </div>
                    <div id="today_recommend_5_product">
                        <img src="img/strawberry.png" alt="상품 사진"/>
                        <p id="recommend_product_name">신우청 딸기</p>
                        <div id="recommend_product_sale">
                            <span id="recommend_product_sale_percent">45%</span>
                            <span id="recommend_product_sale_price">8900원</span>
                        </div>
                        <button type="button" id="recommend_buy">
                            구매하러 가기
                        </button>
                    </div>
                    <div id="today_recommend_5_product">
                        <img src="img/strawberry.png" alt="상품 사진"/>
                        <p id="recommend_product_name">신우청 딸기</p>
                        <div id="recommend_product_sale">
                            <span id="recommend_product_sale_percent">45%</span>
                            <span id="recommend_product_sale_price">8900원</span>
                        </div>
                        <button type="button" id="recommend_buy">
                            구매하러 가기
                        </button>
                    </div>
                </div>
            </div>

            <div id="today_time_sale">
                <img id="recommend_text_png" src="img/recommend_sale_text.png" alt="top5_text"/>
                <span id="recommend_today_date">{todayDate}</span>
                <div id="today_time_sale_list">
                    <div id="today_time_sale_countdown">

                    </div>
                    <div id="today_recommend_5_product">
                        <img src="img/strawberry.png" alt="상품 사진"/>
                        <p id="recommend_product_name">신우청 딸기</p>
                        <div id="recommend_product_sale">
                            <span id="recommend_product_sale_percent">45%</span>
                            <span id="recommend_product_sale_price">8900원</span>
                        </div>
                        <button type="button" id="recommend_buy">
                            구매하러 가기
                        </button>
                    </div>
                    <div id="today_recommend_5_product">
                        <img src="img/strawberry.png" alt="상품 사진"/>
                        <p id="recommend_product_name">신우청 딸기</p>
                        <div id="recommend_product_sale">
                            <span id="recommend_product_sale_percent">45%</span>
                            <span id="recommend_product_sale_price">8900원</span>
                        </div>
                        <button type="button" id="recommend_buy">
                            구매하러 가기
                        </button>
                    </div>
                    <div id="today_recommend_5_product">
                        <img src="img/strawberry.png" alt="상품 사진"/>
                        <p id="recommend_product_name">신우청 딸기</p>
                        <div id="recommend_product_sale">
                            <span id="recommend_product_sale_percent">45%</span>
                            <span id="recommend_product_sale_price">8900원</span>
                        </div>
                        <button type="button" id="recommend_buy">
                            구매하러 가기
                        </button>

                    </div>
                    <div id="today_recommend_5_product">
                        <img src="img/strawberry.png" alt="상품 사진"/>
                        <p id="recommend_product_name">신우청 딸기</p>
                        <div id="recommend_product_sale">
                            <span id="recommend_product_sale_percent">45%</span>
                            <span id="recommend_product_sale_price">8900원</span>
                        </div>
                        <button type="button" id="recommend_buy">
                            구매하러 가기
                        </button>
                    </div>
                    <div id="today_recommend_5_product">
                        <img src="img/strawberry.png" alt="상품 사진"/>
                        <p id="recommend_product_name">신우청 딸기</p>
                        <div id="recommend_product_sale">
                            <span id="recommend_product_sale_percent">45%</span>
                            <span id="recommend_product_sale_price">8900원</span>
                        </div>
                        <button type="button" id="recommend_buy">
                            구매하러 가기
                        </button>
                    </div>
                    <br/>

                </div>
            </div>
        </div>
    )
}

export default Farmer_recommend;