import React, { useState } from 'react';
import './auction_modal.css';

function AuctionModal({ isOpen, closeAuctionModal, userId }) {
    const [auctionTitle, setAuctionTitle] = useState('');
    const [auctionDate, setAuctionDate] = useState('');
    const [auctionMinimumbid, setAuctionMinimumbid] = useState('');
    const [auctionImage, setAuctionImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAuctionImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleImageDelete = () => {
        setAuctionImage(null);
        setPreviewUrl(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('auctionTitle', auctionTitle);
        formData.append('auctionDate', auctionDate);
        formData.append('auctionMinimumbid', auctionMinimumbid);
        if (auctionImage) {
            formData.append('auctionImage', auctionImage);
        }

        try {
            const response = await fetch('/api/auction/items', {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Auction created:', data);
            alert("경매가 성공적으로 추가되었습니다.");
            closeAuctionModal(); // 모달 닫기
        } catch (error) {
            alert("경매 추가에 오류가 발생했습니다.");
            console.error('Error submitting auction:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal_content">
                <span className="close" onClick={closeAuctionModal}>&times;</span>
                <h2>청과 경매 신청</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form_group">
                        <label>경매 제목:</label>
                        <input
                            type="text"
                            value={auctionTitle}
                            onChange={(e) => setAuctionTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form_group">
                        <label>경매 날짜:</label>
                        <input
                            type="datetime-local"
                            value={auctionDate}
                            onChange={(e) => setAuctionDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form_group">
                        <label>최소 입찰가:</label>
                        <input
                            type="number"
                            value={auctionMinimumbid}
                            onChange={(e) => setAuctionMinimumbid(e.target.value)}
                            required
                        />
                    </div>
                    <div className="image_upload_container">
                        <label>경매 이미지:</label>
                        <div className="image_upload_box">
                            {previewUrl ? (
                                <div className="preview_container">
                                    <img src={previewUrl} alt="Auction Preview" className="preview_image" />
                                    <button type="button" className="delete_photo_btn" onClick={handleImageDelete}>
                                        ×
                                    </button>
                                </div>
                            ) : (
                                <label htmlFor="auctionImage" className="photo_upload_label">
                                    이미지 추가
                                </label>
                            )}
                            <input
                                type="file"
                                id="auctionImage"
                                onChange={handleImageChange}
                                accept="image/*"
                                style={{ display: 'none' }}
                            />
                        </div>
                    </div>
                    <button type="submit" className="submit_btn">경매 신청</button>
                </form>
            </div>
        </div>
    );
}

export default AuctionModal;
