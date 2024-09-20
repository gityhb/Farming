import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Context 생성
const UserContext = createContext(null);

// Context Provider 컴포넌트
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(true); // 로그인 상태를 추적하는 플래그

    useEffect(() => {
        // 로그인이 되어 있지 않으면 API 호출을 하지 않음
        if (!isLoggedIn) return;

        // 로그인된 사용자 정보를 API에서 가져옴
        axios.get('http://localhost:8080/api/user', { withCredentials: true })
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    setUser(null);
                    setIsLoggedIn(false); // 401 에러가 발생하면 로그아웃 상태로 전환
                } else {
                    console.error("There was an error fetching the user data!", error);
                }
            });
    }, [isLoggedIn]); // isLoggedIn 상태가 변경될 때만 실행

    return (
        <UserContext.Provider value={{ user, setUser, setIsLoggedIn }}>
            {children}
        </UserContext.Provider>
    );
};

// Context를 쉽게 사용하기 위한 커스텀 훅
export const useUser = () => useContext(UserContext);
