import React, {useState, useEffect} from "react";
import  './product_apply_check_detail.css';
import '../common/root.css';
import axios from "axios";
import {useParams} from "react-router-dom";
import Modal from "react-modal";
import DaumPostcode from "react-daum-postcode";

function ProductApplyCheckDetail() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    console.log("productId : ", productId);

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/product/${productId}`);
            setProduct(response.data);
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

    useEffect(() => {
        // 페이지 로드 시 상품 정보 가져오기
        fetchProduct();
    }, [productId]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        // <div>
        //     안녕핫에ㅛ
        //
        //     {product.productId}
        //     <h1>{product.sellerName}</h1>
        //     <p>{product.productInfo}</p>
        //     {/*<img src={product.productImagePath} alt={product.productName} />*/}
        //     {/* Additional product details here */}
        // </div>
    <div id="body">
        <div id={'prouct_apply_check_detail_page'} className={'page'}>
            <div id={'contents'}>
                <div id="product_detail_title">
                    <h1>상품 상세 정보</h1>
                </div>


                {/* 결제창 배송지 정보 */}
                <div className="payment_title"> 배송지 정보</div>
                <table id="t_address_info">
                    <tr>
                        <td className="address_tbl_title">상품명</td>
                        <td className="address_tbl_info">
                            {product.productName}
                        </td>
                    </tr>
                    <tr>
                        <td className="address_tbl_title">이름</td>
                        <td className="address_tbl_info">{product.sellerName}</td>
                    </tr>
                    <tr>
                        <td className="address_tbl_title">상품가격</td>
                        <td className="new_address_tbl_info">
                            {product.productPrice1}{product.productPrice2}{product.productPrice3}원
                        </td>
                    </tr>
                    <tr>
                        <td className="address_tbl_title">배송날짜</td>
                        <td className="new_address_tbl_info">
                            {product.productDeliveryDate}
                        </td>
                    </tr>
                    <tr>
                        <td className="address_tbl_title">배송날짜</td>
                        <td className="address_tbl_info">
                            <select id="delivery-notes" class="delivery-notes">
                                <option value="delivery-notes1" selected>요청사항 없음</option>
                                <option value="delivery-notes2">문 앞에 놔주세요</option>
                                <option value="delivery-notes3">도착 전 전화주세요</option>
                                <option value="delivery-notes4">경비실에 놔주세요</option>
                                <option value="delivery-notes5">벨 눌러주세요</option>
                                <option value="delivery-notes6">직접 입력</option>
                            </select>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
    );
}

export default ProductApplyCheckDetail;