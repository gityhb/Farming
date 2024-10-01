import './payment_success.css';
import './common/root.css';
import './shopping_basket.css';
import './customer_service_one.css';
import './customer_service_FAQ.css';
import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";

function Customer_service_one() {
    const [oitems, setoItems] = useState([
        {
            onum:6,
            otitle:"타이틀 테스트6",
            odate:"08.06",
            oanswer:"답변대기"
        },
        {
            onum:5,
            otitle:"타이틀 테스트5",
            odate:"08.06",
            oanswer:"답변대기"
        },
        {
            onum:4,
            otitle:"타이틀 테스트4",
            odate:"08.01",
            oanswer:"답변대기"
        },
        {
            onum:3,
            otitle:"타이틀 테스트3",
            odate:"08.02",
            oanswer:"답변대기"
        },
        {
            onum:2,
            otitle:"타이틀 테스트2",
            odate:"08.04",
            oanswer:"답변완료"
        },
        {
            onum:1,
            otitle:"타이틀 테스트1",
            odate:"08.08",
            oanswer:"답변완료"
        }
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formTitle, setFormTitle] = useState("");
    const [formContent, setFormContent] = useState("");
    const [formType, setFormType] = useState("문의 종류");

    const handleSubmit = () => {
        console.log({
            formTitle,
            formContent,
            formType,
        });
        // 폼 제출 후 값 초기화
        setFormTitle("");
        setFormContent("");
        setFormType("문의 종류");
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        // 취소 버튼 클릭 시 값 초기화
        setFormTitle("");
        setFormContent("");
        setFormType("문의 종류");
        setIsModalOpen(false);
    };



    return (
        <div id="body">
            <div id={'payment_success_page'} className={'page'}>
                <div id={'contents'}>
                    <div className={'Customer_service_Btn'}>
                        <Link to={"/customer_service_FAQ"}><div className={'FAQ_Btn'} style={{ backgroundColor: 'white' }}>FAQ</div></Link>
                        <Link to={"/customer_service_one"}><div className={'inquiry_Btn'} style={{ backgroundColor: '#FFEA8D' }}>1:1 문의</div></Link>
                        <Link to={"/customer_service_notice"}><div className={'notice_Btn'} style={{ backgroundColor: 'white' }}>공지사항</div></Link>
                    </div>

                    <div className={'Customer_service_div'}>
                        <div className={'Customer_service_top'}>
                            <div className={'Customer_service_top_num'}>No.</div>
                            <div className={'Customer_service_top_title'}>제목</div>
                            <div className={'Customer_service_top_o_date'}>등록일</div>
                            <div className={'Customer_service_top_answer'}>답변여부</div>
                        </div>

                        {oitems.map((item) => (
                            <div className={'Customer_service_one_inner'}>
                                <div className={'Customer_service_inner_num'}>{item.onum}</div>
                                <div className={'one_Customer_service_inner_title'}>{item.otitle}</div>
                                <div className={'one_Customer_service_inner_o_date'}>{item.odate}</div>
                                <div className={'Customer_service_inner_answer'}>{item.oanswer}</div>
                            </div>
                        ))}
                    </div>

                    <div className={'one_add_Btn'} onClick={() => setIsModalOpen(true)}>1:1 문의하기</div>
                    <div className={'pagenation'}>1</div>
                    {isModalOpen && (
                        <div className="one_modal">
                            <div className="one_modal_content">
                                <h3>문의하기</h3>
                                <label>
                                    제목
                                    <input
                                        type="text"
                                        value={formTitle}
                                        onChange={(e) => setFormTitle(e.target.value)}
                                    />
                                </label>
                                <label>
                                    문의 내용
                                    <textarea
                                        value={formContent}
                                        onChange={(e) => setFormContent(e.target.value)}
                                    />
                                </label>
                                <label>
                                    문의 종류
                                    <select
                                        value={formType}
                                        onChange={(e) => setFormType(e.target.value)}
                                    >
                                        <option disabled hidden value="문의 종류">문의 종류</option>
                                        <option value="배송">배송 및 주문 문의</option>
                                        <option value="상품">상품 관련 문의</option>
                                        <option value="결제">결제 문의</option>
                                        <option value="기타">기타 문의</option>
                                    </select>
                                </label>
                                <button onClick={handleSubmit}>제출</button>
                                <button onClick={handleCancel}>취소</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Customer_service_one;