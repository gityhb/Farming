import React, {useState, useEffect} from "react";
import {Link, Route} from 'react-router-dom';
import axios from "axios";
import './common/root.css';
import './farmer_market.css';
import {portalClassName} from "react-modal/lib/components/Modal";

function Farmer_market() {
    const [searchQuery, setSearchQuery] = useState("");
    const [products, setProducts] = useState([]);
    const [selectedSort, setSelectedSort] = useState("newest"); // 현재 선택된 정렬 방식
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const [pageGroup, setPageGroup] = useState(1); // 페이지 그룹
    const itemsPerPage = 20; // 한 페이지에 보여줄 아이템 수
    const pagesPerGroup = 10; // 한 그룹당 보여줄 페이지 수


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

    // 페이지 변경 시 호출되는 함수
    const handlePageChange = (pageNum) => {
        setCurrentPage(pageNum);
    };

    // 페이지 그룹 이동 함수 (<<, >> 버튼 클릭 시)
    const handleGroupChange = (direction) => {
        if (direction === 'next') {
            setPageGroup(pageGroup + 1);
            setCurrentPage((pageGroup + 1) * pagesPerGroup - (pagesPerGroup - 1));
        } else if (direction === 'prev') {
            setPageGroup(pageGroup - 1);
            setCurrentPage((pageGroup - 1) * pagesPerGroup - (pagesPerGroup - 1));
        }
    };

    // 현재 페이지에 보여줄 상품 리스트 추출
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // 총 페이지 수 계산
    const totalPages = Math.ceil(products.length / itemsPerPage);

    // 현재 그룹에 해당하는 페이지 번호들 계산
    const startPage = (pageGroup - 1) * pagesPerGroup + 1;
    const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

    // 현재 페이지에 해당하는 항목을 가져옴
    const startIndex = (currentPage - 1) * itemsPerPage;
    const selectedProducts = products.slice(startIndex, startIndex + itemsPerPage);

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
                                <li>|</li>
                                <li className={"set_list"} onClick={handlePriceSort}
                                    style={{fontWeight: selectedSort === "priceLowToHigh" ? "bold" : "normal"}}>낮은 가격순
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={'product_none'}>아직 등록된 상품이 없습니다</div>
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
                                <li>|</li>
                                <li className={"set_list"} onClick={handlePriceSort} style={{ fontWeight: selectedSort === "priceLowToHigh" ? "bold" : "normal"}}>낮은 가격순</li>
                            </ul>
                        </div>
                    </div>
                    <div id='product_list'>
                        {/* useState로 관리되는 상품 목록을 맵핑하여 렌더링 */}
                        <ul className='pd_list'>
                            {selectedProducts.map((product) => (
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
                                            <span className='pr_num'>{product.productSalePrice.toLocaleString()}</span>원
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={'align'}></div>
                    {/* 페이지네이션 */}
                    <div className={'admin_product_apply_chk_pagenation'}>
                        {/* << 화살표, 페이지 그룹 이동 */}
                        {pageGroup > 1 && (
                            <button className={'admin_product_apply_chk_pagenation_btn'} onClick={() => handleGroupChange('prev')}><img src={'/img/etc/arrowL.png'} style={{width: '10px'}}/></button>
                        )}

                        {/* 개별 페이지 번호 */}
                        {[...Array(endPage - startPage + 1)].map((_, idx) => {
                            const pageNum = startPage + idx;
                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => handlePageChange(pageNum)}
                                    className={currentPage === pageNum ? 'admin_product_apply_chk_pagenation_btn_active admin_product_apply_chk_pagenation_btn' : 'admin_product_apply_chk_pagenation_btn'}>
                                    {pageNum}
                                </button>
                            );
                        })}

                        {/* >> 화살표, 페이지 그룹 이동 */}
                        {endPage < totalPages && (
                            <button className={'admin_product_apply_chk_pagenation_btn'} onClick={() => handleGroupChange('next')}><img src={'/img/etc/arrowR.png'} style={{width: '10px'}}/></button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Farmer_market;