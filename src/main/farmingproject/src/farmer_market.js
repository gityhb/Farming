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

// import {useState, useEffect} from "react";
// import {Link, Route} from 'react-router-dom';
// import './common/root.css';
// import './farmer_market.css';
//
// function Farmer_market() {
//
//     return (
//         <div id={'body'}>
//             <div id={'farmer_market_page'} className={'page'}>
//                 <div id={'contents'}>
//                     <div id={'search_box'}>
//                         <input type={'text'} id={'search_query'} placeholder={'검색 내용을 입력하세요'}/>
//                         <button id={'search_btn'}><img src="img/etc/search.png" alt={"search_btn"}/> </button>
//                     </div>
//                     <div id={'align_box'}>
//                         <div id={'category_box'}>
//                             <ul>
//                                 <li>일반마켓</li>
//                             </ul>
//                         </div>
//                         <div id={'page_location'}>
//                             <ul>
//                                 <li>판매순</li>
//                                 <li>|</li>
//                                 <li>인기순</li>
//                                 <li>|</li>
//                                 <li>낮은 가격순</li>
//                             </ul>
//                         </div>
//                     </div>
//                     <div id={'product_list'}>
//                         {/*첫번째 줄*/}
//                         <ul className={'pd_list'}>
//                             <li>
//                                 <div className={'pd_info'}>
//                                     <Link to={"/farmer_market_info"}>
//                                         <img src={'img/watermelon.png'} style={{width: '190px', height: '190px'}}/>
//                                         <p className={'pd_name'}>
//                                             프리미엄 고당도 수박 1통
//                                         </p>
//                                     </Link>
//                                     <p className={'pd_price'}>
//                                         <span className={'pr_per'}>27% </span>
//                                         <span className={'pr_num'}>18,900</span>원
//                                     </p>
//                                 </div>
//                             </li>
//                             <li>
//                                 <div className={'pd_info'}>
//                                     <a href={'/'}>
//                                         <img src={'img/apple_2.png'}/>
//                                         <p className={'pd_name'}>
//                                             충주 부사 사과 4개
//                                         </p>
//                                     </a>
//                                     <p className={'pd_price'}>
//                                         <span className={'pr_per'}>5% </span>
//                                         <span className={'pr_num'}>15,000</span>원
//                                     </p>
//                                 </div>
//                             </li>
//                             <li>
//                                 <div className={'pd_info'}>
//                                     <a href={'/'}>
//                                         <img src={'img/pumpkin.png'}/>
//                                         <p className={'pd_name'}>
//                                             미니 단호박 10개
//                                         </p>
//                                     </a>
//                                     <p className={'pd_price'}>
//                                         <span className={'pr_per'}>20% </span>
//                                         <span className={'pr_num'}>10,000</span>원
//                                     </p>
//                                 </div>
//                             </li>
//                             <li>
//                                 <div className={'pd_info'}>
//                                     <a href={'/'}>
//                                         <img src={'img/bell_pepper.png'}/>
//                                         <p className={'pd_name'}>
//                                             노란 파프리카 1BOX
//                                         </p>
//                                     </a>
//                                     <p className={'pd_price'}>
//                                         <span className={'pr_per'}>10% </span>
//                                         <span className={'pr_num'}>18,900</span>원
//                                     </p>
//                                 </div>
//                             </li>
//                         </ul>
//                         {/*두번째 줄*/}
//                         <ul className={'pd_list'}>
//                             <li>
//                                 <div className={'pd_info'}>
//                                     <a href={'/'}>
//                                         <img src={'img/zucchini_2.png'}/>
//                                         <p className={'pd_name'}>
//                                             애호박 1BOX
//                                         </p>
//                                     </a>
//                                     <p className={'pd_price'}>
//                                         <span className={'pr_per'}>10% </span>
//                                         <span className={'pr_num'}>30,000</span>원
//                                     </p>
//                                 </div>
//                             </li>
//                             <li>
//                                 <div className={'pd_info'}>
//                                     <a href={'/'}>
//                                         <img src={'img/onion.png'}/>
//                                         <p className={'pd_name'}>
//                                             양파 1망
//                                         </p>
//                                     </a>
//                                     <p className={'pd_price'}>
//                                         <span className={'pr_per'}>15% </span>
//                                         <span className={'pr_num'}>18,000</span>원
//                                     </p>
//                                 </div>
//                             </li>
//                             <li>
//                                 <div className={'pd_info'}>
//                                     <a href={'/'}>
//                                         <img src={'img/napa_cabbage.png'}/>
//                                         <p className={'pd_name'}>
//                                             해남 배추 1망(3개입)
//                                         </p>
//                                     </a>
//                                     <p className={'pd_price'}>
//                                         <span className={'pr_per'}>23% </span>
//                                         <span className={'pr_num'}>20,500</span>원
//                                     </p>
//                                 </div>
//                             </li>
//                             <li>
//                                 <div className={'pd_info'}>
//                                     <a href={'/'}>
//                                         <img src={'img/grape.png'}/>
//                                         <p className={'pd_name'}>
//                                             김천 샤인머스캣 1BOX
//                                         </p>
//                                     </a>
//                                     <p className={'pd_price'}>
//                                         <span className={'pr_per'}>50% </span>
//                                         <span className={'pr_num'}>8,000</span>원
//                                     </p>
//                                 </div>
//                             </li>
//                         </ul>
//                         {/*세번째 줄*/}
//                         <ul className={'pd_list'}>
//                             <li>
//                                 <div className={'pd_info'}>
//                                     <a href={'/'}>
//                                         <img src={'img/aralia.png'}/>
//                                         <p className={'pd_name'}>
//                                             순창 두릅 1팩
//                                         </p>
//                                     </a>
//                                     <p className={'pd_price'}>
//                                         <span className={'pr_per'}>10% </span>
//                                         <span className={'pr_num'}>5,000</span>원
//                                     </p>
//                                 </div>
//                             </li>
//                             <li>
//                                 <div className={'pd_info'}>
//                                     <a href={'/'}>
//                                         <img src={'img/shishito_pepper.png'}/>
//                                         <p className={'pd_name'}>
//                                             꽈리고추 1BOX
//                                         </p>
//                                     </a>
//                                     <p className={'pd_price'}>
//                                         <span className={'pr_per'}>10% </span>
//                                         <span className={'pr_num'}>15,000</span>원
//                                     </p>
//                                 </div>
//                             </li>
//                             <li>
//                                 <div className={'pd_info'}>
//                                     <a href={'/'}>
//                                         <img src={'img/snow_white_strawberry.png'}/>
//                                         <p className={'pd_name'}>
//                                             백설향 딸기 2팩
//                                         </p>
//                                     </a>
//                                     <p className={'pd_price'}>
//                                         <span className={'pr_per'}>20% </span>
//                                         <span className={'pr_num'}>10,000</span>원
//                                     </p>
//                                 </div>
//                             </li>
//                             <li>
//                                 <div className={'pd_info'}>
//                                     <a href={'/'}>
//                                         <img src={'img/strawberry_3.png'}/>
//                                         <p className={'pd_name'}>
//                                             프리미엄 딸기 3팩
//                                         </p>
//                                     </a>
//                                     <p className={'pd_price'}>
//                                         <span className={'pr_per'}>45% </span>
//                                         <span className={'pr_num'}>4,500</span>원
//                                     </p>
//                                 </div>
//                             </li>
//                         </ul>
//                         {/*네번째 줄*/}
//                         <ul className={'pd_list'}>
//                             <li>
//                                 <div className={'pd_info'}>
//                                     <a href={'/'}>
//                                         <img src={'img/soft_persimmon.png'}/>
//                                         <p className={'pd_name'}>
//                                             프리미엄 고당도 수박
//                                         </p>
//                                     </a>
//                                     <p className={'pd_price'}>
//                                         <span className={'pr_per'}>27% </span>
//                                         <span className={'pr_num'}>18,900</span>원
//                                     </p>
//                                 </div>
//                             </li>
//                             <li>
//                                 <div className={'pd_info'}>
//                                     <a href={'/'}>
//                                         <img src={'img/carrot_2.png'}/>
//                                         <p className={'pd_name'}>
//                                             프리미엄 고당도 수박
//                                         </p>
//                                     </a>
//                                     <p className={'pd_price'}>
//                                         <span className={'pr_per'}>27% </span>
//                                         <span className={'pr_num'}>18,900</span>원
//                                     </p>
//                                 </div>
//                             </li>
//                             <li>
//                                 <div className={'pd_info'}>
//                                     <a href={'/'}>
//                                         <img src={'img/cucumber.png'}/>
//                                         <p className={'pd_name'}>
//                                             프리미엄 고당도 수박
//                                         </p>
//                                     </a>
//                                     <p className={'pd_price'}>
//                                         <span className={'pr_per'}>27% </span>
//                                         <span className={'pr_num'}>18,900</span>원
//                                     </p>
//                                 </div>
//                             </li>
//                             <li>
//                                 <div className={'pd_info'}>
//                                     <a href={'/'}>
//                                         <img src={'img/peach_1.jpg'}/>
//                                         <p className={'pd_name'}>
//                                             프리미엄 고당도 수박
//                                         </p>
//                                     </a>
//                                     <p className={'pd_price'}>
//                                         <span className={'pr_per'}>27% </span>
//                                         <span className={'pr_num'}>18,900</span>원
//                                     </p>
//                                 </div>
//                             </li>
//                         </ul>
//                         {/*다섯번째 줄*/}
//                         <ul className={'pd_list'}>
//                             <li>
//                                 <div className={'pd_info'}>
//                                     <a href={'/'}>
//                                         <img src={'img/cucumber.png'}/>
//                                         <p className={'pd_name'}>
//                                             오이지오이 10kg
//                                         </p>
//                                     </a>
//                                     <p className={'pd_price'}>
//                                         <span className={'pr_per'}>15% </span>
//                                         <span className={'pr_num'}>12,900</span>원
//                                     </p>
//                                 </div>
//                             </li>
//                             <li>
//                                 <div className={'pd_info'}>
//                                     <a href={'/'}>
//                                         <img src={'img/cucumber.png'}/>
//                                         <p className={'pd_name'}>
//                                             오이지오이 10kg
//                                         </p>
//                                     </a>
//                                     <p className={'pd_price'}>
//                                         <span className={'pr_per'}>15% </span>
//                                         <span className={'pr_num'}>12,900</span>원
//                                     </p>
//                                 </div>
//                             </li>
//                             <li>
//                                 <div className={'pd_info'}>
//                                     <a href={'/'}>
//                                         <img src={'img/cucumber.png'}/>
//                                         <p className={'pd_name'}>
//                                             오이지오이 10kg
//                                         </p>
//                                     </a>
//                                     <p className={'pd_price'}>
//                                         <span className={'pr_per'}>15% </span>
//                                         <span className={'pr_num'}>12,900</span>원
//                                     </p>
//                                 </div>
//                             </li>
//                             <li>
//                                 <div className={'pd_info'}>
//                                     <a href={'/'}>
//                                         <img src={'img/cucumber.png'}/>
//                                         <p className={'pd_name'}>
//                                             오이지오이 10kg
//                                         </p>
//                                     </a>
//                                     <p className={'pd_price'}>
//                                         <span className={'pr_per'}>15% </span>
//                                         <span className={'pr_num'}>12,900</span>원
//                                     </p>
//                                 </div>
//                             </li>
//                         </ul>
//                         {/*여섯번째 줄*/}
//                         <ul className={'pd_list'}>
//                             <li>
//                                 <div className={'pd_info'}>
//                                     <a href={'/'}>
//                                         <img src={'img/snow_white_strawberry.png'}/>
//                                         <p className={'pd_name'}>
//                                             백설향 딸기
//                                         </p>
//                                     </a>
//                                     <p className={'pd_price'}>
//                                         <span className={'pr_per'}>40% </span>
//                                         <span className={'pr_num'}>5,000</span>원
//                                     </p>
//                                 </div>
//                             </li>
//                             <li>
//                                 <div className={'pd_info'}>
//                                     <a href={'/'}>
//                                         <img src={'img/snow_white_strawberry.png'}/>
//                                         <p className={'pd_name'}>
//                                             백설향 딸기
//                                         </p>
//                                     </a>
//                                     <p className={'pd_price'}>
//                                         <span className={'pr_per'}>40% </span>
//                                         <span className={'pr_num'}>5,000</span>원
//                                     </p>
//                                 </div>
//                             </li>
//                             <li>
//                                 <div className={'pd_info'}>
//                                     <a href={'/'}>
//                                         <img src={'img/snow_white_strawberry.png'}/>
//                                         <p className={'pd_name'}>
//                                             백설향 딸기
//                                         </p>
//                                     </a>
//                                     <p className={'pd_price'}>
//                                         <span className={'pr_per'}>40% </span>
//                                         <span className={'pr_num'}>5,000</span>원
//                                     </p>
//                                 </div>
//                             </li>
//                             <li>
//                                 <div className={'pd_info'}>
//                                     <a href={'/'}>
//                                         <img src={'img/snow_white_strawberry.png'}/>
//                                         <p className={'pd_name'}>
//                                             백설향 딸기
//                                         </p>
//                                     </a>
//                                     <p className={'pd_price'}>
//                                         <span className={'pr_per'}>40% </span>
//                                         <span className={'pr_num'}>5,000</span>원
//                                     </p>
//                                 </div>
//                             </li>
//                         </ul>
//                         {/*일곱번째 줄*/}
//                         <ul className={'pd_list'}>
//                             <li>
//                                 <div className={'pd_info'}>
//                                     <a href={'/'}>
//                                         <img src={'img/zucchini_2.png'}/>
//                                         <p className={'pd_name'}>
//                                             국내산 애호박 5개
//                                         </p>
//                                     </a>
//                                     <p className={'pd_price'}>
//                                         <span className={'pr_per'}>10% </span>
//                                         <span className={'pr_num'}>4,500</span>원
//                                     </p>
//                                 </div>
//                             </li>
//                             <li>
//                                 <div className={'pd_info'}>
//                                     <a href={'/'}>
//                                         <img src={'img/zucchini_2.png'}/>
//                                         <p className={'pd_name'}>
//                                             국내산 애호박 5개
//                                         </p>
//                                     </a>
//                                     <p className={'pd_price'}>
//                                         <span className={'pr_per'}>10% </span>
//                                         <span className={'pr_num'}>4,500</span>원
//                                     </p>
//                                 </div>
//                             </li>
//                             <li>
//                                 <div className={'pd_info'}>
//                                     <a href={'/'}>
//                                         <img src={'img/zucchini_2.png'}/>
//                                         <p className={'pd_name'}>
//                                             국내산 애호박 5개
//                                         </p>
//                                     </a>
//                                     <p className={'pd_price'}>
//                                         <span className={'pr_per'}>10% </span>
//                                         <span className={'pr_num'}>4,500</span>원
//                                     </p>
//                                 </div>
//                             </li>
//                             <li>
//                                 <div className={'pd_info'}>
//                                     <a href={'/'}>
//                                         <img src={'img/zucchini_2.png'}/>
//                                         <p className={'pd_name'}>
//                                             국내산 애호박 5개
//                                         </p>
//                                     </a>
//                                     <p className={'pd_price'}>
//                                         <span className={'pr_per'}>10% </span>
//                                         <span className={'pr_num'}>4,500</span>원
//                                     </p>
//                                 </div>
//                             </li>
//
//                         </ul>
//                     </div>
//                     <div id={'page_list'}>
//                         <span className={'page_num'}><a>1</a></span>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
//
// export default Farmer_market;