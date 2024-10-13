import React, {useState, useEffect} from "react";
import  './admin/product_apply_check_detail.css';
import './common/root.css';
import axios from "axios";
import {useParams} from "react-router-dom";

function ProductApplyCheckDetail() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [pStatus, setPStatus] = useState({text:'', color:''});
    const [productStatus, setProductStatus] = useState(''); // 상태 저장
    const [productImagesLists, setProductImagesLists] = useState([]);   // 상품 이미지들 저장

    console.log("productId : ", productId)

    const getPStatusObject = (status) => {
        switch (parseInt(status)) {
            case 0:
                return { text: '보류', color: '#727272' };
            case 1:
                return { text: '등록', color: '#55A630' };
            case 2:
                return { text: '탈락', color: '#ff0000' };
            default:
                return { text: '알 수 없음', color: '#fff' };
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

    // 이미지가 안불러와짐, productId는 불러와짐(500, json 오류라나 뭐라나)
    const fetchProductImagesLists = async () => {
        console.log("productId : ", productId);
        try {
            const response = await axios.get(`http://localhost:8080/api/product_img/${productId}/list`)
            setProductImagesLists(response.data);
            // if(response.ok) {
            //     const data = await response.json();
            //
            // }
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

    return (
    <div id="body">
        <div id={'prouct_apply_check_detail_page'} className={'page'}>
            <div id={'contents'}>
                <div className="product_detail_title">
                    <h1>상품 상세 정보</h1>
                </div>
                {/* 결제창 배송지 정보 */}

                <div className={'product_apply_img_box'}>
                    <div className={'product_img_show'} id={'product_img_show'}>
                        {productImagesLists.length > 0 ? (
                            productImagesLists.map((productImage) => (
                                <div key={productImage.productImageId} className={'product_img_list'}>
                                    <img src={productImage.productImagePath} alt={product.productName} />
                                </div>
                            ))
                        ): (<div>이미지가 없습니다.</div>
                        )}
                        {/*{imageSrcs.map((src, index) => (*/}
                        {/*    <div key={index} className={'product_img_list'}>*/}
                        {/*        <img src={src} alt={fileNames[index]} className="product_img"/>*/}
                        {/*    </div>*/}
                        {/*))}*/}
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
                        <td className="product_apply_check_detail_title">상품가격</td>
                        <td className="product_apply_check_detail_info">
                            {product.productPrice1}{product.productPrice2} / {product.productPrice3}원
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
                            {product.productDeliveryDate}
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
                        <td className="product_apply_check_detail_info"
                            style={{display: 'table-cell', color: pStatus.color}}>
                            {pStatus.text}
                        </td>
                    </tr>
                    <tr>
                        <td className="product_apply_check_detail_title">등록일</td>
                        <td className="product_apply_check_detail_info">
                            {new Date(product.productCreatedDate).toISOString().split('T').join(' ').substring(0, 19)}
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    );
}

export default ProductApplyCheckDetail;