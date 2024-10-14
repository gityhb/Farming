import './payment_success.css';
import './common/root.css';
import './shopping_basket.css';
import './customer_service_FAQ.css';
import React, { useState } from 'react';
import { Link } from "react-router-dom";

function Customer_service_FAQ() {
    // FAQ 항목과 답변 데이터를 추가
    const [fitems, setfItems] = useState([
        {
            fnum: '01',
            ftitle: "[배송일정] 주문한 농산물은 언제 배송되나요?",
            answer: "주문한 농산물의 배송은 보통 주문 후 2~3일 이내에 이루어집니다. 배송 일정은 마이페이지 > 주문목록에서 확인할 수 있습니다."
        },
        {
            fnum: '02',
            ftitle: "[신선도] 배송된 농산물의 신선도가 떨어졌어요.",
            answer: "배송 중 발생할 수 있는 신선도 저하는 교환 또는 환불이 가능합니다. 고객센터로 연락 주시면 신속하게 처리해 드리겠습니다."
        },
        {
            fnum: '03',
            ftitle: "[결제] 농산물 결제는 어떤 방법으로 할 수 있나요?",
            answer: "농산물 결제는 신용카드, 계좌이체, 그리고 간편결제(카카오페이, 네이버페이) 등을 통해 가능합니다."
        },
        {
            fnum: '04',
            ftitle: "[주문 변경] 이미 주문한 농산물의 수량을 변경할 수 있나요?",
            answer: "주문 후에는 수량 변경이 어렵습니다. 주문을 취소한 후 다시 주문해 주세요. 단, 배송 준비 중인 상품은 취소가 불가능할 수 있습니다."
        },
        {
            fnum: '05',
            ftitle: "[환불 정책] 농산물에 문제가 있는 경우 환불이 가능한가요?",
            answer: "수령한 농산물에 품질 문제가 있을 경우, 사진과 함께 고객센터로 문의해 주시면 환불 또는 교환이 가능합니다. 단, 제품 수령 후 24시간 이내에 신고해 주셔야 합니다."
        },
        {
            fnum: '06',
            ftitle: "[농장 방문] 직접 농장을 방문하여 구매할 수 있나요?",
            answer: "일부 농장은 방문 구매가 가능합니다. 해당 농장의 정보는 각 상품 페이지에서 확인할 수 있으며, 방문 전 사전 예약이 필요할 수 있습니다."
        },
        {
            fnum: '07',
            ftitle: "[할인 행사] 직거래 장터에서 할인이 자주 진행되나요?",
            answer: "할인 행사는 계절에 따라 자주 진행되며, 주요 할인 행사는 홈페이지와 앱을 통해 공지됩니다. 장터 상품 할인 기간 동안 다양한 프로모션이 제공됩니다."
        },
        {
            fnum: '08',
            ftitle: "[배송비] 농산물 주문 시 배송비는 어떻게 되나요?",
            answer: "농산물 주문 시 주문 금액에 따라 무료 배송이 적용되거나, 별도의 배송비가 발생할 수 있습니다. 배송비 정책은 각 상품 페이지에서 확인 가능합니다."
        },
        {
            fnum: '09',
            ftitle: "[포장] 농산물 포장은 어떻게 이루어지나요?",
            answer: "모든 농산물은 신선도를 유지하기 위해 냉장 또는 냉동 상태로 안전하게 포장됩니다. 여름철에는 아이스팩을 추가하여 배송됩니다."
        },
        {
            fnum: '10',
            ftitle: "[교환 및 반품] 농산물 교환/반품 절차는 어떻게 되나요?",
            answer: "수령한 농산물에 문제가 있을 경우 고객센터에 문의해 주시면 교환 또는 반품 절차를 안내해 드립니다. 단, 신선 식품 특성상 단순 변심에 의한 반품은 어렵습니다."
        }
    ]);

    // 각 질문에 대한 열림/닫힘 상태를 관리하는 상태 추가
    const [openIndex, setOpenIndex] = useState(null);

    // 클릭 시 열림/닫힘 토글 함수
    const toggleAnswer = (index) => {
        if (openIndex === index) {
            setOpenIndex(null); // 이미 열려있는 경우 닫기
        } else {
            setOpenIndex(index); // 클릭한 항목 열기
        }
    };

    return (
        <div id="body">
            <div id={'payment_success_page'} className={'page'}>
                <div id={'contents'}>
                    <div className={'Customer_service_Btn'}>
                        <Link to={"/customer_service_FAQ"}><div className={'FAQ_Btn'} style={{ backgroundColor: '#FFEA8D' }}>FAQ</div></Link>
                        <Link to={"/customer_service_one"}><div className={'inquiry_Btn'} style={{ backgroundColor: 'white' }}>1:1 문의</div></Link>
                        <Link to={"/customer_service_notice"}><div className={'notice_Btn'} style={{ backgroundColor: '#fff' }}>공지사항</div></Link>
                    </div>

                    <div className={'Customer_service_div'}>
                        <div className={'Customer_service_top'}>
                            <div className={'admin_product_apply_chk_num'}>Q.</div>
                            <div className={'admin_product_apply_chk_title'}>제목</div>
                        </div>

                        {fitems.map((item, index) => (
                            <div key={index} className={'admin_product_apply_chk_inner'} onClick={() => toggleAnswer(index)}>
                                <div className={'admin_product_apply_chk_inner_content'}>
                                    <div className={'admin_product_apply_chk_inner_num'}>{item.fnum}</div>
                                    <div className={'admin_product_apply_chk_inner_title'}>{item.ftitle}</div>
                                    <div className={`arrow_icon ${openIndex === index ? 'open' : ''}`}></div>
                                </div>
                                {openIndex === index && (
                                    <div className="answer_text">
                                        {item.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className={'pagenation'}>1</div>
                </div>
            </div>
        </div>
    );
}

export default Customer_service_FAQ;