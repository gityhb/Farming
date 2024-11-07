import {useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import "./common/root.css";
import "./login.css";
import axios from "axios";

function Login() {
    const location = useLocation();

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

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        if (queryParams.get('error') === 'true') {
            setErrorMessage('로그인에 실패했습니다. 다시 시도해주세요.');
        }
    }, [location]);

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


// import {useNavigate} from "react-router-dom";
//
// function Login() {
//     const navigate = useNavigate();
//
//     const handleClick = () => {
//         navigate('/signup');
//     };
//
//     return (
//         <div>
//             <div className="container-fluid row justify-content-center align-content-center">
//                 <div className="card bg-dark" style={{borderRadius: 1 + 'rem'}}>
//                     <div className="card-body p-5 text-center">
//                         <h2 className="text-white">LOGIN</h2>
//                         <p className="text-white-50 mt-2 mb-5">서비스를 사용하려면 로그인을 해주세요!</p>
//
//                         <div className="mb-2">
//                             <form action="/login" method="POST">
//                                 <input type="hidden" name="${_csrf?.parameterName}" value="${_csrf?.token}"/>
//                                 <div className="mb-3">
//                                     <label className="form-label text-white">Email address</label>
//                                     <input type="email" className="form-control" name="username"/>
//                                 </div>
//                                 <div className="mb-3">
//                                     <label className="form-label text-white">Password</label>
//                                     <input type="password" className="form-control" name="password"/>
//                                 </div>
//                                 <button type="submit" className="btn btn-primary">Submit</button>
//                             </form>
//
//                             <button type="button" className="btn btn-secondary mt-3"
//                                     onClick={handleClick}>회원가입
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
//
// export default Login;