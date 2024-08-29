import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { useSelector } from 'react-redux';

const QRCodeGenerator = ({data}) => {
  const { currentUser } = useSelector(state=>state.user);   
  const canvasRef = useRef(null);
  const currentUrl = data // Get the current URL

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, currentUrl, { width: 256, margin: 2 }, (error) => {
        if (error) console.error(error);
      });
    }
  }, [currentUrl]);

  return (
    <div className="flex flex-col items-center">
      <canvas ref={canvasRef} />
      <p className="mt-4 text-center text-gray-700 dark:text-white">
        Scan the QR code to open the current page.
      </p>
    </div>
  );
};

export default QRCodeGenerator;
