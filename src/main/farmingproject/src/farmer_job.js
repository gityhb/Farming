import React from 'react';
import './farmer_job.css';
import {  useNavigate } from 'react-router-dom';

function FarmerJob(){
    const navigate=useNavigate();

    const handleClick=()=>{
        navigate('/farmer_job_info');
    };
    return (
        <div>
            <div className="farmergic_menu">
                <div className="farmergic_menu_text">
                    쉽고 빠르게 일손 구하기
                </div>
                <div className="farmergic_menu_button">
                <button className="farmergic_menu_button_1">시</button>
                <button className="farmergic_menu_button_2">구</button>
                </div>
            </div>
            <div className="farmergic_main_container">
                <div className="farmergic_main">
                    <div className="farmergic_main_item" onClick={handleClick}>
                        <div className="farmergic_main_item_title">딸기 모종 심기</div>
                        <div className="farmergic_main_item_info">
                            <div className="farmergic_main_item_date_img">
                                <img src="/img/clock.jpg" style={{width: '20px', height: '15px'}}/>
                                <div className="farmergic_main_item_date">05/24 9:00</div>
                            </div>
                            <div className="farmergic_main_item_pay_img">
                                <img src="/img/pay.jpg" alt="딸기 모종" style={{width: '20px', height: '15px'}}/>
                                <div className="farmergic_main_item_pay">시급 12,000</div>
                            </div>
                            <div className="farmergic_main_item_location_img">
                                <img src="/img/location.jpg" alt="딸기 모종" style={{width: '20px', height: '15px'}}/>
                                <div className="farmergic_main_item_location">충남 / 논산</div>
                            </div>
                        </div>
                        <div className="farmergic_main_item_image">
                            <img src="/img/strawberry_2.jpg" alt="딸기 모종" style={{width: '230px', height: '160px'}}/>
                        </div>
                    </div>

                    <div className="farmergic_main_item">
                        <div className="farmergic_main_item_title">고구마 캐기</div>
                        <div className="farmergic_main_item_info">
                            <div className="farmergic_main_item_date_img">
                                <img src="/img/clock.jpg" style={{width: '20px', height: '15px'}}/>
                                <div className="farmergic_main_item_date">05/26 7:00</div>
                            </div>
                            <div className="farmergic_main_item_pay_img">
                                <img src="/img/pay.jpg" alt="딸기 모종" style={{width: '20px', height: '15px'}}/>
                                <div className="farmergic_main_item_pay">시급 11,000</div>
                            </div>
                            <div className="farmergic_main_item_location_img">
                                <img src="/img/location.jpg" alt="딸기 모종" style={{width: '20px', height: '15px'}}/>
                                <div className="farmergic_main_item_location">전라남도 / 무안군</div>
                            </div>
                        </div>
                        <div className="farmergic_main_item_image">
                            <img src="/img/farmer_job_3.png" alt="딸기 모종" style={{width: '230px', height: '160px'}}/>
                        </div>
                    </div>

                    <div className="farmergic_main_item" onClick={handleClick}>
                        <div className="farmergic_main_item_title">상추 수확</div>
                        <div className="farmergic_main_item_info">
                            <div className="farmergic_main_item_date_img">
                                <img src="/img/clock.jpg" style={{width: '20px', height: '15px'}}/>
                                <div className="farmergic_main_item_date">05/26 10:00</div>
                            </div>
                            <div className="farmergic_main_item_pay_img">
                                <img src="/img/pay.jpg" alt="딸기 모종" style={{width: '20px', height: '15px'}}/>
                                <div className="farmergic_main_item_pay">시급 9,860원</div>
                            </div>
                            <div className="farmergic_main_item_location_img">
                                <img src="/img/location.jpg" alt="딸기 모종" style={{width: '20px', height: '15px'}}/>
                                <div className="farmergic_main_item_location">전라북도 / 남원시</div>
                            </div>
                        </div>
                        <div className="farmergic_main_item_image">
                            <img src="/img/farmer_job_2.png" alt="딸기 모종" style={{width: '230px', height: '160px'}}/>
                        </div>
                    </div>

                    <div className="farmergic_main_item" onClick={handleClick}>
                        <div className="farmergic_main_item_title">비닐하우스 농약</div>
                        <div className="farmergic_main_item_info">
                            <div className="farmergic_main_item_date_img">
                                <img src="/img/clock.jpg" style={{width: '20px', height: '15px'}}/>
                                <div className="farmergic_main_item_date">05/26 10:00</div>
                            </div>
                            <div className="farmergic_main_item_pay_img">
                                <img src="/img/pay.jpg" alt="딸기 모종" style={{width: '20px', height: '15px'}}/>
                                <div className="farmergic_main_item_pay">시급 25,000원</div>
                            </div>
                            <div className="farmergic_main_item_location_img">
                                <img src="/img/location.jpg" alt="딸기 모종" style={{width: '20px', height: '15px'}}/>
                                <div className="farmergic_main_item_location">제주도 / 서귀포</div>
                            </div>
                        </div>
                        <div className="farmergic_main_item_image">
                            <img src="/img/farmer_job_4.png" alt="딸기 모종" style={{width: '230px', height: '160px'}}/>
                        </div>
                    </div>




                </div>
            </div>
        </div>
    );
}

export default FarmerJob;
