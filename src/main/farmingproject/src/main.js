import React, { useEffect, useState, useRef } from "react";
import './main.css';
import axios from 'axios';

function Main() {
    const [slides, setSlides] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    // 3초마다 슬라이드 이동하게 하는 변수
    const timerRef = useRef(null);

    useEffect(() => {
        axios.get('/api/slides')
            .then(response => setSlides(response.data))
            .catch(error => console.error('Error fetching slides:', error));
    }, []);

    useEffect(() => {
        startTimer();

        return () => clearInterval(timerRef.current);
    }, [slides.length]);

    // 3초마다 슬라이드 이동
    const startTimer = () => {
        clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setCurrentSlide(prevSlide => (prevSlide + 1) % slides.length);
        }, 3000);
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        resetTimer();   // 타이머 3초를 0초로 초기화
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
        resetTimer();
    };

    // 타이머 0으로 초기화
    const resetTimer = () => {
        clearInterval(timerRef.current);
        startTimer();
    };

    if (slides.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div id={'body'}>
            <div id={'main_page'} className={'page'}>
                <div id={'main_slide'}>
                    <div id={'arrowL'}>
                        <button onClick={prevSlide}><img src="img/etc/arrowL.png" alt="previous"/></button>
                    </div>
                    <div id={'slides'}>
                        <div id={'slides_text'}>
                        <p id={'content1'}>{slides[currentSlide].content1}</p>
                        <p id={'title'}>{slides[currentSlide].title}</p>
                        <p id={'content2'}>{slides[currentSlide].content2}</p>
                        </div>
                        <div id={'slides_img'}>
                        {slides[currentSlide].imageUrl && (
                            <img src={slides[currentSlide].imageUrl} alt={slides[currentSlide].title}
                                 style={{width: '960px', height: '710px'}}/>
                        )}
                        </div>
                    </div>
                    <div id={'arrowR'}>
                        <button onClick={nextSlide}><img src="img/etc/arrowR.png" alt="next"/></button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;