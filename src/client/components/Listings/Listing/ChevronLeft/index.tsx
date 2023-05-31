import React from 'react'

const ChevronLeft = ({counter}) => (
        <svg onClick={() => counter(-1)} className="chevron chevron-left" width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d)">
        <path fillRule="evenodd" clipRule="evenodd" d="M2 14.5C2 7.59644 7.59644 2 14.5 2C21.4036 2 27 7.59644 27 14.5C27 21.4036 21.4036 27 14.5 27C7.59644 27 2 21.4036 2 14.5ZM17.2071 7.50716C17.5976 7.89768 17.5976 8.53085 17.2071 8.92137L12.0627 14.0658L17.0769 19.08C17.4674 19.4705 17.4674 20.1037 17.0769 20.4942C16.6864 20.8847 16.0532 20.8847 15.6627 20.4942L10.0059 14.8374C9.65722 14.4887 9.61982 13.9467 9.89367 13.5566C9.94109 13.4131 10.0219 13.2782 10.136 13.164L15.7929 7.50716C16.1834 7.11663 16.8166 7.11663 17.2071 7.50716Z" fill="white" fillOpacity="0.69"/>
        </g>
        <defs>
        <filter id="filter0_d" x="0" y="0" width="29" height="29" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
        <feOffset/>
        <feGaussianBlur stdDeviation="1"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
        </filter>
        </defs>
        </svg>
    )


export default ChevronLeft
