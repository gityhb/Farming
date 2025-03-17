// DaumPostcodeComponent.js
import React from 'react';
import DaumPostcode from "react-daum-postcode";

const DaumPostcodeComponent = ({ onComplete }) => {
    return <DaumPostcode onComplete={onComplete} />;
};

export default DaumPostcodeComponent;
