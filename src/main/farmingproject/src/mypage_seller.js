import React, { useState } from 'react';
import './mypage_seller.css';
import './common/root.css';
import JobModal from './component/job_modal';
import { Link } from 'react-router-dom';

function Mypage_seller() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isJobModalOpen, setIsJobModalOpen] = useState(false); // Job modal state

    const handleViewResume = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleAddJob = () => {
        setIsJobModalOpen(true); // Open job modal
    };

    const closeJobModal = () => {
        setIsJobModalOpen(false); // Close job modal
    };

    return (
        <div className="mypage_seller">
            <h1>마이페이지</h1>
            <div className="section_header">
                <h2>판매자 소개</h2>
            </div>
            <div className="seller_info">
                <div className="seller_photo">
                    <span>( 사진 등록 )</span>
                </div>
                <div className="seller_details">
                    <p>이름</p>
                    <p>사업자 등록 번호</p>
                    <p>위치</p>
                </div>
            </div>
            <div className="products_section">
                <div className="section_header">
                    <h2>판매중인 상품 (2)</h2>
                    <a href="#" className="more_link">더보기 &gt;</a>
                </div>
                <div className="product_list">
                    <div className="product_item">
                        <img src="./img/watermelon.png" alt="상품사진"/>
                    </div>
                    <div className="product_item">
                        <img src="./img/strawberry.png" alt="상품사진"/>
                    </div>
                </div>
            </div>
            <div className="order_inquiry_section">
                <div className="order_summary">
                    <div className="section_header">
                        <h2>주문 내역</h2>
                    </div>
                    <ul>
                        <li><span className="status new">New</span> 새로운 주문 <span className="count">3건</span></li>
                        <li><span className="status"></span> 주문 확인 <span className="count">2건</span></li>
                        <li><span className="status"></span> 배송중 <span className="count">5건</span></li>
                        <li><span className="status"></span> 배송 완료 <span className="count">7건</span></li>
                    </ul>
                </div>
                <div className="inquiry_summary">
                    <div className="section_header">
                        <h2>문의 내역</h2>
                        <a href="#" className="more_link">더보기 &gt;</a>
                    </div>
                    <ul>
                        <li><span className="status new">New</span><a href="#"> Q. 지금 시키면 언제 와요?</a></li>
                        <li><span className="status new">New</span><a href="#"> Q. 한포대에 몇개씩 들어있습니까?</a></li>
                        <li><span className="status answered">답변대기</span> <a href="#">Q. 박스 상자에 포장인가요?</a></li>
                        <li><span className="status completed">답변완료</span><a href="#"> Q. 많이 없어요 찬물부탁</a></li>
                        <li><span className="status completed">답변완료</span><a href="#"> Q. 이 곳 주인장 전화번호 뭐가요. 물어볼 게 있...</a></li>
                    </ul>
                </div>
            </div>
            <div className="farmer_jobs">
                <div className="section_header">
                    <h2>파머직</h2>
                    <Link to="/farmer_job_seller" className="more_link">더보기 &gt;</Link>
                </div>
                <div className="job_management">
                    <ul className="job_list">
                        <li>
                            <a href="#"><strong>포도 수확 알바</strong> - 8월 15일부터 9월 15일까지, 일당 80,000원</a>
                        </li>
                        <li>
                            <a href="#"><strong>사과 농장 수확 도우미</strong> - 10월 1일부터 11월 1일까지, 일당 70,000원</a>
                        </li>
                        <li>
                            <a href="#"><strong>배추 심기 작업</strong> - 9월 10일부터 9월 20일까지, 일당 60,000원</a>
                        </li>
                    </ul>
                    <button className="add_job_button" onClick={handleAddJob}>새 공고 추가</button>
                </div>
            </div>

            <JobModal isOpen={isJobModalOpen} closeJobModal={closeJobModal} />

            <div className="application_section">
                <div className="application_summary">
                    <div className="section_header">
                        <h2>지원 완료 내역</h2>
                        <a href="#" className="more_link">더보기 &gt;</a>
                    </div>
                    <ul className="application_list">
                        <li>
                            <div className="application_details">
                                <p><strong>포도 수확 알바</strong></p>
                                <p>지원자: 신짱구</p>
                                <p>확인: <button className="btn" onClick={() => handleViewResume()}>이력서 열람</button></p>
                            </div>
                        </li>
                        <li>
                            <div className="application_details">
                                <p><strong>사과 농장 수확 도우미</strong></p>
                                <p>지원자: 도라에몽</p>
                                <p>확인: <button className="btn" onClick={() => handleViewResume()}>이력서 열람</button></p>
                            </div>
                        </li>
                        <li>
                            <div className="application_details">
                                <p><strong>배추 심기 작업</strong></p>
                                <p>지원자: 노진구</p>
                                <p>확인: <button className="btn" onClick={() => handleViewResume()}>이력서 열람</button></p>
                            </div>
                        </li>
                    </ul>
                </div>
                {isModalOpen && (
                    <div className="modal">
                        <div className="modal_content">
                            <span className="close" onClick={closeModal}>&times;</span>
                            {/* 이력서 내용 표시 */}
                            <div className="form_container">
                                <h1 className="form_title">아르바이트 지원서</h1>
                                <div className="form_table">
                                    <div className="form_row">
                                        <div className="form_cell label">성명</div>
                                        <div className="form_cell input">신짱구</div>
                                    </div>
                                    <div className="form_row">
                                        <div className="form_cell label">생년월일</div>
                                        <div className="form_cell input">1994년 05월 05일</div>
                                    </div>
                                    <div className="form_row">
                                        <div className="form_cell label">성별</div>
                                        <div className="form_cell input">남</div>
                                    </div>
                                    <div className="form_row">
                                        <div className="form_cell label">연락처(핸드폰)</div>
                                        <div className="form_cell input">010-1234-5678</div>
                                    </div>
                                    <div className="form_row">
                                        <div className="form_cell label">e-mail</div>
                                        <div className="form_cell input">abc123@gmail.com</div>
                                    </div>
                                    <div className="form_row">
                                        <div className="form_cell label">현 주소</div>
                                        <div className="form_cell input">떡잎마을</div>
                                    </div>
                                    <div className="form_row">
                                        <div className="form_cell label">학력사항</div>
                                        <div className="form_cell input">
                                            <table>
                                                <thead>
                                                <tr>
                                                    <th>학교명</th>
                                                    <th>기간</th>
                                                    <th>전공</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td>떡잎대학교</td>
                                                    <td>2020.03.02~2024.02.03</td>
                                                    <td>바이오시스템공학과</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="form_row">
                                        <div className="form_cell label">아르바이트 경력사항</div>
                                        <div className="form_cell input">
                                            <table>
                                                <thead>
                                                <tr>
                                                    <th>직장명</th>
                                                    <th>기간</th>
                                                    <th>주요 업무</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td>떡잎파스타</td>
                                                    <td>2022.03~2023.05</td>
                                                    <td>서빙</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="form_row">
                                        <div className="form_cell label">지원동기</div>
                                        <div className="form_cell input">농부가 되보고 싶어서 지원했습니다.</div>
                                    </div>
                                    <div className="form_row">
                                        <div className="form_cell label">근무시간</div>
                                        <div className="form_cell input">6시간</div>
                                    </div>
                                    <div className="form_row">
                                        <div className="form_cell label">희망시급</div>
                                        <div className="form_cell input">9,860원</div>
                                    </div>
                                </div>
                            </div>
                            <div className="confirmation">
                                상기 내용은 사실과 같음 <br/>
                                2024년 08월 06일 (인)
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="application_inquiry_summary">
                <div className="section_header">
                    <h2>지원 문의 내역</h2>
                    <a href="#" className="more_link">더보기 &gt;</a>
                </div>
                <ul className="application_inquiry_list">
                    <li><span className="status new">New</span><a href="#"> Q. 근무 시간은 어떻게 되나요?</a></li>
                    <li><span className="status answered">답변대기</span><a href="#"> Q. 점심은 제공되나요?</a></li>
                    <li><span className="status completed">답변완료</span><a href="#">Q. 교통비는 지급되나요?</a></li>
                </ul>

                <div className="account_section">
                    <div className="section_header">
                        <h2>내 정보</h2>
                    </div>
                    <ul className="account_list">
                        <li><a href="#">개인정보 수정</a></li>
                        <li><a href="#">회원탈퇴</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Mypage_seller;
