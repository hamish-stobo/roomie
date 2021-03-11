import React from 'react'

const ChevronRight = ({counter}) => (
    <svg onClick={() => counter(+1)} className="chevron chevron-right" width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d)">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M27 14.5C27 21.4036 21.4036 27 14.5 27C7.59644 27 2 21.4036 2 14.5C2 7.59644 7.59644 2 14.5 2C21.4036 2 27 7.59644 27 14.5ZM11.7929 20.4928C11.4024 20.1023 11.4024 19.4692 11.7929 19.0786L16.9373 13.9342L11.9231 8.92C11.5326 8.52947 11.5326 7.89631 11.9231 7.50578C12.3136 7.11526 12.9468 7.11526 13.3373 7.50578L18.9941 13.1626C19.3428 13.5113 19.3802 14.0533 19.1063 14.4434C19.0589 14.5869 18.9781 14.7218 18.864 14.836L13.2071 20.4928C12.8166 20.8834 12.1834 20.8834 11.7929 20.4928Z" fill="white" fill-opacity="0.69"/>
        </g>
        <defs>
        <filter id="filter0_d" x="0" y="0" width="29" height="29" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
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

export default ChevronRight
