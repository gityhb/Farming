import React, { useState } from 'react';
import './farmer_job_seller.css';
import './common/root.css';
import JobModal from './component/job_modal';

function FarmerJobSeller(){
    const [jobPosts, setJobPosts] = useState([
        { no: 1, title: '포도 수확 알바', date: '2024-08-15 ~ 2024-09-15', salary: '80,000원', postedDate: '2024-08-10' },
        { no: 2, title: '사과 농장 수확 도우미', date: '2024-10-01 ~ 2024-11-01', salary: '70,000원', postedDate: '2024-09-01' },
        { no: 3, title: '배추 심기 작업', date: '2024-09-10 ~ 2024-09-20', salary: '60,000원', postedDate: '2024-09-05' },
    ]);

    const [isJobModalOpen, setIsJobModalOpen] = useState(false);

    const handleAddJob = () => {
        setIsJobModalOpen(true); // Open job modal
    };

    const closeJobModal = () => {
        setIsJobModalOpen(false); // Close job modal
    };


    return(
        <div id={'body'}>
            <div id={'farmer_job_seller_page'} className={'page'}>
                <div id={'contents'}>
                    <div className={'farmer_job_seller_title'}>
                        파머직
                    </div>
                    <button className="add_job_button" onClick={handleAddJob}>새 공고 추가</button>
                    <JobModal isOpen={isJobModalOpen} closeJobModal={closeJobModal} />
                    <table className="job_table">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>공고 제목</th>
                            <th>근무 날짜</th>
                            <th>급여</th>
                            <th>등록일</th>
                        </tr>
                        </thead>
                        <tbody>
                        {jobPosts.map((post) => (
                            <tr key={post.no}>
                                <td>{post.no}</td>
                                <td>{post.title}</td>
                                <td>{post.date}</td>
                                <td>{post.salary}</td>
                                <td>{post.postedDate}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>

    );
}

export default FarmerJobSeller;