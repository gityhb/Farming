import React, { useState } from "react";
import './admin/product_apply_check_detail.css';
import './product_register_modal.css';
import axios from "axios";

function ProductRegisterModal({ product, onClose }) {
    const [productDetails, setProductDetails] = useState({
        sellerId: product.sellerId,
        sellerName: product.sellerName,
        productName: product.productName,
        storeName: product.storeName,
        productPrice1: product.productPrice1,
        productPrice2: product.productPrice2,
        productPrice3: product.productPrice3,
        productOrigin: product.productOrigin,
        productDeliveryDate: product.productDeliveryDate,
    });

    const [productImages, setProductImages] = useState({
        productimgPath: null,
        productInfoimgPath: null
    });

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductDetails(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e, imageType) => {
        setProductImages(prev => ({ ...prev, [imageType]: e.target.files[0] }));
    };

    const handleSubmit = async () => {
        if (!productDetails.productName || !productDetails.productPrice3 || !productDetails.sellerId) {
            alert("상품명, 가격, 판매자 ID는 필수 입력 항목입니다.");
            return;
        }

        try {
            const formData = new FormData();

            // 상품 정보 추가
            Object.keys(productDetails).forEach(key => {
                formData.append(key, productDetails[key]);
                console.log(`${key}:`, productDetails[key]); // 각 필드의 값을 콘솔에 출력
            });

            // 이미지 파일 추가
            if (productImages.productimgPath) {
                formData.append('productimgPath', productImages.productimgPath);
                console.log('productimgPath:', productImages.productimgPath.name); // 파일 이름 출력
            }
            if (productImages.productInfoimgPath) {
                formData.append('productInfoimgPath', productImages.productInfoimgPath);
                console.log('productInfoimgPath:', productImages.productInfoimgPath.name); // 파일 이름 출력
            }

            console.log('FormData 내용:');
            for (let [key, value] of formData.entries()) {
                console.log(key, ':', value);
            }

            console.log('서버로 요청 보내는 중...');
            const response = await axios.post('/api/productRG/register', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            console.log('서버 응답:', response.data);
            console.log('상품 등록 성공:', response.data);
            onClose();
        } catch (error) {
            console.error('상품 등록 실패:', error);
            if (error.response) {
                console.error('응답 데이터:', error.response.data);
                console.error('상태 코드:', error.response.status);
                console.error('헤더:', error.response.headers);
            } else if (error.request) {
                console.error('요청이 전송되었지만 응답이 없습니다:', error.request);
            } else {
                console.error('에러 메시지:', error.message);
            }
            alert("상품 등록에 실패했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <div className="apply_modal">
            <div className="apply_modal_content">
                <div className="apply_header">
                    등록 상품 정보
                    <span className="close" onClick={onClose}>&times;</span>
                </div>
                <div className="apply_main">
                    <label>판매자 고유 ID</label>
                    <input type="text" name="sellerId" value={productDetails.sellerId} onChange={handleInputChange}
                           readOnly={true}/>

                    <label>판매자</label>
                    <input type="text" name="sellerId" value={productDetails.sellerName} onChange={handleInputChange}
                           readOnly={true}/>


                    <label>상품명</label>
                    <input type="text" name="productName" value={productDetails.productName}
                           onChange={handleInputChange}/>

                    <label>상점명</label>
                    <input type="text" name="storeName" value={productDetails.storeName} onChange={handleInputChange}
                           readOnly={true}/>

                    <label>상품가격</label>
                    <div className="register_price">
                        <input type="text" name="productPrice1" value={productDetails.productPrice1}
                               onChange={handleInputChange}/>
                        <input type="text" name="productPrice2" value={getPPrice2(productDetails.productPrice2)}
                               onChange={handleInputChange}/>
                        <input type="text" name="productPrice3" value={productDetails.productPrice3}
                               onChange={handleInputChange}/>
                    </div>

                    <label>원산지</label>
                    <input type="text" name="productOrigin" value={productDetails.productOrigin}
                           onChange={handleInputChange} readOnly={true}/>

                    <label>배송날짜</label>
                    <input type="text" name="productDeliveryDate" value={getPDeliveryDate(product.productDeliveryDate)}
                           onChange={handleInputChange}/>

                    <label>상품 대표 이미지</label>
                    <input type="file" onChange={(e) => handleFileChange(e, 'productimgPath')}/>

                    <label>상품 상세정보 이미지</label>
                    <input type="file" onChange={(e) => handleFileChange(e, 'productInfoimgPath')}/>

                </div>
                <button className="apply_button" onClick={handleSubmit}>등록</button>
            </div>
        </div>
    );
}

export default ProductRegisterModal;