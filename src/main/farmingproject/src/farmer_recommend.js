import './shopping_basket.css';
import './farmer_recommend.css';
import './common/root.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import {Link} from "react-router-dom";

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

const CountdownTimer = () => {
    const [timeLeft, setTimeLeft] = useState(6800); // 2시간 = 7200초

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 :+ 0));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    const formatTime = (num) => String(num).padStart(2, '0');

    return (
        <div id="today_time_sale_countdown">
            <p id="sale_countdown_text1">세일 종료까지</p>
            <p id="sale_countdown_text2">{`${formatTime(hours)}시간 ${formatTime(minutes)}분 ${formatTime(seconds)}초`}</p>
        </div>
    );
};



function Farmer_recommend() {

    const [topProducts, setTopProducts] = useState([]);

    useEffect(() => {
        // API에서 상품 정보를 불러오는 함수
        const fetchTopProducts = async () => {
            try {
                const response = await axios.get('/api/productRG/top5');
                setTopProducts(response.data);
            } catch (error) {
                console.error('상품 정보를 불러오는 데 실패했습니다.', error);
            }
        };

        fetchTopProducts();
    }, []);

    const [items, setItems] = useState([
        { id: 1, name: "맛난 딸기", salepercent: 45, price: 1000, marketImg: "img/strawberry_3.png"},
        { id: 2, name: "국내산 토마토", salepercent: 20, price: 2000, marketImg: "img/tomato.png"},
        { id: 3, name: "국내산 사과", salepercent: 30, price: 3000, marketImg: "img/apple.png"},
        { id: 4, name: "아보카도", salepercent: 25, price: 1000, marketImg: "img/avocado.png"},
        { id: 5, name: "양상추", salepercent: 10, price: 3700, marketImg: "img/lettuce.png"},
    ]);

    const [timeSaleItems, setTimeSaleItems] = useState([
        { id: 6, name: "고창 수박", salepercent: 50, price: 15000, marketImg: "img/watermelon_2.png" },
        { id: 7, name: "부드러운 바나나", salepercent: 35, price: 3000, marketImg: "img/banana.png" },
        { id: 8, name: "제주도 귤", salepercent: 40, price: 4000, marketImg: "img/mandarin.png" },
        { id: 9, name: "인큐 애호박", salepercent: 20, price: 2500, marketImg: "img/zucchini_2.png" },
        { id: 10, name: "사파이어 포도", salepercent: 15, price: 4500, marketImg: "img/sapphire_grapes.png" },
    ]);

    const todayDate = formatDate();

    return (
        <div id="body">
            <div id={'farmer_recommend_page'} className={'page'}>
                <div id={'contents'}>
                    {/*검색창*/}
                    <div id={'search_box'}>
                        <input type={'text'} id={'search_query'} placeholder={'검색 내용을 입력하세요'}/>
                        <button id={'search_btn'}><img src="img/etc/search.png" alt={"search_btn"}/></button>
                    </div>
                    {/*오늘의 추천 TOP 5*/}
                    <div id="today_recommend_5">
                        <div className={'sub_title'}>
                            <h1>오늘의 추천 TOP 5</h1>
                        </div>
                        <div id="today_recommend_5_list" className={'recommend_list'}>
                            {topProducts.map((product) => (
                                <div key={product.productId} className={'recommend_product'}>
                                    <img src={product.productimgPath} alt="상품 사진" />
                                    <p className="recommend_product_name">{product.productName}</p>
                                    <div className="recommend_product_sale">
                                        <span className="recommend_product_sale_percent">{product.salenum}%</span>

                                        <span className="recommend_product_sale_price">{product.productPrice3}원</span>
                                    </div>
                                    <Link to={`/farmer_market_info/${product.productId}`}>
                                    <button type="button" className="recommend_buy">
                                        구매하러 가기
                                    </button>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/*오늘의 특가 타임 세일*/}
                    <div id="today_time_sale">
                        <div className={'recommend_title_sale sub_title'}>
                            <h1>오늘의 특가 타임 세일</h1>
                        </div>
                        <span id="recommend_today_date">{todayDate}</span>
                        <div id="today_time_sale_list"  className={'recommend_list'}>
                            {/*카운트다운*/}
                            <CountdownTimer />
                            {timeSaleItems.map((item) => (
                                <div key={item.id} className={'recommend_product'}>
                                    <img src={item.marketImg} alt="상품 사진"/>
                                    <p className="recommend_product_name">{item.name}</p>
                                    <div className="recommend_product_sale">
                                        <span className="recommend_product_sale_percent">{item.salepercent}%</span>
                                        <span className="recommend_product_sale_price">{item.price}원</span>
                                    </div>
                                    <button type="button" className="recommend_buy">
                                        구매하러 가기
                                    </button>
                                </div>
                            ))}
                            <br/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Farmer_recommend;