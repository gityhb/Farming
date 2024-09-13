import React from 'react';
import './job_modal.css';

function JobModal({ isOpen, closeJobModal }) {
    if (!isOpen) return null;

    return (
        <div className="job_modal">
            <div className="job_modal_content">
                <span className="close" onClick={closeJobModal}>&times;</span>
                {/* 공고 추가 폼 */}
                <div className="job_form_container">
                    <h1 className="job_form_title">공고 추가</h1>
                    <div className="job_form_group">
                        <div className="job_photo_upload">
                            <input type="file" id="job_photo" name="job_photo"/>
                            <label htmlFor="job_photo">대표 사진</label>
                        </div>
                    </div>
                    <div className="job_form_group">
                        <label htmlFor="job_title">공고 제목</label>
                        <input type="text" id="job_title" name="job_title"/>
                    </div>
                    <div className="job_form_group">
                        <label htmlFor="job_date">날짜</label>
                        <input type="date" id="job_date" name="job_date"/>
                    </div>
                    <div className="job_form_group">
                        <label htmlFor="job_time">시간</label>
                        <input type="text" id="job_time" name="job_time" placeholder="예: 09:00 - 18:00"/>
                    </div>
                    <div className="job_form_group">
                        <label htmlFor="job_salary">임금</label>
                        <input type="text" id="job_salary" name="job_salary" placeholder="예: 80,000원"/>
                    </div>
                    <div className="job_form_group">
                        <label htmlFor="job_location">위치</label>
                        <input type="text" id="job_location" name="job_location"/>
                    </div>
                    <div className="job_form_group">
                        <label htmlFor="job_details">상세내역</label>
                        <textarea id="job_details" name="job_details"></textarea>
                    </div>
                    <div className="job_form_group">
                        <button className="add_btn">추가</button>
                        <button className="close_btn" onClick={closeJobModal}>취소</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default JobModal;