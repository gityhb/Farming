import React,{useState} from "react";
import './farmer_job_info.css';
import MapComponent from './component/MapComponent';
import Modal from './component/Modal';
import FarmerJobApply from './farmer_job_apply';


function FarmerJobInfo() {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="farmergic_info_main">
            <div className="farmergic_info_main_img">
                <img src="/img/strawberry_2.jpg" alt="딸기 모종" style={{ width: '1020px', height: '480px' }} />
            </div>
            <div className="farmergic_info_title">
                쉬운 알바/ 충남/ 논산 / 딸기 모종 심기/ 임금 당일 지급
            </div>
            <div className="farmergic_info_seller">
                <img src="/img/pororo.png" alt="딸기"/>
                <div className="farmergic_info_seller_text">
                    김흥만<br/><br/>
                    사업자 등록 인증
                </div>
            </div>
            <div className="farmergic_info_detail">

                <div className="farmergic_info_detail_item_1">
                    근무 정보 <br/>
                </div>
                <div className="farmergic_info_detail_item">

                    <div className="farmergic_info_detail_title">
                        날짜<br/>시간<br/>임금<br/>위치<br/>상세내역
                    </div>
                    <div className="farmergic_info_datail_text">
                        05/24 금요일<br/>
                        9:00~13:00<br/>
                        48,000원 / 시급 12,000원<br/>
                        충남 논산시 부적면 충곡리<br/>
                        #꿀알바 #당일 지급<br/><br/>
                        딸기 모종 심어주시면 됩니다.<br/>
                        어렵지 않으니 지원 부탁드립니다.

                    </div>
                </div>

            </div>

            <div className="farmergic_info_map">
                <MapComponent/>
            </div>

            <button className="farmer_info_btn" onClick={handleOpenModal}>
             지원하기
            </button>
            <Modal show={showModal} handleClose={handleCloseModal}>
                <FarmerJobApply />
            </Modal>
        </div>
    );
}

export default FarmerJobInfo;
