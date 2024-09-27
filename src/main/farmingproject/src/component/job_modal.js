import React, { useState } from 'react';
import './job_modal.css';

function JobModal({ isOpen, closeJobModal, userId }) {
    const [jobPhoto, setJobPhoto] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null); // 이미지 미리보기 URL 상태

    if (!isOpen) return null;

    const handleAddJob = () => {
        const formData = new FormData();
        formData.append("userId", userId);
        formData.append("jobTitle", document.getElementById("job_title").value);
        formData.append("jobDate", document.getElementById("job_date").value);
        formData.append("jobTime", document.getElementById("job_time").value);
        formData.append("jobSalary", document.getElementById("job_salary").value);
        formData.append("jobLocation", document.getElementById("job_location").value);
        formData.append("jobDescription", document.getElementById("job_description").value || "");
        if (jobPhoto) {
            formData.append("jobPhoto", jobPhoto);
        }

        fetch('api/job/create', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                closeJobModal();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    // 파일 선택시 상태 업데이트 및 미리보기 이미지 생성
    const handlePhotoChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setJobPhoto(file); // 선택된 파일을 상태에 저장
            const previewUrl = URL.createObjectURL(file); // 파일의 URL 생성
            setPreviewUrl(previewUrl); // 미리보기 URL 상태에 저장
        }
    };

    return (
        <div className="job_modal">
            <div className="job_modal_content">
                <span className="close" onClick={closeJobModal}>&times;</span>
                <div className="job_form_container">
                    <h1 className="job_form_title">공고 추가</h1>
                    <div className="job_form_group">
                        <div className="job_photo_upload">
                            <div className="file_input_container">
                                <input
                                    type="file"
                                    id="job_photo"
                                    name="job_photo"
                                    accept="image/*" // 이미지만 선택 가능
                                    onChange={handlePhotoChange} // 파일 선택시 호출
                                />
                                {/* 미리보기 이미지가 선택되었을 때만 보여줍니다 */}
                                {previewUrl && (
                                    <img src={previewUrl} alt="Job Preview" className="preview_image_inside_input" />
                                )}
                            </div>
                            <label htmlFor="job_photo">대표 사진</label>
                        </div>
                    </div>
                    <div className="job_form_group">
                        <label htmlFor="job_title">공고 제목</label>
                        <input type="text" id="job_title" name="job_title" />
                    </div>
                    <div className="job_form_group">
                        <label htmlFor="job_date">날짜</label>
                        <input type="date" id="job_date" name="job_date" />
                    </div>
                    <div className="job_form_group">
                        <label htmlFor="job_time">시간</label>
                        <input type="text" id="job_time" name="job_time" placeholder="예: 09:00 - 18:00" />
                    </div>
                    <div className="job_form_group">
                        <label htmlFor="job_salary">임금</label>
                        <input type="text" id="job_salary" name="job_salary" placeholder="예: 80,000원" />
                    </div>
                    <div className="job_form_group">
                        <label htmlFor="job_location">위치</label>
                        <input type="text" id="job_location" name="job_location" />
                    </div>
                    <div className="job_form_group">
                        <label htmlFor="job_description">상세내역</label>
                        <textarea id="job_description" name="job_description"></textarea>
                    </div>
                    <div className="job_form_group">
                        <button className="add_btn" onClick={handleAddJob}>추가</button>
                        <button className="close_btn" onClick={closeJobModal}>취소</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default JobModal;
