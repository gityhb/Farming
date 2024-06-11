import './shopping_basket.css';
import './farmer_recommend.css'
import React, { useState } from "react";

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

function Farmer_recommend() {
    const [items, setItems] = useState([
        { id: 1, name: "맛난 딸기", salepercent: 45, price: 1000, marketImg: "img/strawberry.png"},
        { id: 2, name: "국내산 토마토", salepercent: 20, price: 2000, marketImg: "img/tomato.png"},
        { id: 3, name: "국내산 사과", salepercent: 30, price: 3000, marketImg: "img/apple.png"},
        { id: 4, name: "아보카도", salepercent: 25, price: 1000, marketImg: "img/avocado.png"},
        { id: 5, name: "양상추", salepercent: 10, price: 3700, marketImg: "img/lettuce.png"},
    ]);

    const [timeSaleItems, setTimeSaleItems] = useState([
        { id: 6, name: "고창 수박", salepercent: 50, price: 15000, marketImg: "img/watermelon.png" },
        { id: 7, name: "부드러운 바나나", salepercent: 35, price: 3000, marketImg: "img/banana.png" },
        { id: 8, name: "제주도 귤", salepercent: 40, price: 4000, marketImg: "img/mandarin.png" },
        { id: 9, name: "인큐 애호박", salepercent: 20, price: 2500, marketImg: "img/zucchini.png" },
        { id: 10, name: "사파이어 포도", salepercent: 15, price: 4500, marketImg: "img/sapphire_grapes.png" },
    ]);

    const todayDate = formatDate();

    return (
        <div id="main">
            <div id="search">
                <input id="recommend_search" placeholder="검색어를 입력하세요." />
                <button type="button" id="search_btn">
                    <img src="img/search.png" alt="검색" />
                </button>
            </div>
            <div id="today_recommend_5">
                <img id="recommend_text_png" src="img/recommend_top5_text.png" alt="top5_text" />
                <div id="today_recommend_5_list">
                    {items.map((item) => (
                        <div key={item.id} id="today_recommend_5_product">
                            <img src={item.marketImg} alt="상품 사진" />
                            <p id="recommend_product_name">{item.name}</p>
                            <div id="recommend_product_sale">
                                <span id="recommend_product_sale_percent">{item.salepercent}%</span>
                                <span id="recommend_product_sale_price">{item.price}원</span>
                            </div>
                            <button type="button" id="recommend_buy">
                                구매하러 가기
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div id="today_time_sale">
                <img id="recommend_text_png" src="img/recommend_sale_text.png" alt="top5_text" />
                <span id="recommend_today_date">{todayDate}</span>
                <div id="today_time_sale_list">
                    <div id="today_time_sale_countdown"></div>
                    {timeSaleItems.map((item) => (
                        <div key={item.id} id="today_recommend_5_product">
                            <img src={item.marketImg} alt="상품 사진" />
                            <p id="recommend_product_name">{item.name}</p>
                            <div id="recommend_product_sale">
                                <span id="recommend_product_sale_percent">{item.salepercent}%</span>
                                <span id="recommend_product_sale_price">{item.price}원</span>
                            </div>
                            <button type="button" id="recommend_buy">
                                구매하러 가기
                            </button>
                        </div>
                    ))}
                    <br />
                </div>
            </div>
        </div>
    );
}

export default Farmer_recommend;