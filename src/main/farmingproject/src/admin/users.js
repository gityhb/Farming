import {useState, useEffect} from "react";
import  './product_apply_check.css';
import '../common/root.css';
import './users.css';
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";

function Users() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const [pageGroup, setPageGroup] = useState(1); // 페이지 그룹
    const itemsPerPage = 10; // 한 페이지에 보여줄 아이템 수
    const pagesPerGroup = 10; // 한 그룹당 보여줄 페이지 수

    const [pStatus, setPStatus] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/user/all');
            setUsers(response.data.reverse());

        } catch (error) {
            if(error.response) {
                setUsers(null);
            } else {
                console.log("There was an error fetching the products!", error);
            }
        }
    };

    useEffect(() => {
        // 페이지 로드 시 상품 정보 가져오기
        fetchUsers();
    }, []);

    // Handle navigation to the product details page
    const handleProductClick = (id) => {
        navigate(`/admin/user/${id}`); // Navigate to the product detail page
    };

    // 페이지 변경 시 호출되는 함수
    const handlePageChange = (pageNum) => {
        setCurrentPage(pageNum);
    };

    // 페이지 그룹 이동 함수 (<<, >> 버튼 클릭 시)
    const handleGroupChange = (direction) => {
        if (direction === 'next') {
            setPageGroup(pageGroup + 1);
            setCurrentPage((pageGroup + 1) * pagesPerGroup - (pagesPerGroup - 1));
        } else if (direction === 'prev') {
            setPageGroup(pageGroup - 1);
            setCurrentPage((pageGroup - 1) * pagesPerGroup - (pagesPerGroup - 1));
        }
    };

    // 현재 페이지에 보여줄 상품 리스트 추출
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // 총 페이지 수 계산
    const totalPages = Math.ceil(users.length / itemsPerPage);

    // 현재 그룹에 해당하는 페이지 번호들 계산
    const startPage = (pageGroup - 1) * pagesPerGroup + 1;
    const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

    // products가 null이 아닌지 확인
    if (!users || users.length === 0) {
        return (<div id="body">
            <div id={'admin_product_apply_check_page'} className={'page'}>
                <div id={'contents'}>
                    <div className={'admin_product_apply_chk_div'}>
                        <div className={'admin_product_apply_chk_top'}>
                            <div className={'admin_product_apply_chk_num'}>No.</div>
                            <div className={'admin_product_apply_chk_title'}>상품명</div>
                            <div className={'admin_product_apply_chk_seller'}>판매자</div>
                            <div className={'admin_product_apply_chk_status'}>상태</div>
                        </div>
                    </div>

                    <div className={'product_none'}>아직 등록된 상품이 없습니다</div>

                </div>
            </div>
        </div>);
    }

    // 현재 페이지에 해당하는 항목을 가져옴
    const startIndex = (currentPage - 1) * itemsPerPage;
    const selectedUsers = users.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div id="body">
            <div id={'admin_user_page'} className={'page'}>
                <div id={'contents'}>
                    {/*<div className={'admin_product_apply_chk_Btn'}>*/}
                    {/*    <Link to={"/admin/users"}>*/}
                    {/*        <div className={'product_apply_all_btn'} style={{backgroundColor: '#FFEA8D'}}>전체</div>*/}
                    {/*    </Link>*/}
                    {/*    <Link to={"/admin/product_apply_check_ing"}>*/}
                    {/*        <div className={'product_apply_ing_btn'} style={{backgroundColor: '#fff'}}>심사 보류</div>*/}
                    {/*    </Link>*/}
                    {/*    <Link to={"/admin/product_apply_check_pass"}>*/}
                    {/*        <div className={'product_apply_pass_btn'} style={{backgroundColor: '#fff'}}>상품 등록</div>*/}
                    {/*    </Link>*/}
                    {/*    <Link to={"/admin/product_apply_check_fail"}>*/}
                    {/*        <div className={'product_apply_fail_btn'} style={{backgroundColor: '#fff'}}>심사 탈락</div>*/}
                    {/*    </Link>*/}
                    {/*</div>*/}
                    <div className={'admin_user_table'} style={{marginTop:'50px'}}>
                        <table style={{tableLayout: 'fixed'}}>
                            <tr>
                                <th style={{width: '20px', minWidth: '20px', maxWidth: '20px'}}>No.</th>
                                <th style={{width: '130px', minWidth: '130px', maxWidth: '130px'}}>아이디</th>
                                <th style={{width: '20px', minWidth: '20px', maxWidth: '20px'}}>권한</th>
                                <th style={{width: '100px', minWidth: '100px', maxWidth: '100px'}}>이름</th>
                                <th style={{width: '120px', minWidth: '120px', maxWidth: '120px'}}>닉네임</th>
                                <th style={{width: '290px', minWidth: '290px', maxWidth: '290px'}}>주소</th>
                                <th style={{width: '120px', minWidth: '120px', maxWidth: '120px'}}>핸드폰번호</th>
                                <th style={{width: '120px', minWidth: '120px', maxWidth: '120px'}}>가게번호</th>
                                <th style={{width: '200px', minWidth: '200px', maxWidth: '200px'}}>이메일</th>
                                <th style={{width: '120px', minWidth: '120px', maxWidth: '120px'}}>가게이름</th>
                                <th style={{width: '200px', minWidth: '200px', maxWidth: '200px'}}>생성일</th>
                            </tr>
                            {selectedUsers.map((user, index) => (
                                <tr key={user.id} className={''}>
                                    <td className={'admin_user_table_inner'}>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                    <td className={'admin_user_table_inner'}>{user.userId}</td>
                                    <td className={'admin_user_table_inner'}>{user.authority}</td>
                                    <td className={'admin_user_table_inner'}>{user.name}</td>
                                    <td className={'admin_user_table_inner'}>{user.nickname}</td>
                                    <td className={'admin_user_table_inner'}>{user.address}</td>
                                    <td className={'admin_user_table_inner'}>{user.phoneNumber}</td>
                                    <td className={'admin_user_table_inner'}>{user.storePhoneNumber}</td>
                                    <td className={'admin_user_table_inner'}>{user.email}</td>
                                    <td className={'admin_user_table_inner'}>{user.storeName}</td>
                                    <td className={'admin_user_table_inner'}>{new Date(user.createdDate).toISOString().split('T').join(' ').substring(0, 19)}</td>
                                </tr>
                            ))}
                        </table>
                    </div>

                    {/* 페이지네이션 */}
                    <div className={'admin_product_apply_chk_pagenation'}>
                        {/* << 화살표, 페이지 그룹 이동 */}
                        {pageGroup > 1 && (
                            <button className={'admin_product_apply_chk_pagenation_btn'}
                                    onClick={() => handleGroupChange('prev')}><img src={'/img/etc/arrowL.png'}
                                                                                   style={{width: '10px'}}/></button>
                        )}

                        {/* 개별 페이지 번호 */}
                        {[...Array(endPage - startPage + 1)].map((_, idx) => {
                            const pageNum = startPage + idx;
                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => handlePageChange(pageNum)}
                                    className={currentPage === pageNum ? 'admin_product_apply_chk_pagenation_btn_active admin_product_apply_chk_pagenation_btn' : 'admin_product_apply_chk_pagenation_btn'}>
                                    {pageNum}
                                </button>
                            );
                        })}

                        {/* >> 화살표, 페이지 그룹 이동 */}
                        {endPage < totalPages && (
                            <button className={'admin_product_apply_chk_pagenation_btn'}
                                    onClick={() => handleGroupChange('next')}><img src={'/img/etc/arrowR.png'}
                                                                                   style={{width: '10px'}}/></button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Users;