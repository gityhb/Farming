import React, { useState, useEffect, lazy, Suspense } from 'react';
import './job_modal.css';
import DaumPostcode from "react-daum-postcode";
import Modal from "react-modal";

function JobModal({ isOpen, closeJobModal, userId }) {
    const [jobPhoto, setJobPhoto] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [jobDateStart, setJobDateStart] = useState("");
    const [jobDateEnd, setJobDateEnd] = useState("");
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [address, setAddress] = useState({
        zipcode: "",
        roadAddress: "",
        detailAddress: ""
    });

    // Modal 스타일 정의
    const modalStyles = {
        content: {
            width: '600px', // 모달 창의 너비
            height: '400px', // 모달 창의 높이
            margin: 'auto', // 중앙 정렬
        },
        overlay: {
            zIndex: '1000',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 검정색 배경
        },
    };

    console.log("job_modal_userID: ",userId);
    const new_addr = () => {
        setIsAddressModalOpen(!isAddressModalOpen);
    }

    useEffect(() => {
        if (!isOpen) {
            // setIsAddressModalOpen(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleAddJob = () => {
        const formData = new FormData();
        formData.append("userId", userId);
        formData.append("jobTitle", document.getElementById("job_title").value);
        formData.append("jobDateStart", jobDateStart);
        formData.append("jobDateEnd", jobDateEnd);
        formData.append("jobTime", document.getElementById("job_time").value);
        formData.append("jobSalary", document.getElementById("job_salary").value);
        formData.append("jobLocation", `${address.zipcode} ${address.roadAddress} ${address.detailAddress}`);
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
                alert("구인구직 공고가 성공적으로 추가되었습니다.");
                closeJobModal();
            })
            .catch((error) => {
                alert("구인구직 공고 추가에 오류가 발생했습니다.");
                console.error('Error:', error);
            });
    };

    const handlePhotoChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setJobPhoto(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handlePhotoDelete = () => {
        setJobPhoto(null);
        setPreviewUrl(null);
    };

    const handleAddressComplete = (data) => {
        setAddress({
            ...address,
            zipcode: data.zonecode,
            roadAddress: data.roadAddress
        });
        setTimeout(() => setIsAddressModalOpen(false), 100);
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
                                {!previewUrl && (
                                    <label htmlFor="job_photo" className="photo_upload_label">
                                        대표 사진
                                    </label>
                                )}
                                <input
                                    type="file"
                                    id="job_photo"
                                    name="job_photo"
                                    accept="image/*"
                                    onChange={handlePhotoChange}
                                />
                                {previewUrl && (
                                    <div className="preview_container">
                                        <img src={previewUrl} alt="Job Preview" className="preview_image_inside_input"/>
                                        <button className="delete_photo_btn" onClick={handlePhotoDelete}>×</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="job_form_group">
                        <label htmlFor="job_title">공고 제목</label>
                        <input type="text" id="job_title" name="job_title"/>
                    </div>
                    <div className="job_form_group">
                        <label>날짜</label>
                        <div className="date_range">
                            <input
                                type="date"
                                id="job_date_start"
                                name="job_date_start"
                                value={jobDateStart}
                                onChange={(e) => setJobDateStart(e.target.value)}
                            />
                            <span className="date_separator">~</span>
                            <input
                                type="date"
                                id="job_date_end"
                                name="job_date_end"
                                value={jobDateEnd}
                                onChange={(e) => setJobDateEnd(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="job_form_group">
                        <label htmlFor="job_time">시간</label>
                        <input type="text" id="job_time" name="job_time" placeholder="예: 09:00 - 18:00"/>
                    </div>
                    <div className="job_form_group">
                        <label htmlFor="job_salary">임금</label>
                        <input type="text" id="job_salary" name="job_salary" placeholder="예: 80,000원"/>
                    </div>
                    {/* Address Section */}
                    <div className="job_form_group">
                        <label>농장 주소</label>
                        <div className="address_list">
                            <div className="address_input">
                                <input
                                    type="text"
                                    value={address.zipcode}
                                    name="zipcode"
                                    readOnly
                                    placeholder="우편번호"
                                    style={{width: '65%'}}
                                />
                                <button
                                    type="button"
                                    className="find_zip_code_btn"
                                    onClick={new_addr}
                                >
                                    우편번호 찾기
                                </button>
                            </div>
                            <div className="address_input">
                                <input
                                    type="text"
                                    value={address.roadAddress}
                                    name="roadAddress"
                                    readOnly
                                    placeholder="도로명 주소"
                                />
                            </div>
                            <div className="address_input">
                                <input
                                    type="text"
                                    name="detailAddress"
                                    value={address.detailAddress}
                                    onChange={(e) => setAddress({ ...address, detailAddress: e.target.value })}
                                    placeholder="상세주소"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Display로 DaumPostcode 모달 숨기기 */}
                    {/*<div style={{ display: isAddressModalOpen ? "block" : "none" }}>*/}
                    {/*    <Suspense fallback={<div>Loading...</div>}>*/}
                    {/*        <DaumPostcodeComponent onComplete={handleAddressComplete} />*/}
                    {/*    </Suspense>*/}
                    {/*</div>*/}
                    <Modal isOpen={isAddressModalOpen} style={modalStyles} ariaHideApp={false}
                           onRequestClose={() => setIsAddressModalOpen(false)}>
                        <DaumPostcode onComplete={handleAddressComplete} height="100%"/>
                    </Modal>

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
