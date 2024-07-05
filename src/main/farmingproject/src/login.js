import {useState} from "react";
import {useNavigate} from "react-router-dom";
import "./common/root.css";
import "./login.css";

function Login() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/join_seller');
    };

    const [activeTab, setActiveTab] = useState("consumer");
    const [userid, setUserid] = useState("");
    const [userpwd, setUserpwd] = useState("");
    const [sellerId, setSellerId] = useState("");
    const [sellerPwd, setSellerPwd] = useState("");
    const [consumerCheckbox1, setConsumerCheckbox1] = useState(false);
    const [consumerCheckbox2, setConsumerCheckbox2] = useState(false);
    const [sellerCheckbox1, setSellerCheckbox1] = useState(false);
    const [sellerCheckbox2, setSellerCheckbox2] = useState(false);

    const handleLogin = (event) => {
        event.preventDefault();

        if (activeTab === "consumer") {
            if (!userid) {
                alert("아이디를 입력해주세요");
                return;
            }
            if (!userpwd) {
                alert("비밀번호를 입력해주세요");
                return;
            }
        } else if (activeTab === "seller") {
            if (!sellerId) {
                alert("아이디를 입력해주세요");
                return;
            }
            if (!sellerPwd) {
                alert("비밀번호를 입력해주세요");
                return;
            }
        }
        //로그인 후 폼 리셋
        setUserid("");
        setUserpwd("");
        setSellerId("");
        setSellerPwd("");
        setConsumerCheckbox1(false);
        setConsumerCheckbox2(false);
        setSellerCheckbox1(false);
        setSellerCheckbox2(false);
    };

    return (
        <div id={'body'}>
            <div id={'login_page'} className={'page'}>
                <div id={'contents'}>
                    <div id={'login_title'}>
                        <h1>로그인</h1>
                    </div>
                    <div className="user_tab">
                        <button
                            className={activeTab === "consumer" ? "active" : ""}
                            onClick={() => setActiveTab("consumer")}
                        >소비자
                        </button>
                        <button
                            className={activeTab === "seller" ? "active" : ""}
                            onClick={() => setActiveTab("seller")}
                        >판매자
                        </button>
                    </div>
                    <div id={'login_form'}>
                    {activeTab === "consumer" ? (
                        <form onSubmit={handleLogin}>
                            <div className="input_group">
                                <label>아이디</label>
                                <input
                                    type="text"
                                    name="userid"
                                    placeholder="아이디를 입력하세요"
                                    value={userid}
                                    onChange={(e) => setUserid(e.target.value)}
                                />
                            </div>
                            <div className="input_group">
                                <label>비밀번호</label>
                                <input
                                    type="password"
                                    name="userpwd"
                                    placeholder="비밀번호를 입력하세요"
                                    value={userpwd}
                                    onChange={(e) => setUserpwd(e.target.value)}
                                />
                            </div>
                            <div className="checkbox_group">
                                <label><input type="checkbox" name="consumer_chk01" checked={consumerCheckbox1}
                                              onChange={() => setConsumerCheckbox1(!consumerCheckbox1)}/> 아이디
                                    저장</label>
                                <label><input type="checkbox" name="consumer_chk02" checked={consumerCheckbox2}
                                              onChange={() => setConsumerCheckbox2(!consumerCheckbox2)}/> 자동
                                    로그인</label>
                            </div>
                            <button className="login_btn" type="submit">로그인</button>
                        </form>
                    ) : (
                        <form onSubmit={handleLogin}>
                            <div className="input_group">
                                <label htmlFor="sellerId">아이디</label>
                                <input
                                    type="text"
                                    name="sellerId"
                                    placeholder="아이디를 입력하세요"
                                    value={sellerId}
                                    onChange={(e) => setSellerId(e.target.value)}
                                />
                            </div>
                            <div className="input_group">
                                <label htmlFor="sellerPwd">비밀번호</label>
                                <input
                                    type="password"
                                    name="sellerPwd"
                                    placeholder="비밀번호를 입력하세요"
                                    value={sellerPwd}
                                    onChange={(e) => setSellerPwd(e.target.value)}
                                />
                            </div>
                            <div className="checkbox_group">
                                <label><input type="checkbox" name="seller_chk01" checked={sellerCheckbox1}
                                              onChange={() => setSellerCheckbox1(!sellerCheckbox1)}/> 아이디 저장</label>
                                <label><input type="checkbox" name="seller_chk02" checked={sellerCheckbox2}
                                              onChange={() => setSellerCheckbox2(!sellerCheckbox2)}/> 자동 로그인</label>
                            </div>
                            <button className="login_btn" type="submit">로그인</button>

                        </form>
                    )}
                    </div>
                    <div id="login_links" onClick={handleClick}>
                        <a href="#">회원가입</a>
                        <span className="separator">|</span>
                        <a href="#">아이디 찾기</a>
                        <span className="separator">|</span>
                        <a href="#">비밀번호 찾기</a>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Login;
