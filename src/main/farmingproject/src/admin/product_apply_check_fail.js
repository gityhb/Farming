import {useState, useEffect} from "react";
import  './product_apply_check.css';
import '../common/root.css';
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";

function ProductApplyCheckFail() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const [pageGroup, setPageGroup] = useState(1); // 페이지 그룹
    const itemsPerPage = 10; // 한 페이지에 보여줄 아이템 수
    const pagesPerGroup = 10; // 한 그룹당 보여줄 페이지 수

    const [pStatus, setPStatus] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/product?productStatus=2');
            setProducts(response.data);

            // 상태와 색상을 함께 설정
            const statusArray = response.data.map(product => {
                if (product.productStatus === 0) {
                    return { text: '보류', color: '#727272' };
                }
                if (product.productStatus === 1) {
                    return { text: '등록', color: '#55A630' };
                }
                if (product.productStatus === 2) {
                    return { text: '탈락', color: '#ff0000' };
                }
                return { text: '알 수 없음', color: '#fff' };
            });
            setPStatus(statusArray); // 상태 배열 업데이트
        } catch (error) {
            if(error.response) {
                setProducts(null);
            } else {
                console.log("There was an error fetching the products!", error);
            }
        }
    };

    useEffect(() => {
        // 페이지 로드 시 상품 정보 가져오기
        fetchProducts();
    }, []);

    // Handle navigation to the product details page
    const handleProductClick = (productId) => {
        navigate(`/admin/product/${productId}`); // Navigate to the product detail page
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

    // products가 null이 아닌지 확인
    if (!products || products.length === 0) {
        return (<div id="body">
            <div id={'admin_product_apply_check_page'} className={'page'}>
                <div id={'contents'}>
                    <div className={'admin_product_apply_chk_Btn'}>
                        <Link to={"/admin/product_apply_check"}>
                            <div className={'product_apply_all_btn'} style={{backgroundColor: '#fff'}}>전체</div>
                        </Link>
                        <Link to={"/admin/product_apply_check_ing"}>
                            <div className={'product_apply_ing_btn'} style={{backgroundColor: '#fff'}}>심사 보류</div>
                        </Link>
                        <Link to={"/admin/product_apply_check_pass"}>
                            <div className={'product_apply_pass_btn'} style={{backgroundColor: '#fff'}}>상품 등록</div>
                        </Link>
                        <Link to={"/admin/product_apply_check_fail"}>
                            <div className={'product_apply_fail_btn'} style={{backgroundColor: '#FFEA8D'}}>심사 탈락</div>
                        </Link>
                    </div>

                    <div className={'admin_product_apply_chk_div'}>
                        <div className={'admin_product_apply_chk_top'}>
                            <div className={'admin_product_apply_chk_num'}>No.</div>
                            <div className={'admin_product_apply_chk_title'}>상품명</div>
                            <div className={'admin_product_apply_chk_seller'}>판매자</div>
                            <div className={'admin_product_apply_chk_status'}>상태</div>
                        </div>
                    </div>

                    <div className={'product_none'}>아직 등록된 상품이 없습니다</div>

                </div>
            </div>
        </div>);
    }

    // 현재 페이지에 해당하는 항목을 가져옴
    const startIndex = (currentPage - 1) * itemsPerPage;
    const selectedProducts = products.slice(startIndex, startIndex + itemsPerPage);

        return (
            <div id="body">
                <div id={'admin_product_apply_check_page'} className={'page'}>
                    <div id={'contents'}>
                        <div className={'admin_product_apply_chk_Btn'}>
                            <Link to={"/admin/product_apply_check"}>
                                <div className={'product_apply_all_btn'} style={{backgroundColor: '#fff'}}>전체</div>
                            </Link>
                            <Link to={"/admin/product_apply_check_ing"}>
                                <div className={'product_apply_ing_btn'} style={{backgroundColor: '#fff'}}>심사 보류</div>
                            </Link>
                            <Link to={"/admin/product_apply_check_pass"}>
                                <div className={'product_apply_pass_btn'} style={{backgroundColor: '#fff'}}>상품 등록</div>
                            </Link>
                            <Link to={"/admin/product_apply_check_fail"}>
                                <div className={'product_apply_fail_btn'} style={{backgroundColor: '#FFEA8D'}}>심사 탈락</div>
                            </Link>
                        </div>

                        <div className={'admin_product_apply_chk_div'}>
                            <div className={'admin_product_apply_chk_top'}>
                                <div className={'admin_product_apply_chk_num'}>No.</div>
                                <div className={'admin_product_apply_chk_title'}>상품명</div>
                                <div className={'admin_product_apply_chk_seller'}>판매자</div>
                                <div className={'admin_product_apply_chk_status'}>상태</div>
                            </div>

                            {selectedProducts.map((product, index) => (
                                <div key={product.productId} className={'admin_product_apply_chk_inner'}
                                     onClick={() => handleProductClick(product.productId)}>
                                    <div className={'admin_product_apply_chk_inner_content'}>
                                        <div className={'admin_product_apply_chk_inner_num'}>{product.productId}</div>
                                        <div
                                            className={'admin_product_apply_chk_inner_title'}>{product.productName}</div>
                                        <div
                                            className={'admin_product_apply_chk_inner_seller'}>{product.sellerName}</div>
                                        <div className={'admin_product_apply_chk_inner_status'}
                                             style={{color: pStatus[index]?.color}}>{pStatus[index]?.text}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* 페이지네이션 */}
                        <div className={'admin_product_apply_chk_pagenation'}>
                            {/* << 화살표, 페이지 그룹 이동 */}
                            {pageGroup > 1 && (
                                <button className={'admin_product_apply_chk_pagenation_btn'}
                                        onClick={() => handleGroupChange('prev')}><img src={'/img/etc/arrowL.png'}
                                                                                       style={{width: '10px'}}/>
                                </button>
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
                                <button className={'admin_product_apply_chk_pagenation_btn'}
                                        onClick={() => handleGroupChange('next')}><img src={'/img/etc/arrowR.png'}
                                                                                       style={{width: '10px'}}/>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
}

export default ProductApplyCheckFail;