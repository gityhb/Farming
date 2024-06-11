import React from 'react';
import './Footer.css';

function Footer(){
    return(
        <footer className="footer">
            <div className="footer_links">
                <a href="/company">회사 소개</a>
                <a href="/careers">채용 정보</a>
                <a href="/partners">상품 입점 문의</a>
                <a href="/support">고객 센터</a>
            </div>
            <div className="notice">
                <div className="notice_1">
                    <h2>Farming파밍</h2>
                </div>
                <div className="notice_2">
                    (주)파밍주식회사 <br/>
                    대표이사:오민송 <br/>
                    사업자번호:234045-23423<br/>
                    주소:서울특별시 구로구 동양미래대학교3호관3층<br/>
                    전화:1599-1234<br/>
                    호스팅 사업자:FM파밍호스팅<br/>
                    이메일:babo@gamil.com
                </div>
                <div className="notice_3">
                    이용약관.법적고지<br/>
                    개인정보처리방침<br/>
                    청소년보호방침<br/>
                    영상정보처리기기 <br/>
                    운영/관리방침<br/>
                    이메일무단수집거부<br/>
                </div>
                <div className="notice_4">
                    국민은행 구매안전 서비스<br/>
                    현금 결제한 금액에 대해<br/>
                    국민은행과 채무지급보증<br/>
                    계약을 체결하여 안전한 거래를<br/>
                    보장하고 있습니다.<br/>
                </div>
            </div>
        </footer>
    );
}
export default Footer;