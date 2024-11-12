import React, {useState, useEffect} from "react";
import  './product_apply_check_detail.css';
import '../common/root.css';
import axios from "axios";
import {useParams} from "react-router-dom";
import ProductRegisterModal from '../product_register_modal'
import Modal from "react-modal";
import DaumPostcode from "react-daum-postcode";

function ProductApplyCheckDetail() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [pStatus, setPStatus] = useState({text:'', color:''});
    const [productImagesLists, setProductImagesLists] = useState([]);   // 상품 이미지들 저장
    const [productStatus, setProductStatus] = useState(''); // 상태 저장
    const [showModal, setShowModal] = useState(false);

    console.log("productId : ", productId)

    const handleRegisterClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const getPStatusObject = (status) => {
        switch (parseInt(status)) {
            case 0:
                return { text: '보류', color: '#727272' };
            case 1:
                return { text: '등록', color: '#55A630' };
            case 2:
                return { text: '탈락', color: '#ff0000' };
            case 3:
                return {text: '등록 완료', color: '#55A630'}
            default:
                return { text: '알 수 없음', color: '#fff' };
        }
    };

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

    const getPPrice2 = (unit) => {
        switch (unit) {
            case 'g' :
                return 'g';
            case 'kg' :
                return 'kg';
            case 'ea' :
                return '개';
            case 'pack' :
                return '팩';
            case 'box' :
                return '박스';
            default :
                return '단위 정보 없음';
        }
    };

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/product/${productId}`);
            setProduct(response.data);

            // 상품 상태 객체 생성
            const statusObject = getPStatusObject(response.data.productStatus);
            setPStatus(statusObject);
            setProductStatus(response.data.productStatus);
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

    const fetchProductImagesLists = async () => {
        console.log("productId : ", productId);
        try {
            const response = await axios.get(`http://localhost:8080/api/product_img/${productId}/list`)
            setProductImagesLists(response.data);
        } catch (error) {
            console.log('Error fetching productImagesLists : ', error);
        }
    }

    useEffect(() => {
        // 페이지 로드 시 상품 정보 가져오기
        fetchProduct();
        fetchProductImagesLists();
    }, [productId]);


    if (!product) {
        return <div>Loading...</div>;
    }



    const handlePStatusChange = async (e) => {
        const newPStatus = e.target.value;
        console.log("변경된 상품 상태(newPStatus) : ", newPStatus);
        // setProductStatus(parseInt(newPStatus));
        // 서버로 상태 전송 및 DB 업데이트
        try {
            await axios.put(`http://localhost:8080/api/product/${productId}/status`, {productStatus: newPStatus});
            setPStatus(getPStatusObject(newPStatus));
            setProductStatus(newPStatus); // 상태 값 업데이트
        } catch (error) {
            console.error("상품 상태 업데이트에 실패하였습니다 : ", error);
        }
    };

    return (
    <div id="body">
        <div id={'prouct_apply_check_detail_page'} className={'page'}>
            <div id={'contents'}>
                <div className="product_detail_title">
                    <h1>상품 상세 정보</h1>
                </div>
                <div className={'product_apply_list_img_box'}>
                    <div className={'product_img_show'} id={'product_img_show'}>
                        {productImagesLists.length > 0 ? (
                            productImagesLists.map((productImage) => (
                                <div key={productImage.productImageId} className={'product_img_list'}>
                                    <img src={`http://localhost:8080${productImage.productImagePath}`}
                                         className={'product_img'} alt={productImage.productImagePath}/>
                                </div>
                            ))
                        ) : (<div>이미지가 없습니다.</div>
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
                <table id="t_address_info">
                    <tbody>
                    <tr>
                        <td className="product_apply_check_detail_title">상품번호</td>
                        <td className="product_apply_check_detail_info">
                            {product.productId}
                        </td>
                    </tr>
                    <tr>
                        <td className="product_apply_check_detail_title">상품명</td>
                        <td className="product_apply_check_detail_info">
                            {product.productName}
                        </td>
                    </tr>
                    <tr>
                        <td className="product_apply_check_detail_title">판매자</td>
                        <td className="product_apply_check_detail_info">{product.sellerName}</td>
                    </tr>
                    <tr>
                        <td className="product_apply_check_detail_title">가게이름</td>
                        <td className="product_apply_check_detail_info">{product.storeName}</td>
                    </tr>
                    <tr>
                        <td className="product_apply_check_detail_title">상품가격</td>
                        <td className="product_apply_check_detail_info">
                            {product.productPrice1}{getPPrice2(product.productPrice2)} / {product.productPrice3}원
                        </td>
                    </tr>
                    <tr>
                        <td className="product_apply_check_detail_title">원산지</td>
                        <td className="product_apply_check_detail_info">
                            {product.productOrigin}
                        </td>
                    </tr>
                    <tr>
                        <td className="product_apply_check_detail_title">배송날짜</td>
                        <td className="product_apply_check_detail_info">
                            {getPDeliveryDate(product.productDeliveryDate)}
                        </td>
                    </tr>
                    <tr>
                        <td className="product_apply_check_detail_title">상품정보</td>
                        <td className="product_apply_check_detail_info">
                            {product.productInfo}
                        </td>
                    </tr>
                    <tr>
                        <td className="product_apply_check_detail_title">상태</td>
                        <td className="product_apply_check_detail_info" style={{display: 'table-cell'}}>
                            <select
                                className="product_apply_check_detail_select"
                                style={{color: pStatus.color}}
                                value={productStatus}
                                onChange={handlePStatusChange}>
                                <option value="0" style={{color: '#727272'}}>보류</option>
                                <option value="1" style={{color: '#55A630'}}>등록</option>
                                <option value="2" style={{color: '#ff0000'}}>탈락</option>
                            </select>
                            {(product.productStatus == 0 || product.productStatus == 1 || product.productStatus == 2) && (
                                <button className={"product_pass_enroll_btn"} onClick={handleRegisterClick}>상품 등록</button>)}
                        </td>
                    </tr>
                    <tr>
                        <td className="product_apply_list_detail_title">등록일</td>
                        <td className="product_apply_list_detail_info">
                            {new Date(product.productCreatedDate).toISOString().split('T').join(' ').substring(0, 19)}
                        </td>
                    </tr>
                    </tbody>
                </table>
                {showModal && <ProductRegisterModal product={product} onClose={handleCloseModal}/>}
            </div>
        </div>
    </div>
    );
}

export default ProductApplyCheckDetail;