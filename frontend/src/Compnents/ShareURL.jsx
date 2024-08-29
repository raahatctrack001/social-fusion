import React, { useState } from "react";
import { HiOutlineClipboardCopy } from "react-icons/hi";
import { BsWhatsapp, BsInstagram, BsTwitter, BsFacebook, BsLinkedin } from "react-icons/bs";
import { Button } from "flowbite-react";
import QRCodeGenerator from "./QRCodeGenerator";
function SharePopup({ postUrl, heading, onClose }) {
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
      <div className="dark:bg-gray-800 bg-gray-200 p-6 rounded-lg shadow-lg w-full md:w-3/4 lg:w-1/2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{heading ||"Share Post"}</h2>
          <button onClick={()=>onClose(false)} className="dark:text-gray-500 hover:text-red-700">
            ✕
          </button>
        </div>
        <div className="w-full"> <QRCodeGenerator data={postUrl} />  </div>
        {/* Copy Link Section */}
        <div className="mb-4 flex gap-2 items-center justify-center">
          <input
            type="text"
            value={postUrl}
            readOnly
            className="w-3/4 p-2 h-12 border dark:dark:border-gray-300 rounded-md dark:dark:bg-gray-700 dark:dark:text-white relative top-1"
          />
          <Button
            onClick={handleCopyLink}
            className={`mt-2 w-1/4 p-2 h-12 hover:opacity-60 ${copied ? "bg-green-500" : "bg-blue-500"} text-white rounded-md flex justify-center items-center gap-2`}
          >
            <HiOutlineClipboardCopy size={20} />
            {copied ? "Copied!" : "Copy Link"}
          </Button>
        </div>

        {/* Share Icons */}
        <div className="flex justify-center gap-7 mt-4">
          <button onClick={() => handleShareClick("whatsapp")}>
            <BsWhatsapp className="text-green-500 w-8 h-8 hover:opacity-70" size={24} />
          </button>
          <button onClick={() => handleShareClick("instagram")}>
            <BsInstagram className="text-pink-500 w-8 h-8 hover:opacity-70" size={24} />
          </button>
          <button onClick={() => handleShareClick("twitter")}>
            <BsTwitter className="text-blue-500 w-8 h-8 hover:opacity-70" size={24} />
          </button>
          <button onClick={() => handleShareClick("facebook")}>
            <BsFacebook className="text-blue-700 w-8 h-8 hover:opacity-70" size={24} />
          </button>
          <button onClick={() => handleShareClick("linkedin")}>
            <BsLinkedin className="text-blue-600 w-8 h-8 hover:opacity-70" size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SharePopup;
