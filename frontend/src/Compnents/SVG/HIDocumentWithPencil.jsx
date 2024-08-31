import React from 'react'

const HIDocumentWithPencil = () => {
  return (
    <div className=''><svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* <!-- Document --> */}
    <path d="M7 2H13L19 8V20C19 21.1046 18.1046 22 17 22H7C5.89543 22 5 21.1046 5 20V4C5 2.89543 5.89543 2 7 2Z" fill="#E5E7EB" stroke="#374151" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M13 2V8H19" stroke="#374151" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>

    {/* <!-- Pen --> */}
    <path d="M14 14L20 8L16 4L10 10L10 14L14 14Z" fill="#60A5FA" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M10 14V18H14L20 12L16 8L10 14Z" fill="#93C5FD"/>
    <path d="M10 14L16 8" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M14 14L20 8" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg></div>
  )
}

export default HIDocumentWithPencil