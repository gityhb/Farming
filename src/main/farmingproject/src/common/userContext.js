import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Context 생성
const UserContext = createContext(null);

// Context Provider 컴포넌트
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // 사용자 정보를 가져오는 함수
    const fetchUser = async () => {
        try {
            const response = await fetch('/api/user', {
                method: 'GET',
                credentials: 'include', // `withCredentials: true` 대신 사용
            });

            // HTTP 상태 코드 확인
            if (!response.ok) {
                if (response.status === 401) {
                    setUser(null);
                } else {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            } else {
                const data = await response.json(); // 응답을 JSON으로 변환
                setUser(data);
            }
        } catch (error) {
            console.error("There was an error fetching the user data!", error);
        }
    };

    useEffect(() => {
        // 페이지 로드 시 사용자 정보 가져오기
        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Context를 쉽게 사용하기 위한 커스텀 훅
export const useUser = () => useContext(UserContext);