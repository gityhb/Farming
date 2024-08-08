import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import "./common/root.css";
import "./login.css";
import axios from "axios";

function Login() {
    const navigate = useNavigate();

    // const [activeTab, setActiveTab] = useState("consumer");
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    // const [sellerId, setSellerId] = useState("");
    // const [sellerPwd, setSellerPwd] = useState("");
    // const [consumerCheckbox1, setConsumerCheckbox1] = useState(false);
    // const [consumerCheckbox2, setConsumerCheckbox2] = useState(false);
    // const [sellerCheckbox1, setSellerCheckbox1] = useState(false);
    // const [sellerCheckbox2, setSellerCheckbox2] = useState(false);

    // const handleLogin = async (event) => {
    //     event.preventDefault();
    //
    //     // 입력 필드 검증
    //     if(!userId || !password) {
    //         setErrorMessage("아이디 혹은 비밀번호를 입력해주세요");
    //         return;
    //     }
    //     try {
    //         // 서버에 로그인 요청
    //         const response = await axios.post('/api/login', {
    //             userId: userId,
    //             password: password
    //         }, { withCredentials: true });
    //
    //         // 로그인 성공 시 메인 페이지로 이동
    //         if (response.status === 200) {
    //             setErrorMessage("");
    //             navigate("/");
    //         }
    //     } catch (error) {
    //         // 로그인 실패 시 에러 메시지 표시
    //         setErrorMessage("아이디 또는 비밀번호가 잘못되었습니다.");
    //     }
    // };

    return (
        <div id={'body'}>
            <div id={'login_page'} className={'page'}>
                <div id={'contents'}>
                    <div id={'login_title'}>
                        <h1>로그인</h1>
                    </div>
                    {/*<div className="user_tab">*/}
                    {/*    <button*/}
                    {/*        className={activeTab === "consumer" ? "active" : ""}*/}
                    {/*        onClick={() => setActiveTab("consumer")}*/}
                    {/*    >소비자*/}
                    {/*    </button>*/}
                    {/*    <button*/}
                    {/*        className={activeTab === "seller" ? "active" : ""}*/}
                    {/*        onClick={() => setActiveTab("seller")}*/}
                    {/*    >판매자*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                    <div id={'login_form'}>
                        <form action="/login" method="POST">
                            <div className="input_group">
                                <label>아이디</label>
                                <input
                                    type="text"
                                    name="username"
                                    // value={userId}
                                    // onChange={(e) => setUserId(e.target.value)}
                                    placeholder="아이디를 입력하세요"
                                />
                            </div>
                            <div className="input_group">
                                <label>비밀번호</label>
                                <input
                                    type="password"
                                    name="password"
                                    // value={password}
                                    // onChange={(e) => setPassword(e.target.value)}
                                    placeholder="비밀번호를 입력하세요"
                                />
                            </div>
                            {/*<div className="checkbox_group">*/}
                            {/*    <label><input type="checkbox" name="consumer_chk01" checked={consumerCheckbox1}*/}
                            {/*                  onChange={() => setConsumerCheckbox1(!consumerCheckbox1)}/> 아이디*/}
                            {/*        저장</label>*/}
                            {/*    <label><input type="checkbox" name="consumer_chk02" checked={consumerCheckbox2}*/}
                            {/*                  onChange={() => setConsumerCheckbox2(!consumerCheckbox2)}/> 자동*/}
                            {/*        로그인</label>*/}
                            {/*</div>*/}
                            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                            <button className="login_btn" type="submit">로그인</button>
                        </form>
                    </div>
                    <div id="login_links">
                        <Link to={'/join'}>회원가입</Link>
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
