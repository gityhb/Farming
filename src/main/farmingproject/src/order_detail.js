import './order_detail.css';
import './common/root.css';
import './shopping_basket.css';
import './mypage.css'
import React, {useState, useEffect} from 'react';

function Order_detail() {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0]; // 현재 날짜를 "YYYY-MM-DD" 형식으로 변환

    const [dateStart, setDateStart] = useState(todayStr);
    const [dateEnd, setDateEnd] = useState(todayStr);
    const [selectedBtn, setSelectedBtn] = useState(null);

    const handleDateBtnClick = (months) => {
        const endDate = new Date(); // 현재 날짜로 설정
        const startDate = new Date(endDate);
        startDate.setMonth(startDate.getMonth() - months);

        setDateStart(startDate.toISOString().split('T')[0]);
        setDateEnd(endDate.toISOString().split('T')[0]);
        setSelectedBtn(months);
    };

    return (
        <div id="body">
            <div id={'payment_success_page'} className={'page'}>
                <div id={'contents'}>
                    <div className="title_component">
                        주문내역
                    </div>

                    <div className={'order_date_select_div'}>
                        <div className={'order_date_select'}>
                            <div className={'order_date_Btn'}>
                                <span>구매기간</span>
                                <div className={`date_Btn ${selectedBtn === 1 ? 'active' : ''}`}
                                     onClick={() => handleDateBtnClick(1)}>
                                    1개월
                                </div>
                                <div className={`date_Btn ${selectedBtn === 6 ? 'active' : ''}`}
                                     onClick={() => handleDateBtnClick(6)}>
                                    6개월
                                </div>
                                <div className={`date_Btn ${selectedBtn === 12 ? 'active' : ''}`}
                                     onClick={() => handleDateBtnClick(12)}>
                                    12개월
                                </div>
                                <div className={`date_Btn ${selectedBtn === 'custom' ? 'active' : ''}`}
                                    onClick={() => setSelectedBtn('custom')}>
                                    직접입력
                                </div>
                            </div>
                            <div className={'order_date_edit'}>
                                <input
                                    type="date"
                                    id="date_start"
                                    value={dateStart}
                                    max={todayStr}
                                    onChange={(e) => setDateStart(e.target.value)}
                                />
                                ~
                                <input
                                    type="date"
                                    id="date_end"
                                    value={dateEnd}
                                    max={todayStr}
                                    onChange={(e) => setDateEnd(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className={'order_date_select_Btn'}>
                            조회
                        </div>
                    </div>

                    <div className={'order_detail_div'}>
                        <div className={'order_date'}>
                            2024. 01. 05
                        </div>
                        <hr/>
                        <div className={'order_detail'}>
                            <div className={'order_detail_img'}>
                                <img src="img/carrot_2.png" alt="당근2"/>
                            </div>
                            <div className={'order_detail_content'}>
                                <p>햇살 농원</p>
                                <p>국내산 오이 (아삭아삭)</p>
                                <p>3개</p>
                                <p>6,700원</p>
                            </div>
                        </div>

                        <div className={'order_detail'}>
                            <div className={'order_detail_img'}>
                                <img src="img/carrot_2.png" alt="당근2"/>
                            </div>
                            <div className={'order_detail_content'}>
                                <p>햇살 농원</p>
                                <p>국내산 오이 (아삭아삭)</p>
                                <p>3개</p>
                                <p>6,700원</p>
                            </div>
                        </div>
                    </div>

                    <div className={'order_detail_div'}>
                        <div className={'order_date'}>
                            2024. 01. 07
                        </div>
                        <hr/>
                        <div className={'order_detail'}>
                            <div className={'order_detail_img'}>
                                <img src="img/carrot_2.png" alt="당근2"/>
                            </div>
                            <div className={'order_detail_content'}>
                                <p>햇살 농원</p>
                                <p>국내산 오이 (아삭아삭)</p>
                                <p>3개</p>
                                <p>6,700원</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Order_detail;