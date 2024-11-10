import React, {useState, useEffect} from 'react';
import './farmer_job.css';
import {Link} from 'react-router-dom';

function FarmerJob() {
    const[selectedCity,setSelectedCity]=useState('');
    const[districts, setDistricts]=useState([]);
    const [jobs,setJobs]=useState([]); //job 상태 추가

    const allDistricts={
        'seoul':['강남구','강동구','강북구','강서구','구로구','동작구','마포구','양천구','영등포구','용산구','종로구'],
        'gyeonggi':['가평군','고양시','과천시','광명시','광주시','구리시','군포시','김포시','남양주시','동두천시','부천시','하남시'],
        'incheon':['강화군','계양구','남동구','동구','미추홀구','부평구','서구','연수구','옹진군','중구'],
        'busan':['강서구','금정구','기장군','남구','동구','동래구','부산진구','북구','사상구','사하구'],
        'daegu':['근위군','남구','달서구','달성군','동구','북구','서구','수성구','중구'],
        'ulsan':['남구','동구','북구','울주군','중구'],
        'sejong':['세종특별자치시'],
        'gangwon':['강릉시','고성군','동해시','삼척시','속초시','양구군','양양군','영월군','원주시','인제군','태백시'],
        'gyeongnam':['거제시','거창군','고성군','김해시','남해군','밀양시','사천시','산청군','양산시','의령군','진주시'],
        'gyeonbuk':['경산시','경주시','고령군','구미시','근위군','김천시','문경시','봉화군','상주시','성주군','안동시'],
        'jeonbuk':['고창군','군산시','김제시','남원시','무주군','부안군','순창군','완주군','익산시','임실군','장수군','전주시'],
        'jeonnam':['강진군','고흥군','곡성군','광양시','구례군','나주시','담양군','목포시','무안군','보성군','순천시','신안군'],
        'chungnam':['계룡시','공주시','금산군','논산시','당진시','보령시','부여군','서산시','서천군','아산시','연기군','예산군','천안시','태안군','홍성군'],
        'chungbuk':['괴산군','단양군','보은군','영동군','옥천군','음성군','제천시','증평군','진천군','청원군','청주시','충주시'],
        'jeju':['서귀포시','제주시']

    };

    //데이터베이스에서 일자리 정보를 가져오는 함수
    const fetchJobs=async ()=>{
        try{
            const res=await fetch('api/job/all')//모든 일자리 백엔드 API 호출
            if(!res.ok){
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            setJobs(data); //일자리 데이터 상태에 저장
        }catch(error){
            console.error('Error fetching jobs:',error);
        }
    };

    useEffect(() => {
        fetchJobs(); // 컴포넌트 마운트 시 일자리 정보 가져옴
    }, []); // 빈 배열을 두 번째 인자로 전달하여 최초 마운트 시에만 호출

    useEffect(()=>{
        if(selectedCity){
            setDistricts(allDistricts[selectedCity]||[]);
        }else{
            setDistricts([]);
        }
    },[selectedCity]);

    return (
        <div id={'body'}>
            <div id={'farmer_job_page'} className={'page'}>
                <div id={'contents'}>
                    <div id="farmergic_menu">
                        <div id="farmergic_menu_text">
                            쉽고 빠르게 일손 구하기
                        </div>
                        <div id="farmergic_menu_button">
                            <select className={'farmergic_menu_button_1'}
                                    value={selectedCity} // selected 대신 value를 사용하여 선택된 값을 제어
                                    onChange={(e) => setSelectedCity(e.target.value)}>
                                <option value={''}>시</option>
                                {/* selected 속성 제거 */}
                                <option value={'seoul'}>서울</option>
                                <option value={'gyeonggi'}>경기</option>
                                <option value={'incheon'}>인천</option>
                                <option value={'busan'}>부산</option>
                                <option value={'daegu'}>대구</option>
                                <option value={'ulsan'}>울산</option>
                                <option value={'sejong'}>세종</option>
                                <option value={'gangwon'}>강원</option>
                                <option value={'gyeongnam'}>경남</option>
                                <option value={'gyeonbuk'}>경북</option>
                                <option value={'jeonbuk'}>전북</option>
                                <option value={'jeonnam'}>전남</option>
                                <option value={'chungnam'}>충남</option>
                                <option value={'chungbuk'}>충북</option>
                                <option value={'jeju'}>제주</option>
                            </select>

                            <select className="farmergic_menu_button_2">
                                <option>구</option>
                                {districts.map((district, index) => (
                                    <option key={index} value={district}>
                                        {district}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="farmergic_main_container">
                        <div className="farmergic_main">
                            {jobs.map((job) => (
                                <div key={job.jobId}>
                                    <Link to={`/farmer_job_info/${job.jobId}`} key={job.jobId}>
                                        <div className="farmergic_main_item">
                                            <div className="farmergic_main_item01">
                                                <div className="farmergic_main_item_title">{job.jobTitle}</div>
                                                <div className="farmergic_main_item_info">
                                                    <div className="farmergic_main_item_date_img">
                                                        <img src="/img/clock.jpg" style={{width: '20px'}}/>
                                                        <div className="farmergic_main_item_date">
                                                            {job.jobDateStart} ~ {job.jobDateEnd}
                                                        </div>
                                                    </div>
                                                    <div className="farmergic_main_item_pay_img">
                                                        <img src="/img/pay.jpg" style={{width: '20px'}}/>
                                                        <div className="farmergic_main_item_pay">{job.jobSalary}</div>
                                                    </div>
                                                    <div className="farmergic_main_item_location_img">
                                                        <img src="/img/location.jpg" style={{width: '20px'}}/>
                                                        <div
                                                            className="farmergic_main_item_location">{job.jobLocation}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="farmergic_main_item02">
                                                <div className="farmergic_main_item_image">
                                                    <img src={`http://localhost:8080${job.jobPhoto}`} alt="Job Image"
                                                         style={{width: '230px', height: '160px'}}/>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default FarmerJob;
