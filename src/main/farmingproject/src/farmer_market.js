import React, {useState, useEffect} from "react";
import {Link, Route} from 'react-router-dom';
import axios from "axios";
import './common/root.css';
import './farmer_market.css';

function Farmer_market() {
    const [searchQuery, setSearchQuery] = useState("");
    const [products, setProducts] = useState([]);

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("/api/productRG/get_productRG");
                setProducts(response.data);
            } catch (error) {
                console.error("제품 로드 중 에러 발생:", error);
            }
        };
        fetchProducts();
    }, []);

    // 검색 버튼 클릭 시 실행되는 함수
    // const handleSearch = async () => {
    //     try {
    //         const response = await axios.get(`/api/search?query=${searchQuery}`);
    //         setProducts(response.data); // 서버에서 검색된 제품 리스트로 상태 업데이트
    //     } catch (error) {
    //         console.error("검색 중 에러 발생:", error);
    //     }
    // };
    //
    // useEffect(() => {
    //     // 페이지 로드 시 모든 제품을 기본으로 로드
    //     const fetchProducts = async () => {
    //         try {
    //             const response = await axios.get("/api/products");
    //             setProducts(response.data);
    //         } catch (error) {
    //             console.error("제품 로드 중 에러 발생:", error);
    //         }
    //     };
    //     fetchProducts();
    // }, []);
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
                                <li>일반마켓</li>
                            </ul>
                        </div>
                        <div id={'page_location'}>
                            <ul>
                                <li>판매순</li>
                                <li>|</li>
                                <li>인기순</li>
                                <li>|</li>
                                <li>낮은 가격순</li>
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
                    <div id={'page_list'}>
                        <span className={'page_num'}><a>1</a></span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Farmer_market;