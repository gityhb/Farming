import React, { useState } from "react";
import './farmer_job_apply.css';
import './farmer_market_review_modal.css';

function FarmerReviewModal({isReviewOpen, closeReviewModal, onSubmit}) {
    const [taste, setTaste] = useState('');
    const [freshness, setFreshness] = useState('');
    const [packaging, setPackaging] = useState('');
    const [detailReview, setDetailReview] = useState('');
    const [rating, setRating] = useState(0); // 별점 추가

    if(!isReviewOpen) return null;

    const handleSelection = (category, value) => {
        switch(category) {
            case 'taste':
                setTaste(value);
                break;
            case 'freshness':
                setFreshness(value);
                break;
            case 'packaging':
                setPackaging(value);
                break;
            default:
                break;
        }
    }

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    }

    /*const handleSubmit = (e) => {
        e.preventDefault();
        const reviewData = {
            taste,
            freshness,
            packaging,
            comment: detailReview,
            rating
        };
        onSubmit(reviewData);
        closeReviewModal();
    };*/

    const handleSubmit = async (e) => {
        e.preventDefault();
        const reviewData = {
            name: "현재 로그인한 사용자", // 실제 사용자 이름으로 대체해야 함
            star: rating,
            taste: taste,
            fresh: freshness,
            package: packaging,
            reviewdetail: detailReview
        };

        try {
            const response = await fetch('/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reviewData)
            });

            if (response.ok) {
                onSubmit(reviewData);
                closeReviewModal();
            } else {
                console.error('리뷰 제출 실패');
            }
        } catch (error) {
            console.error('리뷰 제출 중 오류 발생:', error);
        }
    };


    return (
        <div className="apply_modal">
            <div className={"apply_modal_content"}>
                <div className="apply_header">
                    리뷰 작성하기
                    <span className="close" onClick={closeReviewModal}>&times;</span>
                </div>
                <div className="apply_main">
                    <div className="review_select_div">
                        <span className="review_select_title">별점</span>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                className={`star ${rating >= star ? 'selected' : ''}`}
                                onClick={() => handleRatingChange(star)}
                            >
                                ★
                            </span>
                        ))}
                    </div>

                    <div className={"review_select_div"}>
                        <span className={"review_select_title"}>맛</span>
                        <div className={`review_select_Btn ${taste === '맛있어요' ? 'selected' : ''}`}
                             onClick={() => handleSelection('taste', '맛있어요')}>맛있어요
                        </div>
                        <div className={`review_select_Btn ${taste === '괜찮아요' ? 'selected' : ''}`}
                             onClick={() => handleSelection('taste', '괜찮아요')}>괜찮아요
                        </div>
                        <div className={`review_select_Btn ${taste === '별로예요' ? 'selected' : ''}`}
                             onClick={() => handleSelection('taste', '별로예요')}>별로예요
                        </div>
                    </div>

                    <div className={"review_select_div"}>
                        <span className={"review_select_title"}>신선도</span>
                        <div className={`review_select_Btn ${freshness === '신선해요' ? 'selected' : ''}`}
                             onClick={() => handleSelection('freshness', '신선해요')}>신선해요
                        </div>
                        <div className={`review_select_Btn ${freshness === '괜찮아요' ? 'selected' : ''}`}
                             onClick={() => handleSelection('freshness', '괜찮아요')}>괜찮아요
                        </div>
                        <div className={`review_select_Btn ${freshness === '별로예요' ? 'selected' : ''}`}
                             onClick={() => handleSelection('freshness', '별로예요')}>별로예요
                        </div>
                    </div>

                    <div className={"review_select_div"}>
                        <span className={"review_select_title"}>포장</span>
                        <div className={`review_select_Btn ${packaging === '꼼꼼해요' ? 'selected' : ''}`}
                             onClick={() => handleSelection('packaging', '꼼꼼해요')}>꼼꼼해요
                        </div>
                        <div className={`review_select_Btn ${packaging === '아쉬워요' ? 'selected' : ''}`}
                             onClick={() => handleSelection('packaging', '아쉬워요')}>아쉬워요
                        </div>
                    </div>

                    <textarea
                        className="review-textarea"
                        placeholder="상세 리뷰를 작성해주세요"
                        rows={15}
                        cols={50}
                        value={detailReview}
                        onChange={(e) => setDetailReview(e.target.value)}
                    />
                </div>
                <button className="apply_button" onClick={handleSubmit}>
                    등록
                </button>
            </div>
        </div>
    );
}

export default FarmerReviewModal;