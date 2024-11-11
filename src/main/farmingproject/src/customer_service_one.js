import './payment_success.css';
import './common/root.css';
import './shopping_basket.css';
import './customer_service_one.css';
import './customer_service_FAQ.css';
import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import axios, {post} from "axios";
import {useUser} from "./common/userContext";

function Customer_service_one() {
    const {user} = useUser();
    const [inquiries, setInquiries] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // // 폼 제출 후 값 초기화
        // setFormTitle("");
        // setFormContent("");
        // setFormType("문의 종류");
        try {
            const inquiriesData = {
                userId: user.id,
                userName: user.name,
                inquiriesTitle: form.inquiriesTitle,
                inquiriesType: form.inquiriesType,
                inquiriesContent: form.inquiriesContent,
            };

            const inquiriesResponse = await axios.post('http://localhost:8080/api/customer_inquiries/register', inquiriesData);
            if(inquiriesResponse.data) {
                alert("문의가 정상적으로 접수되었습니다.");
                window.location.reload();
                // fetchCustomerInquiries();
            } else {
                alert("문의 접수에 실패했습니다.");
            }
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
            alert("문의를 접수하는 중 오류가 발생했습니다.");
        }
        setForm({
            inquiriesTitle: "",
            inquiriesType: "",
            inquiriesContent: "",
        });
        setIsModalOpen(false);
    };

    const [form, setForm] = useState({
        inquiriesTitle: "",
        inquiriesType: "delivery & order",
        inquiriesContent: "",
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    };

    const handleCancel = (e) => {
        e.preventDefault();
        // 취소 버튼 클릭 시 값 초기화
        setForm({
            inquiriesTitle: "",
            inquiriesType: "",
            inquiriesContent: "",
        })
        setIsModalOpen(false);
    };

    const fetchCustomerInquiries = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/customer_inquiries/all');
            setInquiries(response.data);
        } catch (error) {
            if(error.response) {
                setInquiries(null);
            } else {
                console.log("모든 문의사항을 가져오는데 오류가 발생했습니다 : ", error);
            }
        }
    }

    useEffect(() => {
        fetchCustomerInquiries();
    }, []);

    return (
        <div id="body">
            <div id={'payment_success_page'} className={'page'}>
                <div id={'contents'}>
                    <div className={'Customer_service_Btn'}>
                        <Link to={"/customer_service_FAQ"}><div className={'FAQ_Btn'} style={{ backgroundColor: 'white' }}>FAQ</div></Link>
                        <Link to={"/customer_service_one"}><div className={'inquiry_Btn'} style={{ backgroundColor: '#FFEA8D' }}>1:1 문의</div></Link>
                        <Link to={"/customer_service_notice"}><div className={'notice_Btn'} style={{ backgroundColor: 'white' }}>공지사항</div></Link>
                    </div>

                    <div className={'admin_product_apply_chk_div'}>
                            <div className={'admin_product_apply_chk_top'}>
                                <div className={'admin_product_apply_chk_num'}>No.</div>
                                <div className={'admin_product_apply_chk_title'}>제목</div>
                                <div className={'admin_product_apply_chk_seller'}>등록일</div>
                                <div className={'admin_product_apply_chk_status'}>답변여부</div>
                            </div>

                        {inquiries?.map((inquiries, index) => (
                            <div key={inquiries.id} className={'admin_product_apply_chk_inner'}>
                                <div className={'admin_product_apply_chk_inner_content'}>
                                <div className={'admin_product_apply_chk_inner_num'}>{inquiries.id}</div>
                                <div className={'admin_product_apply_chk_inner_title'} style={{flexBasis: '670px'}}>{inquiries.inquiriesTitle}</div>
                                <div className={'admin_product_apply_chk_inner_seller'}>{inquiries.inquiriesType}</div>
                                <div className={'admin_product_apply_chk_inner_status'} style={{flexBasis: '110px'}}>{inquiries.inquiriesTitle}</div>
                            </div>
                            </div>
                        ))}
                    </div>

                    <div className={'one_add_Btn'} onClick={() => setIsModalOpen(true)}>1:1 문의하기</div>
                    <div className={'pagenation'}>1</div>
                    {isModalOpen && (
                        <div className="one_modal">
                            <div className="one_modal_content">
                                <form onSubmit={handleSubmit}>
                                    <h3>문의하기</h3>
                                    <label>
                                        제목
                                        <input
                                            type="text"
                                            value={form.inquiriesTitle}
                                            name={"inquiriesTitle"}
                                            onChange={handleInputChange}
                                        />
                                    </label>
                                    <label>
                                        문의 종류
                                        <select
                                            value={form.inquiriesType}
                                            onChange={handleInputChange}
                                            name={"inquiriesType"}
                                        >
                                            <option disabled hidden value="문의 종류">문의 종류</option>
                                            <option value="delivery & order">배송 및 주문 문의</option>
                                            <option value="product">상품 관련 문의</option>
                                            <option value="payment">결제 문의</option>
                                            <option value="etc">기타 문의</option>
                                        </select>
                                    </label>
                                    <label>
                                        문의 내용
                                        <textarea
                                            value={form.inquiriesContent}
                                            onChange={handleInputChange}
                                            name={"inquiriesContent"}
                                        />
                                    </label>
                                    <div className={"on_modal_btn"}>
                                        <button type={"submit"}>제출</button>
                                        <button onClick={handleCancel}>취소</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Customer_service_one;