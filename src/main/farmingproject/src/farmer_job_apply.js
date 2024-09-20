import React, { useState } from 'react';
import './farmer_job_apply.css';
import { useUser } from "./common/userContext"; // useUser 훅을 통해 로그인된 사용자 정보 가져오기

function FarmerJobApply({ isOpen, closeApplyModal, jobId }) {
    const { user } = useUser(); // 로그인된 사용자 정보 불러오기

    // 사용자 입력 상태 관리
    const [formData, setFormData] = useState({
        name: user.name || '',  // 사용자 이름
        age: user.birthDate || '',  // 사용자의 생년월일
        phone: user.phoneNumber || '',  // 사용자 전화번호
        address: user.address || '',  // 사용자 주소
        detail: ''  // 지원동기는 빈칸으로 유지
    });

    // 입력값 변경 핸들러
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // 지원서 제출 핸들러
    const handleSubmit = async () => {
        const applyData = {
            jobId: parseInt(jobId, 10),  // jobId가 Long 타입이어야 하므로 숫자로 변환
            //jobId: jobId,
            userId: user.id,  // 현재 로그인된 사용자의 ID를 useUser 훅에서 가져오기
            applyBirth: formData.age,  // 나이를 생년월일로 변환 필요
            applyContent: formData.detail
        };
        console.log("전송할 데이터:", applyData); // 콘솔에 전송할 데이터를 출력하여 확인

        try {
            const response = await fetch('/api/jobapply/apply', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(applyData)
            });

            if (response.ok) {
                alert('지원이 성공적으로 완료되었습니다.');
                closeApplyModal(); // 모달 닫기
            } else {
                alert('지원 중 오류가 발생했습니다.');
            }
        } catch (error) {
            console.error('지원서 제출 오류:', error);
            alert('지원 중 오류가 발생했습니다.');
        }
    };

    // 모달이 열리지 않은 경우 null 반환
    if (!isOpen) return null;

    return (
        <div className="apply_modal">
            <div className="apply_modal_content">
                <div className="apply_header">
                    지원하기
                    <span className="close" onClick={closeApplyModal}>&times;</span>
                </div>
                <div className="apply_main">
                    <div className="main_name">
                        <label>이름</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            readOnly // 로그인한 사용자 정보이므로 수정 불가하게 설정
                        />
                    </div>
                    <div className="main_age">
                        <label htmlFor="age">생년월일</label>
                        <input
                            type="date"
                            id="age"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="main_number">
                        <label htmlFor="phone">전화번호</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            readOnly // 로그인한 사용자 정보이므로 수정 불가하게 설정
                        />
                    </div>
                    <div className="main_address">
                        <label htmlFor="address">주소</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            readOnly // 로그인한 사용자 정보이므로 수정 불가하게 설정
                        />
                    </div>
                    <div className="main_detail">
                        <label htmlFor="detail">자기소개 및 지원동기</label>
                        <textarea
                            id="detail"
                            name="detail"
                            rows="4"
                            value={formData.detail}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <button className="apply_button" onClick={handleSubmit}>
                    등록
                </button>
            </div>
        </div>
    );
}

export default FarmerJobApply;
