import React, { useState } from "react";
import { HiOutlineClipboardCopy } from "react-icons/hi";
import { BsWhatsapp, BsInstagram, BsTwitter, BsFacebook, BsLinkedin } from "react-icons/bs";

function SharePopup({ postUrl, onClose }) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(postUrl);
    setCopied(true);
    setTimeout(() => {
        setCopied(false)
    }, 2000);
    // alert("Link copied to clipboard!");
  };

  const handleShareClick = (platform) => {
    let shareUrl = "";
    const encodedUrl = encodeURIComponent(postUrl);

    switch (platform) {
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodedUrl}`;
        break;
      case "instagram":
        shareUrl = `https://www.instagram.com/`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/share?url=${encodedUrl}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      // Add more platforms here
      default:
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-3/4 lg:w-1/2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Share Post</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        {/* Copy Link Section */}
        <div className="mb-4 flex gap-2 outli">
          <input
            type="text"
            value={postUrl}
            readOnly
            className="w-3/4 p-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={handleCopyLink}
            className={`mt-2 w-1/4 p-2 ${copied ? "bg-green-500" : "bg-blue-500"} text-white rounded-md flex justify-center items-center gap-2`}
          >
            <HiOutlineClipboardCopy size={20} />
            {copied ? "Copied!" : "Copy Link"}
          </button>
        </div>

        {/* Share Icons */}
        <div className="flex justify-center gap-7 mt-4">
          <button onClick={() => handleShareClick("whatsapp")}>
            <BsWhatsapp className="text-green-500 w-8 h-8" size={24} />
          </button>
          <button onClick={() => handleShareClick("instagram")}>
            <BsInstagram className="text-pink-500 w-8 h-8" size={24} />
          </button>
          <button onClick={() => handleShareClick("twitter")}>
            <BsTwitter className="text-blue-500 w-8 h-8" size={24} />
          </button>
          <button onClick={() => handleShareClick("facebook")}>
            <BsFacebook className="text-blue-700 w-8 h-8" size={24} />
          </button>
          <button onClick={() => handleShareClick("linkedin")}>
            <BsLinkedin className="text-blue-600 w-8 h-8" size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SharePopup;
