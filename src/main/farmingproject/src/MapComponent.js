import React, { useEffect } from "react";

function MapComponent() {
    useEffect(() => {
        const script = document.createElement("script");
        script.async = true;
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=c366a57b3ff2433fe1749363a7cd1a03&autoload=false`;
        document.head.appendChild(script);

        script.onload = () => {
            window.kakao.maps.load(() => {
                const container = document.getElementById("map");
                const options = {
                    center: new window.kakao.maps.LatLng(36.2021, 127.1234),
                    level: 3,
                };
                const map = new window.kakao.maps.Map(container, options);
                new window.kakao.maps.Marker({
                    position: new window.kakao.maps.LatLng(36.2021, 127.1234),
                    map: map,
                });
            });
        };
    }, []);

    return <div id="map" style={{ width: "100%", height: "320px" }}></div>;
}

export default MapComponent;
