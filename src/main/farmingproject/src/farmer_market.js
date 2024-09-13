import {useState, useEffect} from "react";
import {Link, Route} from 'react-router-dom';
import './common/root.css';
import './farmer_market.css';

function Farmer_market() {

    const [mitems, setmItems] = useState([
        {
            mid:1,
            mname:"수박데스",
            mpercent:"35%",
            mprice:3000,
            mImg: "img/watermelon.png"
        },
        {
            mid:2,
            mname:"오이지 오이 10kg",
            mpercent:"25%",
            mprice:2000,
            mImg: "img/cucumber.png"
        },
        {
            mid:3,
            mname:"딸기",
            mpercent:"40%",
            mprice:1000,
            mImg: "img/snow_white_strawberry.png"
        },
        {
            mid:4,
            mname:"감딸기",
            mpercent:"10%",
            mprice:1200,
            mImg: "img/snow_white_strawberry.png"
        },
        {
            mid:5,
            mname:"스트로베리",
            mpercent:"23%",
            mprice:3200,
            mImg: "img/snow_white_strawberry.png"
        }
    ]);

    return (
        <div id={'body'}>
            <div id={'farmer_market_page'} className={'page'}>
                <div id={'contents'}>
                    <div id={'search_box'}>
                        <input type={'text'} id={'search_query'} placeholder={'검색 내용을 입력하세요'}/>
                        <button id={'search_btn'}><img src="img/etc/search.png" alt={"search_btn"}/> </button>
                    </div>
                    <div id={'align_box'}>
                        <div id={'category_box'}>
                            <ul>
                                <li>일반마켓</li>
                            </ul>
                        </div>
                        <div id={'page_location'}>
                            <ul>
                                <li>판매순</li>
                                <li>|</li>
                                <li>인기순</li>
                                <li>|</li>
                                <li>낮은 가격순</li>
                            </ul>
                        </div>
                    </div>
                    <div id='product_list'>
                        {/* useState로 관리되는 상품 목록을 맵핑하여 렌더링 */}
                        <ul className='pd_list'>
                            {mitems.map((item) => (
                                <li key={item.mid}>
                                    <div className='pd_info'>
                                        <Link to="/farmer_market_info">
                                            <img src={item.mImg} style={{width: '190px', height: '190px'}}
                                                 alt={item.mname}/>
                                            <p className='pd_name'>
                                                {item.mname}
                                            </p>
                                        </Link>
                                        <p className='pd_price'>
                                            <span className='pr_per'>{item.mpercent} </span>
                                            <span className='pr_num'>{item.mprice.toLocaleString()}</span>원
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div id={'page_list'}>
                        <span className={'page_num'}><a>1</a></span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Farmer_market;