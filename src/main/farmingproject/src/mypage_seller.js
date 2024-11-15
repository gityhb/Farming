import React, { useState,useEffect } from 'react';
import './mypage_seller.css';
import './common/root.css';
import JobModal from './component/job_modal';
import {Link, useNavigate} from "react-router-dom";
import {useUser} from "./common/userContext";

function Mypage_seller() {

    const { user } = useUser();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isJobModalOpen, setIsJobModalOpen] = useState(false);
    // const [loggedInUserId,setLoggedInUserId]=useState(null);
    const [jobs,setJobs]=useState([]); //job 상태 추가
    const [selectedApplication, setSelectedApplication] = useState(null); // 선택된 지원자의 정보를 저장할 상태
    const [productApplyLists, setProductApplyLists] = useState([]);     // 상품 등록 신청 목록 상태 추가
    const [applications, setApplications] = useState([]); // 지원 완료 내역 상태 추가
    const [products, setProducts] = useState([]);   // 판매자가 판매 중인 상품
    const [temperature, setTemperature] = useState(null);
    const [humidity, setHumidity] = useState(null);
    const [error, setError] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(null);
    const navigate = useNavigate();

    const handleViewResume = (application) => {
        setSelectedApplication(application);  // 선택된 지원자의 정보를 상태에 저장
        setIsModalOpen(true);  // 모달 열기
    };

    const closeModal = () => {
        setIsModalOpen(false);  // 모달 닫기
        setSelectedApplication(null);  // 선택된 지원자 정보 초기화
    };

    const handleAddJob = () => {
        setIsJobModalOpen(true); // Open job modal
    };

    const closeJobModal = () => {
        setIsJobModalOpen(false); // Close job modal
    };

    //사용자의 정보를 가져오는 useEffect
    // useEffect(()=>{
    //     //서버에서 사용자의 정보를 불러오는 API 호출
    //     fetch('/api/user')
    //         .then(reponse=>reponse.json())
    //         .then(data=>{
    //             setLoggedInUserId(data.userId);
    //         })
    //         .catch(error=>{
    //             console.error("Error fetching user info:",error);
    //         });
    // },[]);

    // 판매자가 판매 중인 상품 가져오는 함수
    const fetchSellerProducts = async (sellerId) => {
        try {
            const response = await fetch(`/api/productRG/seller/${sellerId}`);
            if (response.ok) {
                const data = await response.json();
                setProducts(data);
            } else {
                console.error('상품 정보 가져오기 실패');
            }
        } catch (error) {
            console.error('상품 정보 가져오는 중 오류 발생:', error);
        }
    };

    //데이터베이스에서 일자리 정보를 가져오는 함수 ( userId로 해당 사용자의 일자리 정보 가져옴 )
    const fetchJobs = async (userId)=>{
        console.log("JobListUserId : ",userId);
        try{
            const res = await fetch(`api/job/user/${userId}`) //모든 일자리 백엔드 호출
            if(!res.ok){
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            setJobs(data.reverse()); //일자리 데이터 상태에 저장
        }catch(error){
            console.error('Error fetching jobs:',error);
        }
    };

    // 판매자의 상품 등록 신청 현황 가져오는 함수
    const fetchProductApplyLists = async (id) => {
        console.log("id : ",id);
        try {
            const response = await fetch(`api/product/${id}/applylist`)
            if(response.ok) {
               const data = await response.json();
               setProductApplyLists(data.reverse());
            }
        } catch (error) {
            console.error('Error fetching productApplyLists : ', error);
        }
    }

    // 지원 완료 내역을 가져오는 함수
    // 사용자가 올린 구인 공고에 대해 지원한 지원 내역을 가져오는 함수
    const fetchApplications = async (id) => {
        try {
            const res = await fetch(`/api/jobapply/user/${id}/applications`); // 지원 내역을 가져오는 API 호출
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            setApplications(data); // 지원 내역 상태에 저장
        } catch (error) {
            console.error('Error fetching applications:', error);
        }
    };

    // user가 설정된 후 해당 사용자의 일자리 및 지원 내역 정보 가져오기
    useEffect(() => {
        if (user && user.id) {
            fetchJobs(user.id); // user.id로 fetchJobs 호출
            fetchApplications(user.id); // user.id로 fetchApplications 호출
            fetchProductApplyLists(user.id);
            fetchSellerProducts(user.id);
        }
    }, [user]);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:5000/temperature-humidity');
            if (response.ok) {
                const data = await response.json();
                setTemperature(data.temperature);
                setHumidity(data.humidity);
                setError(null); // 오류 상태 초기화
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (err) {
            setError(err.message);
            setTemperature(null);
            setHumidity(null);
        }
    };

    useEffect(() => {
        // 페이지가 로드되면 바로 fetchData 실행
        fetchData();

        // 일정 주기로 fetchData를 실행하여 상태 확인
        const interval = setInterval(fetchData, 5000);  // 5초마다 요청
        return () => clearInterval(interval);  // 컴포넌트 언마운트 시 interval 제거
    }, []);


    const handleProductClick = (productId) => {
        navigate(`/product_apply_list_detail/${productId}`); // Navigate to the product detail page
    };

    return (
        <div className="mypage_seller">
            <h1>마이페이지</h1>
            <div className="section_header">
                <h2>판매자 소개</h2>
            </div>
            <div className="seller_info">
                <div className="seller_photo">
                    {/*<span>( 사진 등록 )</span>*/}
                    <img src={"./img/etc/user.png"} alt={"판매자 사진"}/>
                </div>
                {user? (
                    <div className="seller_details">
                        <p>이름 : {user.name}</p>
                        <p>사업자 등록 번호 : {user.businessNumber}</p>
                        <p>위치 : {user.address}</p>
                    </div>
                    ) : (
                    <div className="seller_details">
                        <p>로그인 해주세요</p>
                    </div>
                    )}
                
            </div>
            <div className="products_section">
                <div className="section_header">
                    <h2>판매중인 상품 ({products.length})</h2>
                    <a href="#" className="more_link">더보기 &gt;</a>
                </div>
                <div className="product_list">
                    {products.map(product => (
                    <div key={product.productId} className="product_item">
                        <Link to={`/farmer_market_info_seller/${product.productId}`}><img src={product.productimgPath} alt={product.productName}/></Link>
                    </div>
                    ))}
                </div>
            </div>
            <div className="products_section">
                <div className="section_header">
                    <h2> 농장 온습도</h2>
                </div>
                <div className="product_list" style={{display: "block"}}>
                    <div>
                        {error ? (
                            <p>{error}</p>
                        ) : (
                            <>
                                <p>현재 온도: {temperature ? `${temperature}°C` : 'Loading...'}</p>
                                <p>현재 습도: {humidity ? `${humidity}%` : 'Loading...'}</p>
                                <span style={{color: '#828282', float: 'right', marginTop: '0px', fontSize: '15px'}}>(업데이트된 시각) {lastUpdated || 'Loading...'}</span>
                            </>
                        )}
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
                    <h2>상품 등록 신청 현황</h2>
                    <a href="#" className="more_link">더보기 &gt;</a>
                </div>
                <div className="job_management">
                    <ul className="job_list">
                        {productApplyLists.length > 0 ? (
                            productApplyLists.slice(0, 86).map((products) => (
                                <li key={products.productId} onClick={() => handleProductClick(products.productId)}>
                                    {products.productStatus === 0 && <span className={"pListsStatus"} style={{backgroundColor: '#D9D9D9'}}>보류</span>}
                                    {products.productStatus === 1 && <span className={"pListsStatus"} style={{backgroundColor: '#FFF0AD'}}>등록</span>}
                                    {products.productStatus === 2 && <span className={"pListsStatus"} style={{backgroundColor: '#FB5C5C'}}>탈락</span>}
                                    {products.productStatus === 3 && <span className={"pListsStatus"} style={{backgroundColor: '#c3ea8b'}}>판매</span>}
                                    <a href="#"><strong>{products.productName}</strong></a>
                                </li>
                            ))
                        ) : (
                            <li>신청한 상품이 없습니다.</li>
                        )}
                    </ul>
                </div>
            </div>
            {/* 사용자가 올린 구인 공고 */}
            <div className="farmer_jobs">
                <div className="section_header">
                    <h2>파머직</h2>
                    <a href="#" className="more_link">더보기 &gt;</a>
                </div>
                <div className="job_management">
                    <ul className="job_list">
                        {jobs.length > 0 ? (
                            jobs.map((job) => (
                                <li key={job.jobId}>
                                    <Link to={`/farmer_job_info/${job.jobId}`}>
                                        <strong>{job.jobTitle}</strong> - {job.jobDateStart} ~ {job.jobDateEnd} / 일당 {job.jobSalary}
                                    </Link>
                                </li>
                            ))
                        ) : (
                            <li>등록된 일자리가 없습니다.</li>
                        )}
                    </ul>
                    <button className="add_job_button" onClick={handleAddJob}>새 공고 추가</button>
                </div>
            </div>

            <JobModal isOpen={isJobModalOpen} closeJobModal={closeJobModal} userId={user?.id}/>

            <div className="application_section">
                <div className="application_summary">
                    <div className="section_header">
                        <h2>지원 완료 내역</h2>
                        <a href="#" className="more_link">더보기 &gt;</a>
                    </div>
                    <ul className="application_list">
                        {applications.length > 0 ? (
                            applications.map((application) => (
                                <li key={application.jobApplyId}>
                                    <div className="application_details">
                                        <p><strong>{application.job ? application.job.jobTitle : '직업 정보 없음'}</strong>
                                        </p>
                                        <p>지원자: {application.user ? application.user.name : '지원자 정보 없음'}</p>
                                        <p>지원 내용: {application.applyContent || '지원 내용 없음'}</p>
                                        <p>확인: <button className="btn" onClick={() => handleViewResume(application)}>이력서
                                            열람</button></p>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <li>등록된 지원 내역이 없습니다.</li>
                        )}
                    </ul>

                </div>
                {isModalOpen && selectedApplication && selectedApplication.user && (
                    <div className="modal">
                        <div className="modal_content">
                            <span className="close" onClick={closeModal}>&times;</span>
                            <div className="form_container">
                                <h1 className="form_title">아르바이트 지원서</h1>
                                <div className="form_table">
                                    <div className="form_row">
                                        <div className="form_cell label">성명</div>
                                        <div className="form_cell input">{selectedApplication.user.name}</div>
                                    </div>
                                    <div className="form_row">
                                        <div className="form_cell label">생년월일</div>
                                        <div className="form_cell input">{selectedApplication.applyBirth}</div>
                                    </div>
                                    <div className="form_row">
                                        <div className="form_cell label">성별</div>
                                        <div className="form_cell input">{selectedApplication.user.gender}</div>
                                    </div>
                                    <div className="form_row">
                                        <div className="form_cell label">연락처(핸드폰)</div>
                                        <div className="form_cell input">{selectedApplication.user.phoneNumber}</div>
                                    </div>
                                    <div className="form_row">
                                        <div className="form_cell label">e-mail</div>
                                        <div className="form_cell input">{selectedApplication.user.email}</div>
                                    </div>
                                    <div className="form_row">
                                        <div className="form_cell label">현 주소</div>
                                        <div className="form_cell input">{selectedApplication.user.address}</div>
                                    </div>
                                    <div className="form_row">
                                        <div className="form_cell label">지원동기</div>
                                        <div className="form_cell input">{selectedApplication.applyContent}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="confirmation">
                                상기 내용은 사실과 같음 <br/>
                                {new Date().toLocaleDateString()} (인)
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
