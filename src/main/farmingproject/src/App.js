import {useEffect, useState} from "react";
import axios from "axios";
import Farmer_market_info from "./farmer_market_info";
import {Route, Routes} from 'react-router-dom';

function App() {
  // const [hello, setHello] = useState('');
  //
  // useEffect(() => {
  //   axios.get('/api/test')
  //       .then((res) => {
  //         setHello(res.data);
  //       })
  // }, []);
  // return (
  //     <div className="App">
  //       백엔드 데이터 : {hello}
  //     </div>
  // );


    return (
        <div>
            <Routes>
                <Route path={'/farmer_market_info'} element={<Farmer_market_info/>} />
            </Routes>
        </div>
    );
}

export default App;