import "./common/root.css";
import "./farmer_product_apply.css";
import {useState} from "react";
import {useUser} from "./common/userContext";
import {useNavigate} from "react-router-dom";

function Farmer_product_apply() {
    const { user } = useUser();

    const navigate = useNavigate();

    const [fileNames, setFileNames] = useState([]);
    const [imageSrcs, setImageSrcs] = useState([]);

    const [form, setForm] = useState( {
        productName: "",
        productImagePath: "",
        sellerName: "",
        productPrice1: "",
        productPrice2: "g",
        productPrice3: "",
        productOrigin: "",
        productDeliveryDate: "today",
        productInfo: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    };

    const loadFile = (event) => {
        const files = Array.from(event.target.files);

        if(files.length > 0) {
            const newNames = files.map((file) => file.name);   // 새로 선택된 파일들의 이름 배열
            const newSrcs = files.map((file) => URL.createObjectURL(file));    // 새로 선택된 이미지들의 URL 배열

            setFileNames((prevNames) => [...prevNames, ...newNames]);
            setImageSrcs((prevSrcs) => [...prevSrcs, ...newSrcs]);
        }
    };

    // 이미지 삭제 핸들러
    const handleRemoveImage = (index) => {
        // 선택된 인덱스를 제외한 나머지 파일들만 배열로 새로 설정
        setFileNames((prevNames) => prevNames.filter((_, i) => i !== index));
        setImageSrcs((prevSrcs) => prevSrcs.filter((_, i) => i !== index));
    };

    const handleFileInputChange = (e) => {
        handleInputChange(e);
        loadFile(e);
    };

    const submitForm = async () => {
        try {
            // 1. 상품 데이터 준비
            const productData = {
                // product 관련 데이터
                productName: form.productName,
                sellerName: user.name,
                productPrice1: form.productPrice1,
                productPrice2: form.productPrice2,
                productPrice3: form.productPrice3,
                productOrigin: form.productOrigin,
                productDeliveryDate: form.productDeliveryDate,
                productInfo: form.productInfo
                // ... 기타 product 관련 필드
            };

            // 2. 상품 등록 요청
            const productResponse = await fetch('/api/product/apply', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });

            if (productResponse.ok) {
                // const productResult = await productResponse.json();
                // const productId = productResult.productId; // 서버에서 반환한 상품 ID

            // 3. 이미지 데이터 준비(productId를 이제는 알고 있음)
            const productImageData = {
                // productImage 관련 데이터
                // productId: productId, // 이 값은 product 생성 후에 설정해야 할 수 있습니다
                productImagePath: form.productImagePath,
                // ... 기타 image 관련 필드
            };

            // 4. 이미지 등록 요청
            const productImageResponse = await fetch('/api/product_img/apply', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(productImageData),
    });

    if (productImageResponse.ok) {
        alert("상품 등록 신청이 되었습니다.");
        // navigate('/');
        console.log("성공함!!!!");
    } else {
        console.error('이미지 등록 실패:', await productImageResponse.json());
    }
} else {
    console.error('상품 등록 실패:', await productResponse.json());
}
} catch (error) {
    console.error('등록 중 오류 발생:', error);
}
};

    if (!user) {
        return <div>Loading...</div>; // 로딩 상태 표시
    }


    return(
        <div id={'body'}>
            <div id={'farmer_product_apply_page'} className={'page'}>
                <div id={'contents'}>
                    <div id={'product_apply_title'}>
                        <h1>상품 등록 신청</h1>
                    </div>
                    <form onSubmit={submitForm} method="POST" enctype="multipart/form-data">
                        <div id={'product_apply_img'}>
                            <div className={'product_apply_img_box'}>
                                <div className={'product_img_show'} id={'product_img_show'}>
                                    {imageSrcs.map((src, index) => (
                                        <div key={index} className={'product_img_list'}>
                                            <img src={src} alt={fileNames[index]} className="product_img"/>
                                            <img src={'./img/delete_btn.png'} alt={'delete_btn'} className={'product_delete_btn'} onClick={() => handleRemoveImage(index)}/>
                                        </div>
                                    ))}
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

                            <div className={'product_apply_img_btn'}>
                                <label for={"choosefile"}>사진첨부</label>
                            </div>
                            <input type="file" id={"choosefile"} name={"productImagePath"} value={form.productImagePath}  onChange={handleFileInputChange} accept="image/*" multiple  style={{visibility: "hidden"}}/>
                        </div>
                        <div className={'farmer_product_apply_form_group'}>
                            <div className={'pform_group'}>
                                <div className={'pform_title'}>
                                    상품명
                                </div>
                                <input
                                    type="text"
                                    name={"productName"}
                                    value={form.productName}
                                    onChange={handleInputChange}
                                    placeholder="20자 이내로 입력해주세요"
                                />
                            </div>
                            <div className={'pform_group'}>
                                <div className={'pform_title'}>
                                    판매자
                                </div>
                                <input
                                    className={'pform_seller'}
                                    name={'sellerName'}
                                    value={user.name}
                                    onChange={handleInputChange}
                                    type="text"
                                    placeholder={user.name}
                                    readOnly
                                />
                            </div>
                            <div className={'pform_group'}>
                                <div className={'pform_title'}>
                                    가격
                                </div>
                                <input
                                    type="number"
                                    name={"productPrice1"}
                                    value={form.productPrice1}
                                    onChange={handleInputChange}
                                    placeholder="0"
                                />
                                <select name={"productPrice2"} value={form.productPrice2}  onChange={handleInputChange}>
                                    <option value={'g'} selected>g</option>
                                    <option value={'kg'}>kg</option>
                                    <option value={'ea'}>개</option>
                                    <option value={'pack'}>팩</option>
                                    <option value={'box'}>박스</option>
                                </select>
                                <input
                                    type="number"
                                    name={"productPrice3"}
                                    value={form.productPrice3}
                                    onChange={handleInputChange}
                                    placeholder="0"
                                />
                                <span> 원</span>
                            </div>
                            <div className={'pform_group'}>
                                <div className={'pform_title'}>
                                    원산지
                                </div>
                                <input
                                    type="text"
                                    name={"productOrigin"}
                                    value={form.productOrigin}
                                    onChange={handleInputChange}
                                    placeholder="지역명을 입력해주세요"
                                />
                            </div>
                            <div className={'pform_group'}>
                                <div className={'pform_title'}>
                                    배송날짜
                                </div>
                                주문 후
                                <select name={"productDeliveryDate"} value={form.productDeliveryDate}  onChange={handleInputChange}>
                                    <option value={'today'} selected>당일</option>
                                    <option value={'tomorrow'}>내일</option>
                                    <option value={'etc'}>상시배송</option>
                                </select>
                                <span className={'warning_red'}>※ 상시배송 선택시 예상날짜를 상품정보란에 기입해야 합니다.</span>
                            </div>
                            <div className={'pform_group'}>
                                <div className={'pform_title'}>
                                    상품정보
                                </div>
                                <textarea className={'pfrom_product_info'} name={"productInfo"} value={form.productInfo} onChange={handleInputChange}
                                          placeholder={'자세한 상품소개, 예상 배송날짜, 판매자 소개는 판매에 큰 도움이 됩니다 :)'}/>
                            </div>
                            <div className={'warning_gray'}>
                                ※승인 결과는 신청 후 영업일 4~6일 이내 문자로 발송됩니다.<br/><br/>

                                ※허위 상품 및 법적 문제 있는 상품 등록시 강제 탈퇴될 수 있습니다.<br/><br/>

                                ※문의전화 1588-1234
                            </div>
                            <div className={'pform_btn'}>
                                <button type={'submit'}>신청하기</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Farmer_product_apply;