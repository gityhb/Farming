import React, {useState, useEffect} from "react";
import {Link, Route} from 'react-router-dom';
import './common/root.css';
import './farmer_market_seller.css';
import {useUser} from "./common/userContext";

function Farmer_market_seller() {

    const [products, setProducts] = useState([]);
    const { user } = useUser(); // 현재 로그인한 사용자 정보
    const [searchQuery,setSearchQuery]=useState("");//검색어 저장하는 상태
    const [selectedSort, setSelectedSort] = useState("newest"); // 현재 선택된 정렬 방식

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

    useEffect(() => {
        /*if (user && user.userId) {
            fetchSellerProducts(user.userId);
        }*/
        if (user && user.id) {
            fetchSellerProducts(user.id);
        }
    }, [user]);

    const fetchSellerProducts = async (sellerId) => {
        try {
            const response = await fetch(`/api/productRG/seller/${sellerId}`);
            if (response.ok) {
                const data = await response.json();
                setProducts(data.reverse());
            } else {
                console.error('상품 정보 가져오기 실패');
            }
        } catch (error) {
            console.error('상품 정보 가져오는 중 오류 발생:', error);
        }
    };

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

    // 등록된 판매 상품이 없는 경우
    if(!products || products.length === 0) {
        return (<div id="body">
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
                                <li className={"set_list"} onClick={handleNewestSort}
                                    style={{fontWeight: selectedSort === "newest" ? "bold" : "normal"}}>판매순
                                </li>
                                <li>|</li>
                                <li className={"set_list"} onClick={handlePopularitySort}
                                    style={{fontWeight: selectedSort === "popularity" ? "bold" : "normal"}}>인기순
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={'product_none'} style={{margin: '250px' }}>아직 등록된 상품이 없습니다</div>
                    <div className={'align'}></div>
                </div>
            </div>
        </div>);
    }


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
                            {products.map(product => (
                                <li key={product.productId}>
                                    <div className={'pd_info'}>
                                        <Link to={`/farmer_market_info_seller/${product.productId}`}>
                                            <img src={product.productimgPath} style={{width: '190px', height: '190px'}}
                                                 alt={product.productName}/>
                                            <p className={'pd_name'}>
                                                {product.productName}
                                            </p>
                                        </Link>
                                        <p className='pd_price'>
                                            <span className='pr_per'>{product.salenum}% </span>
                                            {product.salenum === 0 ? (
                                                <span className='pr_num'>{product.productPrice3.toLocaleString()}원</span>
                                            ) : (
                                                <span>
                                                <span className='pr_num' style={{
                                                    textDecoration: 'line-through',
                                                    fontSize: '12px'
                                                }}>{product.productPrice3.toLocaleString()}원 </span><span>&nbsp;</span>
                                                <span className='pr_num' style={{fontWeight:'bold'}}> {product.productSalePrice.toLocaleString()}원</span>
                                                </span>
                                        )}


                                    </p>

                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Farmer_market_seller;