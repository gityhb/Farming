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
                                    type="text"
                                    placeholder="20자 이내로 입력해주세요"
                                />
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
                                <span>※ 상시배송 선택시 예상날짜를 상품정보란에 기입해야 합니다</span>
                            </div>
                            <div className={'pform_group'}>
                                <div className={'pform_title'}>
                                    원산지
                                </div>
                                <textarea />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Farmer_product_apply;