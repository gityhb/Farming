import "./common/root.css";
import "./farmer_product_apply.css";

function Farmer_product_apply() {
    return(
        <div id={'body'}>
            <div id={'farmer_product_apply_page'} className={'page'}>
                <div id={'contents'}>
                    <div id={'product_apply_title'}>
                        <h1>상품 등록 신청</h1>
                    </div>
                    <div id={'product_apply_img'}>
                        <div className={'product_apply_img_box'}>

                        </div>
                        <div className={'product_apply_img_btn'}>사진첨부</div>
                    </div>
                    <form>
                        <div className={'farmer_product_apply_form_group'}>
                            <div className={'pform_group'}>
                                <div className={'pform_title'}>
                                    상품명
                                </div>
                                <input
                                    type="text"
                                    placeholder="20자 이내로 입력해주세요"
                                />
                            </div>
                            <div className={'pform_group'}>
                                <div className={'pform_title'}>
                                    판매자
                                </div>
                                <input
                                    className={'pform_seller'}
                                    type="text"
                                    placeholder="판매자 이름 쓸 예정"
                                    readOnly
                                />
                            </div>
                            <div className={'pform_group'}>
                                <div className={'pform_title'}>
                                    가격
                                </div>
                                <input
                                    type="number"
                                    placeholder="0"
                                />
                                <select>
                                    <option value={'g'} selected>g</option>
                                    <option value={'kg'}>kg</option>
                                    <option value={'개'}>개</option>
                                    <option value={'팩'}>팩</option>
                                    <option value={'박스'}>박스</option>
                                </select>
                                <input
                                    type="number"
                                    placeholder="0"
                                />
                                <span> 원</span>
                            </div>
                            <div className={'pform_group'}>
                                <div className={'pform_title'}>
                                원산지
                                </div>
                                <input
                                    type="text"
                                    placeholder="지역명을 입력해주세요"
                                />
                            </div>
                            <div className={'pform_group'}>
                                <div className={'pform_title'}>
                                    배송날짜
                                </div>
                                주문 후
                                <select>
                                    <option value={'now'} selected>당일</option>
                                    <option value={'next'}>내일</option>
                                    <option value={'always'}>상시배송</option>
                                </select>
                                <span className={'warning_red'}>※ 상시배송 선택시 예상날짜를 상품정보란에 기입해야 합니다.</span>
                            </div>
                            <div className={'pform_group'}>
                                <div className={'pform_title'}>
                                    상품정보
                                </div>
                                <textarea className={'pfrom_product_info'} placeholder={'자세한 상품소개, 예상 배송날짜, 판매자 소개는 판매에 큰 도움이 됩니다 :)'}/>
                            </div>
                            <div className={'warning_gray'}>
                                ※승인 결과는 신청 후 영업일 4~6일 이내 문자로 발송됩니다.<br/><br/>

                                ※허위 상품 및 법적 문제 있는 상품 등록시 강제 탈퇴될 수 있습니다.<br/><br/>

                                ※문의전화 1588-1234
                            </div>
                            <div className={'pform_btn'}>
                                <button type={'submit'}>신청하기</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Farmer_product_apply;