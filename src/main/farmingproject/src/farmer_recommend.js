import React, { useState, useEffect } from "react";
import axios from "axios";
import './shopping_basket.css';
import './farmer_recommend.css';
import './common/root.css';
import { Link } from "react-router-dom";

const formatDate = () => {
    const date = new Date();
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = date.toLocaleDateString('ko-KR', options);
    const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const dayOfWeek = weekdays[date.getDay()];
    const [year, month, day] = formattedDate.split('. ');
    const formattedDay = day.replace('.', '');
    return `${year}.${month}.${formattedDay} (${dayOfWeek})`;
};

const CountdownTimer = () => {
    const [timeLeft, setTimeLeft] = useState(7200);
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
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
    const [timeSaleItems, setTimeSaleItems] = useState([]);
    const todayDate = formatDate();

    useEffect(() => {
        const fetchTopProducts = async () => {
            try {
                const response = await axios.get('/api/productRG/top5');
                setTopProducts(response.data);
            } catch (error) {
                console.error('상품 정보를 불러오는 데 실패했습니다.', error);
            }
        };

        // 5개의 랜덤 특가 상품 목록 가져오기
        const fetchTimeSaleProducts = async () => {
            try {
                const response = await axios.get('/api/productRG/timeSale');
                setTimeSaleItems(response.data);
            } catch (error) {
                console.error("특가 타임 세일 제품을 불러오는데 실패했습니다.", error);
            }
        };


        fetchTopProducts();
        fetchTimeSaleProducts();
    }, []);

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
                    <div id="today_time_sale">
                        <div className={'recommend_title_sale sub_title'}>
                            <h1>오늘의 특가 타임 세일</h1>
                        </div>
                        <span id="recommend_today_date">{todayDate}</span>
                        <div id="today_time_sale_list" className={'recommend_list'}>
                            <CountdownTimer />
                            {timeSaleItems.map((item) => (
                                <div key={item.productId} className={'recommend_product'}>
                                    <img src={item.productimgPath} alt="상품 사진" />
                                    <p className="recommend_product_name">{item.productName}</p>
                                    <div className="recommend_product_sale">
                                        <span className="recommend_product_sale_percent">{item.salenum+5}%</span>
                                        <span className="recommend_product_sale_price">{item.productPrice3}원</span>
                                    </div>
                                    <button type="button" className="recommend_buy">구매하러 가기</button>
                                </div>
                            ))}
                            <br />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Farmer_recommend;
