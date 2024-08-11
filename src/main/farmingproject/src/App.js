// import {useEffect, useState} from "react";
// import axios from "axios";
// import Farmer_market_info from "./farmer_market_info";
// import Header from './components/Header';
// import Footer from "./components/Footer";
// import FarmerJob from "./farmer_job";
// import FarmerJobInfo from "./farmer_job_info";
// import FarmerJobApply from "./farmer_job_apply";
// import Main from "./main";
// import Category from './Category';
//
// import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
//
// function App() {
//   // const [hello, setHello] = useState('');
//   //
//   // useEffect(() => {
//   //   axios.get('/api/test')
//   //       .then((res) => {
//   //         setHello(res.data);
//   //       })
//   // }, []);
//   // return (
//   //     <div className="App">
//   //       백엔드 데이터 : {hello}
//   //     </div>
//   // );
//
//
//     // return (
//     //     <div>
//     //         <Routes>
//     //             <Route path={'/farmer_market_info'} element={<Farmer_market_info/>} />
//     //         </Routes>
//     //     </div>
//     // );
//
//     const location = useLocation();
//     const hideHeaderFooter = location.pathname === '/farmer_job_apply';
//
//     return (
//         <div>
//             {!hideHeaderFooter && <Header />}
//             <Routes>
//                 <Route path="/main" element={<Main />} />
//                 <Route path="/category" element={<Category />} />
//                 <Route path="/farmer_job" element={<FarmerJob />} />
//                 <Route path="/farmer_job_info" element={<FarmerJobInfo />} />
//                 <Route path="/farmer_job_apply" element={<FarmerJobApply />} />
//             </Routes>
//             {!hideHeaderFooter && <Footer />}
//         </div>
//     );
//
//
// }
// function AppWrapper() {
//     return (
//         <Router>
//             <App />
//         </Router>
//     );
// }
//
// export default AppWrapper;
//
// // export default App;


import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './common/Header';
import Footer from "./common/Footer";
import FarmerJob from "./farmer_job";
import FarmerJobInfo from "./farmer_job_info";
import FarmerJobApply from "./farmer_job_apply";
import Main from './main';
import Category from './Category';
import Farmer_market from "./farmer_market";
import Farmer_recommend from "./farmer_recommend";
import Login from "./login";
import Shopping_Basket from "./shopping_basket";
import Farmer_market_info from "./farmer_market_info";
import Join_consumer from "./join_consumer";
import Join_seller from "./join_seller";
import MyPage from "./mypage";
import Mypage_seller from "./mypage_seller";
import AuctionDetail from "./auction_detail";
import Auction from "./auction";
import Join from "./join";

function App() {
    const location = useLocation();
    const hideHeaderFooter = location.pathname === '/farmer_job_apply';

    return (
        <div>
            {!hideHeaderFooter && <Header />}
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/category" element={<Category />} />
                <Route path="/farmer_job" element={<FarmerJob />} />
                <Route path="/farmer_recommend" element={<Farmer_recommend />} />
                <Route path="/farmer_market" element={<Farmer_market />} />
                <Route path="/farmer_market_info" element={<Farmer_market_info />} />
                <Route path="/farmer_job_info" element={<FarmerJobInfo />} />
                <Route path="/farmer_job_apply" element={<FarmerJobApply />} />
                <Route path="/login" element={<Login />} />
                <Route path="/join" element={<Join />} />
                <Route path="/join_consumer" element={<Join_consumer />} />
                <Route path="/join_seller" element={<Join_seller />} />
                <Route path="/mypage_seller" element={<Mypage_seller />} />
                <Route path="/shopping_basket" element={<Shopping_Basket />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/auction" element={<Auction/>} />
                <Route path="/auction_detail" element={<AuctionDetail/>} />



            </Routes>
            {!hideHeaderFooter && <Footer />}
        </div>
    );
}

function AppWrapper() {
    return (
        <Router>
            <App />
        </Router>
    );
}

export default AppWrapper;