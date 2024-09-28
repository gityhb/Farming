import {useState, useEffect} from "react";
import  './product_apply_check_detail.css';
import '../common/root.css';
import axios from "axios";
import {useParams} from "react-router-dom";

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
        <div>
            <h1>{product.productName}</h1>
            <p>{product.productInfo}</p>
            {/*<img src={product.productImagePath} alt={product.productName} />*/}
            {/* Additional product details here */}
        </div>
    );
}

export default ProductApplyCheckDetail;