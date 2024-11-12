import React, {useState, useEffect} from 'react';
import './farmer_job.css';
import {Link} from 'react-router-dom';

function FarmerJob() {
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState(''); // 구 선택 상태 추가
    const [districts, setDistricts] = useState([]);
    const [jobs, setJobs] = useState([]); // 전체 일자리 데이터를 저장
    const [filteredJobs, setFilteredJobs] = useState([]); // 필터링된 일자리 데이터를 저장

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
    const fetchJobs = async () => {
        try {
            const res = await fetch('api/job/all');
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            setJobs(data); // 전체 일자리 데이터를 저장
            setFilteredJobs(data); // 초기 필터링 데이터 설정
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    };

    useEffect(() => {
        fetchJobs(); // 컴포넌트 마운트 시 일자리 정보 가져옴
    }, []); // 빈 배열을 두 번째 인자로 전달하여 최초 마운트 시에만 호출

    useEffect(() => {
        if (selectedCity) {
            setDistricts(allDistricts[selectedCity] || []);
            setSelectedDistrict(''); // 도시가 바뀔 때 구 초기화
        } else {
            setDistricts([]);
        }
    }, [selectedCity]);

    useEffect(() => {
        // 선택된 시와 구에 따라 필터링 로직 적용
        let filtered = jobs;

        // 도시를 한글로 변환하는 맵핑 객체 생성
        const cityMapping = {
            'seoul': '서울',
            'gyeonggi': '경기',
            'incheon': '인천',
            'busan': '부산',
            'daegu': '대구',
            'ulsan': '울산',
            'sejong': '세종',
            'gangwon': '강원',
            'gyeongnam': '경남',
            'gyeonbuk': '경북',
            'jeonbuk': '전북',
            'jeonnam': '전남',
            'chungnam': '충남',
            'chungbuk': '충북',
            'jeju': '제주'
        };

        const koreanCity = cityMapping[selectedCity] || selectedCity; // 선택된 도시의 한글 변환

        if (selectedCity) {
            filtered = filtered.filter(job => job.jobLocation.includes(koreanCity));
        }
        if (selectedDistrict) {
            filtered = filtered.filter(job => job.jobLocation.includes(selectedDistrict));
        }

        setFilteredJobs(filtered);
    }, [selectedCity, selectedDistrict, jobs]);



    return (
        <div id={'body'}>
            <div id={'farmer_job_page'} className={'page'}>
                <div id={'contents'}>
                    <div id="farmergic_menu">
                        <div id="farmergic_menu_text">쉽고 빠르게 일손 구하기</div>
                        <div id="farmergic_menu_button">
                            <select className={'farmergic_menu_button_1'}
                                    value={selectedCity}
                                    onChange={(e) => setSelectedCity(e.target.value)}>
                                <option value={''}>시</option>
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

                            <select className="farmergic_menu_button_2"
                                    value={selectedDistrict}
                                    onChange={(e) => setSelectedDistrict(e.target.value)}>
                                <option value={''}>구</option>
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
                            {filteredJobs.map((job) => (
                                <div key={job.jobId}>
                                    <Link to={`/farmer_job_info/${job.jobId}`}>
                                        <div className="farmergic_main_item">
                                            <div className="farmergic_main_item01">
                                                <div className="farmergic_main_item_title">{job.jobTitle}</div>
                                                <div className="farmergic_main_item_info">
                                                    <div className="farmergic_main_item_date_img">
                                                        <img src="/img/clock.jpg" style={{ width: '20px' }} />
                                                        <div className="farmergic_main_item_date">
                                                            {job.jobDateStart} ~ {job.jobDateEnd}
                                                        </div>
                                                    </div>
                                                    <div className="farmergic_main_item_pay_img">
                                                        <img src="/img/pay.jpg" style={{ width: '20px' }} />
                                                        <div className="farmergic_main_item_pay">{job.jobSalary}</div>
                                                    </div>
                                                    <div className="farmergic_main_item_location_img">
                                                        <img src="/img/location.jpg" style={{ width: '20px' }} />
                                                        <div className="farmergic_main_item_location">{job.jobLocation}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="farmergic_main_item02">
                                                <div className="farmergic_main_item_image">
                                                    <img src={`http://localhost:8080${job.jobPhoto}`} alt="Job Image" style={{ width: '230px', height: '160px' }} />
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
