import "./common/root.css";
import "./join.css";
import {Link} from "react-router-dom";

function Join () {
    return(
        <div id={'body'}>
            <div id={'join_page'} className={'page'}>
                <div id={'contents'}>
                    <div id={'join_area'}>
                        <h1 id={'join_title'}>
                            Farming에 오신 것을 환영합니다
                        </h1>
                        <div id={'join_box'}>
                            <div className={'join_box_title'}>
                                회원가입
                            </div>
                            <div className={'join_box_more'}>
                                <div className={'join_consumer'}>
                                    <div className={'join_txt'}>
                                        <div className={'join_mem_main'}>
                                            소비자
                                        </div>
                                        <div className={'join_mem_sub'}>
                                            만 14세 이상 가능
                                        </div>
                                    </div>
                                    <Link to={'/join_consumer'}>
                                        <div className={'join_btn'}>
                                            회원가입
                                        </div>
                                    </Link>
                                </div>
                                <hr/>
                                <div className={'join_seller'}>
                                    <div className={'join_txt'}>
                                        <div className={'join_mem_main'}>
                                            판매자
                                        </div>
                                        <div className={'join_mem_sub'}>
                                            사업자등록증을 보유한 회원
                                        </div>
                                    </div>
                                    <Link to={'/join_seller'}>
                                        <div className={'join_btn'}>
                                            회원가입
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Join;