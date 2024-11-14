import React, {useState, useEffect} from "react";
import  './admin/product_apply_check_detail.css';
import './farmer_product_apply.css';
import './product_apply_list_detail.css';
import './common/root.css';
import axios from "axios";
import {redirect, useParams} from "react-router-dom";
import ProductRegisterModal from "./product_register_modal";

function ProductApplyCheckDetail() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [productRG, setProductRG] = useState(null);
    const [pStatus, setPStatus] = useState(null);  // productStatus 상태 관리
    const [productImagesLists, setProductImagesLists] = useState([]);   // 상품 이미지들 저장
    const [isEditing, setIsEditing] = useState(false);  // 상품 정보 수정
    const [showModal, setShowModal] = useState(false);

    const [form, setForm] = useState({
        productPrice1: "",
        productPrice2: "",
        productPrice3: "",
        productDeliveryDate: "",
        salenum: "",
    });

    const handleUpdateChange = (e) => {
        const {name, value} = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    };

    const handleUpdateToggle = () => {
        setIsEditing(!isEditing);
    }

    // 판매 상품 정보 수정
    const submitUpdate = async () => {
        try {
            const updatedProductRGData = {
                productId: productRG.productId,     // 수정할 상품 고유 ID
                productPrice1: form.productPrice1,
                productPrice2: form.productPrice2,
                productPrice3: form.productPrice3,
                productDeliveryDate: form.productDeliveryDate,
                salenum: form.salenum,
            };

            const productRGResponse = await axios.put(`/api/productRG/${productRG.productId}/update_product`, updatedProductRGData);
            if (productRGResponse.data) {
                alert("상품 정보가 성공적으로 수정되었습니다.");
                window.location.reload();
            } else {
                alert("상품 정보 수정에 실패했습니다.");
            }

            setIsEditing(false);
        } catch (error) {
            // console.log("상품 정보 수정 오류: ", error);
            if (error.response) {
                // 요청이 이루어졌고, 서버가 상태 코드로 응답했지만, 요청이 실패한 경우
                console.error("Error Data: ", error.response.data);
                console.error("Error Status: ", error.response.status);
                console.error("Error Headers: ", error.response.headers);
            } else if (error.request) {
                // 요청이 이루어졌지만, 응답이 오지 않은 경우
                console.error("Error Request: ", error.request);
                console.error("No response received:", error.message);
            } else {
                // 오류가 발생하기 전 설정한 요청을 처리할 수 없는 경우
                console.error("Error Message: ", error.message);
            }
            console.log("There was an error fetching the product_detail!: ", error);
            alert("상품 정보를 수정하는 중 오류가 발생했습니다.");
        }
    }

    const handleRegisterClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    console.log("productId : ", productId)

    // 상품 상태
    const getPStatusObject = (status) => {
        switch (parseInt(status)) {
            case 0:
                return { text: '보류', color: '#727272' };
            case 1:
                return { text: '등록', color: '#55A630' };
            case 2:
                return { text: '탈락', color: '#ff0000' };
            case 3:
                return { text: '판매 등록 완료', color: '#55A630' };
            default:
                return { text: '알 수 없음', color: '#fff' };
        }
    };

    // 상품 배송
    const getPDeliveryDate = (deliveryDate) => {
        switch (deliveryDate) {
            case 'today' :
                return '오늘 배송';
            case 'tomorrow' :
                return '내일 배송';
            case 'etc' :
                return '상시 배송';
            default :
                return '배송 정보 없음';
        }
    };

    // 상품 가격 단위
    const getPPrice2 = (unit) => {
        switch (unit) {
            case 'g' :
                return 'g';
            case 'kg' :
                return 'kg';
            case 'ea' :
                return '개';
            case 'bunch' :
                return '송이';
            case 'bag' :
                return '봉지';
            case 'pack' :
                return '팩';
            case 'box' :
                return '박스';
            default :
                return '단위 정보 없음';
        }
    };

    // 상품 등록 신청 현황
    const fetchProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/product/${productId}`);
            setProduct(response.data);
            setPStatus(response.data.productStatus);
        } catch (error) {
            if (error.response) {
                // 요청이 이루어졌고, 서버가 상태 코드로 응답했지만, 요청이 실패한 경우
                console.error("Error Data: ", error.response.data);
                console.error("Error Status: ", error.response.status);
                console.error("Error Headers: ", error.response.headers);
            } else if (error.request) {
                // 요청이 이루어졌지만, 응답이 오지 않은 경우
                console.error("Error Request: ", error.request);
                console.error("No response received:", error.message);
            } else {
                // 오류가 발생하기 전 설정한 요청을 처리할 수 없는 경우
                console.error("Error Message: ", error.message);
            }
            console.log("There was an error fetching the product_detail!: ", error);
        }
    }

    // 상품 이미지
    const fetchProductImagesLists = async () => {
        console.log("productId : ", productId);
        try {
            const response = await axios.get(`http://localhost:8080/api/product_img/${productId}/list`)
            setProductImagesLists(response.data);
        } catch (error) {
            console.log('Error fetching productImagesLists : ', error);
        }
    }

    // 판매 상품 정보
    const fetchProductRG = async () => {
        try {
            console.log(`Fetching product details for ID: ${productId}`);
            const response = await fetch(`/api/productRG/${productId}`);
            const data = await  response.json();
            setProductRG(data);
        } catch (error) {
            console.log('Error fetching productRG : ', error);
        }
    }

    useEffect(() => {
        // 페이지 로드 시 상품 정보 가져오기
        fetchProduct();
        fetchProductImagesLists();
    }, [productId]);

    useEffect(()=> {
        if(pStatus === 3) {
            fetchProductRG();
        }
    }, [pStatus])   // 상품

    useEffect(() => {
        if (productRG) {
            setForm({
                productPrice1: productRG.productPrice1,
                productPrice2: productRG.productPrice2,
                productPrice3: productRG.productPrice3,
                productDeliveryDate: productRG.productDeliveryDate,
                salenum: productRG.salenum,
            });
        }
    }, [productRG]);  // productRG가 변경될 때마다 form 업데이트

    // 상품 등록 후 productStatus를 업데이트하는 함수
    const handleStatusChange = (newStatus) => {
        setPStatus(newStatus); // 상태 변경
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    const pdStatus = getPStatusObject(pStatus);

    return (
    <div id="body">
        <div id={'prouct_apply_list_detail_page'} className={'page'}>
            <div id={'contents'}>
                <div className="product_apply_list_title">
                    <h1>상품 상세 정보</h1>
                </div>
                <div className={'product_apply_list_img_box'}>
                    <div className={'product_img_show'} id={'product_img_show'}>
                        {productImagesLists.length > 0 ? (
                            productImagesLists.map((productImage) => (
                                <div key={productImage.productImageId} className={'product_img_list'}>
                                    <img src={`http://localhost:8080${productImage.productImagePath}`} className={'product_img'} alt={productImage.productImagePath} />
                                </div>
                            ))
                        ): (<div>이미지가 없습니다.</div>
                        )}
                    </div>
                    {/*<div id={'product_file_input'}>*/}
                    {/*    <p>FILE NAME : </p>*/}
                    {/*    {fileNames.map((name, index) => (*/}
                    {/*        <p key={index} id={'product_file_name'}>*/}
                    {/*            {name}*/}
                    {/*        </p>*/}
                    {/*    ))}*/}
                    {/*</div>*/}
                </div>
                <table className="product_apply_list_table">
                    <tbody>
                    <tr>
                        <td className="product_apply_list_detail_title">상품번호</td>
                        <td className="product_apply_list_detail_info">
                            {product.productId}
                        </td>
                    </tr>
                    <tr>
                        <td className="product_apply_list_detail_title">상품명</td>
                        <td className="product_apply_list_detail_info">
                            {product.productName}
                        </td>
                    </tr>
                    <tr>
                        <td className="product_apply_list_detail_title">판매자</td>
                        <td className="product_apply_list_detail_info">{product.sellerName}</td>
                    </tr>
                    <tr>
                        <td className="product_apply_list_detail_title">가게명</td>
                        <td className="product_apply_list_detail_info">{product.storeName}</td>
                    </tr>
                    <tr>
                        <td className="product_apply_list_detail_title">상품가격</td>
                        <td className="product_apply_list_detail_info">
                            {product.productPrice1}{getPPrice2(product.productPrice2)} / {product.productPrice3}원
                        </td>
                    </tr>
                    <tr>
                        <td className="product_apply_list_detail_title">원산지</td>
                        <td className="product_apply_list_detail_info">
                            {product.productOrigin}
                        </td>
                    </tr>
                    <tr>
                        <td className="product_apply_list_detail_title">배송날짜</td>
                        <td className="product_apply_list_detail_info">
                            {getPDeliveryDate(product.productDeliveryDate)}
                        </td>
                    </tr>
                    <tr>
                        <td className="product_apply_list_detail_title">상품정보</td>
                        <td className="product_apply_list_detail_info">
                            {product.productInfo}
                        </td>
                    </tr>
                    <tr>
                        <td className="product_apply_list_detail_title">상태</td>
                        <td className="product_apply_list_detail_info"
                            style={{display: 'table-cell', color: pdStatus.color}}>
                            {pdStatus.text}
                            {/*등록되지 않은 경우에만 등록하기 버튼 표시*/}
                            {pStatus === 1 &&
                                <button className={"product_pass_enroll_btn"} onClick={handleRegisterClick}>상품
                                    등록</button>}
                        </td>
                    </tr>
                    <tr>
                        <td className="product_apply_list_detail_title">등록일</td>
                        <td className="product_apply_list_detail_info">
                            {product.productCreatedDate}
                        </td>
                    </tr>
                    </tbody>
                </table>
                {showModal && <ProductRegisterModal product={product} onClose={handleCloseModal} onStatusChange={handleStatusChange}/>}

                {/*상품 판매 등록 완료일 경우 판매 상품 정보 출력*/}
                {pStatus === 3 && productRG && (
                    <div style={{marginBottom: '70px'}}>
                        <div>상품 판매 정보</div>
                        <table className="product_apply_list_table" style={{marginBottom: '20px'}}>
                            <tbody>
                            <tr>
                                <td className="product_apply_list_detail_title">판매번호</td>
                                <td className="product_apply_list_detail_info">
                                    {productRG.productId}
                                </td>
                            </tr>
                            <tr>
                                <td className="product_apply_list_detail_title">상품번호</td>
                                <td className="product_apply_list_detail_info">
                                    {productRG.product.productId}
                                </td>
                            </tr>
                            <tr>
                                <td className="product_apply_list_detail_title">상품명</td>
                                <td className="product_apply_list_detail_info">
                                    {productRG.productName}
                                </td>
                            </tr>
                            <tr>
                                <td className="product_apply_list_detail_title">판매자</td>
                                <td className="product_apply_list_detail_info">{productRG.sellerName}</td>
                            </tr>
                            <tr>
                                <td className="product_apply_list_detail_title">가게명</td>
                                <td className="product_apply_list_detail_info">{productRG.storeName}</td>
                            </tr>
                            <tr>
                                <td className="product_apply_list_detail_title">상품가격</td>
                                <td className="product_apply_list_detail_info">
                                    {isEditing ? (
                                        <div>
                                            <input
                                                type="number"
                                                name={"productPrice1"}
                                                value={form.productPrice1}
                                                onChange={handleUpdateChange}
                                                placeholder="0"
                                                className={"edit_text"}
                                                style={{width: '100px', marginRight: '5px'}}
                                            />
                                            <select name={"productPrice2"} value={form.productPrice2}
                                                    onChange={handleUpdateChange}
                                                    className={"edit_text"}
                                                    style={{width: '90px', marginRight: '5px'}}>
                                                <option value={'g'}>g</option>
                                                <option value={'kg'}>kg</option>
                                                <option value={'ea'}>개</option>
                                                <option value={'bunch'}>송이</option>
                                                <option value={'bag'}>봉지</option>
                                                <option value={'pack'}>팩</option>
                                                <option value={'box'}>박스</option>
                                            </select>
                                            <input
                                                type="number"
                                                name={"productPrice3"}
                                                value={form.productPrice3}
                                                onChange={handleUpdateChange}
                                                placeholder="0"
                                                className={"edit_text"}
                                                style={{width: '100px'}}
                                            />
                                            <span> 원</span>
                                        </div>
                                    ) : (
                                        ` ${productRG.productPrice1}${getPPrice2(productRG.productPrice2)} / ${productRG.productPrice3}원`
                                    )}

                                </td>
                            </tr>
                            <tr>
                                <td className="product_apply_list_detail_title">원산지</td>
                                <td className="product_apply_list_detail_info">
                                    {productRG.productOrigin}
                                </td>
                            </tr>
                            <tr>
                                <td className="product_apply_list_detail_title">배송날짜</td>
                                <td className="product_apply_list_detail_info">
                                    {isEditing ? (
                                        <select name={"productDeliveryDate"} value={form.productDeliveryDate}
                                                onChange={handleUpdateChange}
                                                className={"edit_text"}
                                                style={{width: '110px'}}>
                                            <option value={'today'}>당일</option>
                                            <option value={'tomorrow'}>내일</option>
                                            <option value={'etc'}>상시배송</option>
                                        </select>
                                    ) : (
                                        `${getPDeliveryDate(productRG.productDeliveryDate)}`
                                    )}

                                </td>
                            </tr>
                            <tr>
                                <td className="product_apply_list_detail_title">할인율</td>
                                <td className="product_apply_list_detail_info">
                                    {isEditing ? (
                                        <div>
                                            <input type={"number"} name={"salenum"} value={form.salenum} className={"edit_text"}
                                                   onChange={handleUpdateChange}
                                                    style={{width: '100px'}}/>
                                            <span> %</span>
                                        </div>
                                    ) : (
                                        `${productRG.salenum}%`
                                    )}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        {isEditing ? (
                            <button className={"product_apply_list_detail_btn"} onClick={submitUpdate}>저장하기</button>
                        ) : (
                            <button className={"product_apply_list_detail_btn"} onClick={handleUpdateToggle}>수정하기</button>
                        )}

                    </div>
                )}
            </div>
        </div>
    </div>
    );
}

export default ProductApplyCheckDetail;