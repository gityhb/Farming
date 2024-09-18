import React from 'react';
import './farmer_job_apply.css';

function FarmerJobApply({isOpen,closeApplyModal}) {
    if(!isOpen) return null;

    return (
        <div className="apply_modal">
            <div className={"apply_modal_content"}>
                <div className="apply_header">
                    지원하기
                    <span className="close" onClick={closeApplyModal}>&times;</span>
                </div>
                <div className="apply_main">
                <div className="main_name">
                        <label>이름</label>
                        <input type="text" id="name" name="name"/>
                    </div>
                    <div className="main_age">
                        <label htmlFor="age">나이</label>
                        <input type="number" id="age" name="age"/>
                    </div>
                    <div className="main_number">
                        <label htmlFor="phone">전화번호</label>
                        <input type="tel" id="phone" name="phone"/>
                    </div>
                    <div className="main_address">
                        <label htmlFor="address">주소</label>
                        <input type="text" id="address" name="address"/>
                    </div>
                    <div className="main_detail">
                        <label htmlFor="detail">자기소개 및 지원동기</label>
                        <textarea id="detail" name="detail" rows="4"/>
                    </div>
                </div>
                <button className="apply_button">
                    등록
                </button>
            </div>
        </div>
    );
}

export default FarmerJobApply;
