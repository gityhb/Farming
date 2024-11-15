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
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const [pageGroup, setPageGroup] = useState(1); // 페이지 그룹
    const itemsPerPage = 10; // 한 페이지에 보여줄 아이템 수
    const pagesPerGroup = 10; // 한 그룹당 보여줄 페이지 수
    const [iStatus, setIStatus] = useState([]);
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
            inquiriesType: "delivery & order",
            inquiriesContent: "",
        })
        setIsModalOpen(false);
    };

    const inquiryType = (type) => {
        switch (type) {
            case 'delivery & order':
                return '배송 및 주문 문의';
            case 'product':
                return '상품 관련 문의';
            case 'payment':
                return '결제 문의';
            case 'etc':
                return '기타 문의';
        }
    }

    const fetchCustomerInquiries = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/customer_inquiries/all');
            setInquiries(response.data.reverse());

            // 상태와 색상을 함께 설정
            const statusArray = response.data.map(inquiry => {
                if (inquiry.inquiriesStatus === 0) {
                    return { text: '응답대기', color: '#727272' };
                }
                if (inquiry.inquiriesStatus === 1) {
                    return { text: '응답완료', color: '#fff' };
                }
                return { text: '알 수 없음', color: '#fff' };
            });
            setIStatus(statusArray); // 상태 배열 업데이트

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

    // 페이지 변경 시 호출되는 함수
    const handlePageChange = (pageNum) => {
        setCurrentPage(pageNum);
    };

    // 페이지 그룹 이동 함수 (<<, >> 버튼 클릭 시)
    const handleGroupChange = (direction) => {
        if (direction === 'next') {
            setPageGroup(pageGroup + 1);
            setCurrentPage((pageGroup + 1) * pagesPerGroup - (pagesPerGroup - 1));
        } else if (direction === 'prev') {
            setPageGroup(pageGroup - 1);
            setCurrentPage((pageGroup - 1) * pagesPerGroup - (pagesPerGroup - 1));
        }
    };

    // 현재 페이지에 보여줄 상품 리스트 추출
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // 총 페이지 수 계산
    const totalPages = Math.ceil(inquiries.length / itemsPerPage);

    // 현재 그룹에 해당하는 페이지 번호들 계산
    const startPage = (pageGroup - 1) * pagesPerGroup + 1;
    const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

    // 현재 페이지에 해당하는 항목을 가져옴
    const startIndex = (currentPage - 1) * itemsPerPage;
    const selectedProducts = inquiries.slice(startIndex, startIndex + itemsPerPage);

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

    if(!inquiries || inquiries.length === 0) {
        return (
            <div id="body">
                <div id={'payment_success_page'} className={'page'}>
                    <div id={'contents'}>
                        <div className={'Customer_service_Btn'}>
                            <Link to={"/customer_service_FAQ"}>
                                <div className={'FAQ_Btn'} style={{backgroundColor: '#fff'}}>FAQ</div>
                            </Link>
                            <Link to={"/customer_service_one"}>
                                <div className={'inquiry_Btn'} style={{backgroundColor: '#FFEA8D'}}>1:1 문의</div>
                            </Link>
                            <Link to={"/customer_service_notice"}>
                                <div className={'notice_Btn'} style={{backgroundColor: '#fff'}}>공지사항</div>
                            </Link>
                        </div>

                        <div className={'admin_product_apply_chk_div'}>
                            <div className={'admin_product_apply_chk_top'}>
                                <div className={'admin_product_apply_chk_num'}>No.</div>
                                <div className={'admin_product_apply_chk_title'} style={{flexGrow: '10'}}>제목</div>
                                <div className={'admin_product_apply_chk_seller'}>등록일</div>
                                <div className={'admin_product_apply_chk_status'}>답변여부</div>
                            </div>
                            <div className={'product_none'} style={{marginBottom: '20px'}}>아직 등록된 문의가 없습니다</div>
                            <div className={'none_one_add_Btn'} onClick={() => setIsModalOpen(true)}>1:1 문의하기</div>
                        </div>
                        <div className={'align'}></div>

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

    return (
        <div id="body">
        <div id={'payment_success_page'} className={'page'}>
            <div id={'contents'}>
                <div className={'Customer_service_Btn'}>
                    <Link to={"/customer_service_FAQ"}>
                        <div className={'FAQ_Btn'} style={{backgroundColor: '#fff'}}>FAQ</div>
                    </Link>
                    <Link to={"/customer_service_one"}>
                        <div className={'inquiry_Btn'} style={{backgroundColor: '#FFEA8D'}}>1:1
                            문의
                        </div>
                    </Link>
                    <Link to={"/customer_service_notice"}>
                        <div className={'notice_Btn'} style={{backgroundColor: '#fff'}}>공지사항
                        </div>
                    </Link>
                </div>

                <div className={'admin_product_apply_chk_div'}>
                    <div className={'admin_product_apply_chk_top'}>
                        <div className={'admin_product_apply_chk_num'}>No.</div>
                        <div className={'admin_product_apply_chk_title'}
                             style={{flexGrow: '10'}}>제목
                        </div>
                        <div className={'admin_product_apply_chk_seller'}>등록일</div>
                        <div className={'admin_product_apply_chk_status'}>답변여부</div>
                    </div>

                    {inquiries?.map((inquiries, index) => {
                        const date = new Date(inquiries.inquiriesCreatedDate); // timestamp를 Date 객체로 변환
                        const month = date.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더합니다.
                        const day = date.getDate();

                        return (
                            <div key={inquiries.id} className={'admin_product_apply_chk_inner'}
                                 onClick={() => toggleAnswer(index)}>
                                <div className={'admin_product_apply_chk_inner_content'}>
                                    <div
                                        className={'admin_product_apply_chk_inner_num'}>{(currentPage - 1) * itemsPerPage + index + 1}</div>
                                    <div className={'admin_product_apply_chk_inner_title'}
                                         style={{flexBasis: '670px'}}>{inquiries.inquiriesTitle}</div>
                                    <div
                                        className={'admin_product_apply_chk_inner_seller'}>{month}.{day}</div>
                                    <div className={'admin_product_apply_chk_inner_status'}
                                         style={{
                                             flexBasis: '110px',
                                             color: iStatus[index]?.color
                                         }}>
                                        {iStatus[index]?.text}
                                    </div>
                                    <div
                                        className={`arrow_icon ${openIndex === index ? 'open' : ''}`}></div>
                                </div>
                                {openIndex === index && (
                                    <div className="answer_text" style={{lineHeight: '1'}}>
                                        <p>문의자 | {inquiries.userName}</p>
                                        <p>문의 종류 | {inquiryType(inquiries.inquiriesType)}</p>
                                        <br/>
                                        <p>문의 내용 |</p>
                                        <p>{inquiries.inquiriesContent}</p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className={'one_add_Btn'} onClick={() => setIsModalOpen(true)}>1:1 문의하기</div>
                {/* 페이지네이션 */}
                <div className={'admin_product_apply_chk_pagenation'}
                     style={{marginTop: "110px"}}>
                    {/* << 화살표, 페이지 그룹 이동 */}
                    {pageGroup > 1 && (
                        <button className={'admin_product_apply_chk_pagenation_btn'}
                                onClick={() => handleGroupChange('prev')}><img
                            src={'/img/etc/arrowL.png'} style={{width: '10px'}}/></button>
                    )}

                    {/* 개별 페이지 번호 */}
                    {[...Array(endPage - startPage + 1)].map((_, idx) => {
                        const pageNum = startPage + idx;
                        return (
                            <button
                                key={pageNum}
                                onClick={() => handlePageChange(pageNum)}
                                className={currentPage === pageNum ? 'admin_product_apply_chk_pagenation_btn_active admin_product_apply_chk_pagenation_btn' : 'admin_product_apply_chk_pagenation_btn'}>
                                {pageNum}
                            </button>
                        );
                    })}

                    {/* >> 화살표, 페이지 그룹 이동 */}
                    {endPage < totalPages && (
                        <button className={'admin_product_apply_chk_pagenation_btn'}
                                onClick={() => handleGroupChange('next')}><img
                            src={'/img/etc/arrowR.png'} style={{width: '10px'}}/></button>
                    )}
                </div>
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