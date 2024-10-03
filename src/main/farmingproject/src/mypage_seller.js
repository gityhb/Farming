import React, { useState,useEffect } from 'react';
import './mypage_seller.css';
import './common/root.css';
import JobModal from './component/job_modal';
import {Link} from "react-router-dom";
import {useUser} from "./common/userContext";

function Mypage_seller() {

    const { user } = useUser();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isJobModalOpen, setIsJobModalOpen] = useState(false);
    const [loggedInUserId,setLoggedInUserId]=useState(null);
    const [jobs,setJobs]=useState([]); //job 상태 추가

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

    //사용자의 정보를 가져오는 useEffect
    useEffect(()=>{
        //서버에서 사용자의 정보를 불러오는 API 호출
        fetch('/api/user')
            .then(reponse=>reponse.json())
            .then(data=>{
                setLoggedInUserId(data.userId);
            })
            .catch(error=>{
                console.error("Error fetching user info:",error);
            });
    },[]);

    //데이터베이스에서 일자리 정보를 가져오는 함수
    const fetchJobs=async ()=>{
        try{
            const res = await fetch('api/job/all') //모든 일자리 백엔드 호출
            if(!res.ok){
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            setJobs(data); //일자리 데이터 상태에 저장
        }catch(error){
            console.error('Error fetching jobs:',error);
        }
    };
    useEffect(() => {
        fetchJobs(); //컴포넌트 마운트 시 일자리 정보 가져옴
    },[]);

    return (
        <div className="mypage_seller">
            <h1>마이페이지</h1>
            <div className="section_header">
                <h2>판매자 소개</h2>
            </div>
            <div className="seller_info">
                <div className="seller_photo">
                    {/*<span>( 사진 등록 )</span>*/}
                    <img src={"./img/osj.jpg"} alt={"판매자 사진"} />
                </div>
                <div className="seller_details">
                    <p>이름 : {user.name}</p>
                    <p>사업자 등록 번호 : 12345678</p>
                    <p>위치 : {user.address}</p>
                </div>
            </div>
            <div className="products_section">
                <div className="section_header">
                    <h2>판매중인 상품 (2)</h2>
                    <a href="#" className="more_link">더보기 &gt;</a>
                </div>
                <div className="product_list">
                    <div className="product_item">
                        <Link to={"/farmer_market_info_seller"}><img src="./img/watermelon.png" alt="상품사진"/></Link>
                    </div>
                    <div className="product_item">
                        <img src="./img/apple_2.png" alt="상품사진"/>
                    </div>
                </div>
            </div>
            <div className="products_section">
                <div className="section_header">
                    <h2> 농장 온습도</h2>
                </div>
                <div className="product_list" style={{display: "block"}}>
                    <div>
                        온도 : 26.4 'C
                    </div>
                    <br/>
                    <div>
                        습도 : 37.6 %
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
                        <li><span className="status completed">답변완료</span><a href="#"> Q. 이 곳 주인장 전화번호 뭐가요. 물어볼 게
                            있...</a></li>
                    </ul>
                </div>
            </div>
            <div className="farmer_jobs">
                <div className="section_header">
                    <h2>파머직</h2>
                    <a href="#" className="more_link">더보기 &gt;</a>
                </div>
                <div className="job_management">
                    <ul className="job_list">
                        {jobs.length>0?(
                            jobs.map((job)=>(
                                <li key={job.jobId}>
                                    <a href="#"><strong>{job.jobTitle}</strong> - {job.jobDate}, 일당 {job.jobSalary}</a>
                                </li>
                            ))
                        ): (
                            <li>등록된 일자리가 없습니다.</li>
                        )}
                    </ul>
                    <button className="add_job_button" onClick={handleAddJob}>새 공고 추가</button>
                </div>
            </div>

            <JobModal isOpen={isJobModalOpen} closeJobModal={closeJobModal} userId={loggedInUserId}/>

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
                                        <div className="form_cell label">지원동기</div>
                                        <div className="form_cell input">농부가 되보고 싶어서 지원했습니다.</div>
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
        </div>
    );
}

export default Mypage_seller;
