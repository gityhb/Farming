import React, { useState,useEffect} from "react";
import './farmer_job_info.css';
import MapComponent from './component/MapComponent';
import FarmerJobApply from './farmer_job_apply';
import {useParams} from "react-router-dom"; //URL에서 jobId를 가져오기 위한 hook

function FarmerJobInfo() {
    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false)
    const [jobInfo,setJobInfo]=useState(null);//일자리 정보를 저장할 상태
    const {jobId} =useParams();//URL에서 jobId를 가져옴

    //백엔드에서 일자리 정보 가져오는 함수
    const fetchJobInfo=async ()=>{
        try{
            const response = await fetch(`/api/job/${jobId}`)//jobId 사용해 백엔드 API 호출
            if(!response.ok){
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setJobInfo(data); //일자리 정보 상태에 저장
        }catch(error){
            console.error("Error fetching job info:", error);
        }
    };

    useEffect(()=>{
        if(jobId){
            fetchJobInfo();//컴포넌트가 로드될 때 일자리 정보 가져옴
        }
    },[jobId]);

    const handleApplyModal = () => {
        setIsApplyModalOpen(true);  // 모달 열기
    }

    const closeApplyModal = () => {
        setIsApplyModalOpen(false);  // 모달 닫기
    }

    // jobInfo가 null일 경우 로딩 화면을 보여주기
    if (!jobInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div className="farmergic_info_main">
            <div className="farmergic_info_main_img">
                <img src="/img/strawberry_2.jpg" alt="딸기 모종" style={{width: '1020px', height: '480px'}}/>
            </div>
            <div className="farmergic_info_title">
                {jobInfo.jobTitle}
            </div>
            <div className="farmergic_info_seller">
                <img src="/img/pororo.png" alt="딸기"/>
                <div className="farmergic_info_seller_text">
                    {/* 사용자 정보 출력 */}
                    {jobInfo.user?.name} {/* user의 이름 */}
                </div>
            </div>
            <div className="farmergic_info_detail">
                <div className="farmergic_info_detail_title">
                    날짜<br/>시간<br/>임금<br/>위치<br/>상세내역
                </div>
                <div className="farmergic_info_detail_text">
                    {jobInfo.jobDate}<br/>
                    {jobInfo.jobTime}<br/>
                    {jobInfo.jobSalary}<br/>
                    {jobInfo.jobLocation}<br/>
                    {jobInfo.jobDescription}
                </div>
            </div>

            <div className="farmergic_info_map">
                <MapComponent/>
            </div>

            <button className="farmer_info_btn" onClick={handleApplyModal}>
                지원하기
            </button>

            {isApplyModalOpen && (
                <FarmerJobApply isOpen={isApplyModalOpen} closeApplyModal={closeApplyModal} />
            )}
        </div>
    );
}

export default FarmerJobInfo;
