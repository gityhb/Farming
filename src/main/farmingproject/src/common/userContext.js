import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Context 생성
const UserContext = createContext(null);

// Context Provider 컴포넌트
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // 로그인된 사용자 정보를 API에서 가져옴
        axios.get('http://localhost:8080/api/user', { withCredentials: true })
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    setUser(null);
                } else {
                    console.error("There was an error fetching the user data!", error);
                }
            });
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Context를 쉽게 사용하기 위한 커스텀 훅
export const useUser = () => useContext(UserContext);