import React, {useState, useEffect} from "react";
import {Link, Route} from 'react-router-dom';
import axios from "axios";
import './common/root.css';
import './farmer_market.css';

function Farmer_market() {
    const [searchQuery, setSearchQuery] = useState("");
    const [products, setProducts] = useState([]);
    const [selectedSort, setSelectedSort] = useState("newest"); // 현재 선택된 정렬 방식


    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // 판매순 정렬 함수
    const handleNewestSort = () => {
        const sortedProducts = [...products].sort((a, b) => new Date(b.productCreatedDate) - new Date(a.productCreatedDate));
        setProducts(sortedProducts);
        setSelectedSort("newest");
    };
    // 구매 횟수를 기준으로 인기순 정렬
    const handlePopularitySort = () => {
        const sortedProducts = [...products].sort((a, b) => b.sellcount - a.sellcount);
        setProducts(sortedProducts);
        setSelectedSort("popularity");
    };

    // 가격순 정렬 함수
    const handlePriceSort = () => {
        const sortedProducts = [...products].sort((a, b) => a.productPrice3 - b.productPrice3);
        setProducts(sortedProducts);
        setSelectedSort("priceLowToHigh"); // 현재 정렬 상태를 저장 (낮은 가격순)
    };



    const fetchProducts = async () => {
        try {
            const response = await axios.get("/api/productRG/get_productRG");
            setProducts(response.data.reverse());
        } catch (error) {
            console.error("제품 로드 중 에러 발생:", error);
        }
    };

    useEffect(() => {

        fetchProducts();
    }, []);

    const handleSearch=async()=>{
        try{
            const response = await fetch(`/api/productRG/search?name=${searchQuery}`);
            if(response.ok){
                const data = await response.json();
                setProducts(data); //검색 결과를 products 상태로 설정
            }else{
                console.error("상품 검색 실패");
            }
        }catch(error){
            console.error("상품 검색 중 오류 발생:".error);
        }
    };

    return (
        <div id={'body'}>
            <div id={'farmer_market_page'} className={'page'}>
                <div id={'contents'}>
                    <div id={'search_box'}>
                        <input type={'text'} id={'search_query'} placeholder={'검색 내용을 입력하세요'} value={searchQuery}
                               onChange={(e) => setSearchQuery(e.target.value)}/>
                        <button id={'search_btn'} onClick={handleSearch}><img src="img/etc/search.png"
                                                                              alt={"search_btn"}/></button>
                    </div>
                    <div id={'align_box'}>
                        <div id={'category_box'}>
                            <ul>
                                <li>일반마켓</li>
                            </ul>
                        </div>
                        <div id={'page_location'}>
                            <ul>
                                <li className={"set_list"} onClick={handleNewestSort} style={{ fontWeight: selectedSort === "newest" ? "bold" : "normal"}}>판매순</li>
                                <li>|</li>
                                <li className={"set_list"} onClick={handlePopularitySort} style={{ fontWeight: selectedSort === "popularity" ? "bold" : "normal"}}>인기순</li>
                                <li>|</li>
                                <li className={"set_list"} onClick={handlePriceSort} style={{ fontWeight: selectedSort === "priceLowToHigh" ? "bold" : "normal"}}>낮은 가격순</li>
                            </ul>
                        </div>
                    </div>
                    <div id='product_list'>
                        {/* useState로 관리되는 상품 목록을 맵핑하여 렌더링 */}
                        <ul className='pd_list'>
                            {products.map((product) => (
                                <li key={product.productId}>
                                    <div className='pd_info'>
                                        <Link to={`/farmer_market_info/${product.productId}`}>
                                            <img src={product.productimgPath} style={{width: '190px', height: '190px'}}
                                                 alt={product.productimgPath}/>
                                            <p className='pd_name'>
                                                {product.productName}
                                            </p>
                                        </Link>
                                        <p className='pd_price'>
                                            <span className='pr_per'>{product.salenum}% </span>
                                            <span className='pr_num'>{product.productPrice3.toLocaleString()}</span>원
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={'align'}></div>
                    <div id={'page_list'}>
                        <span className={'page_num'}><a>1</a></span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Farmer_market;