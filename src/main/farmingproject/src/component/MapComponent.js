import React, { useEffect } from "react";

function MapComponent({ jobLocation }) {
    useEffect(() => {
        const script = document.createElement("script");
        script.async = true;
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=c366a57b3ff2433fe1749363a7cd1a03&autoload=false&libraries=services`;
        document.head.appendChild(script);

        script.onload = () => {
            window.kakao.maps.load(() => {
                const geocoder = new window.kakao.maps.services.Geocoder();

                // 우편번호 제거하고 주소 변환 (디버깅용)
                const refinedAddress = jobLocation.replace(/^\d{5}/, '').trim();
                console.log("Refined jobLocation:", refinedAddress);

                // jobLocation 주소를 위도와 경도로 변환
                geocoder.addressSearch(refinedAddress, (result, status) => {
                    if (status === window.kakao.maps.services.Status.OK) {
                        const lat = result[0].y; // 위도
                        const lng = result[0].x; // 경도

                        const container = document.getElementById("map");
                        const options = {
                            center: new window.kakao.maps.LatLng(lat, lng),
                            level: 3,
                        };

                        const map = new window.kakao.maps.Map(container, options);
                        new window.kakao.maps.Marker({
                            position: new window.kakao.maps.LatLng(lat, lng),
                            map: map,
                        });
                    } else {
                        console.error("지오코딩 실패:", status, "주소:", refinedAddress);
                        alert("해당 주소로 지도를 표시할 수 없습니다. 주소를 다시 확인해주세요.");
                    }
                });
            });
        };

        return () => {
            document.head.removeChild(script); // 컴포넌트가 해제될 때 스크립트를 제거
        };
    }, [jobLocation]);

    return <div id="map" style={{ width: "100%", height: "320px" }}></div>;
}

export default MapComponent;
