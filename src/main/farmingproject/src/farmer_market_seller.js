import React, {useState, useEffect} from "react";
import {Link, Route} from 'react-router-dom';
import './common/root.css';
import './farmer_market_seller.css';
import {useUser} from "./common/userContext";

function Farmer_market_seller() {

    const [products, setProducts] = useState([]);
    const { user } = useUser(); // 현재 로그인한 사용자 정보
    const [searchQuery,setSearchQuery]=useState("");//검색어 저장하는 상태

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
                                        <span className='pr_num'>{product.productPrice3.toLocaleString()}</span>원
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