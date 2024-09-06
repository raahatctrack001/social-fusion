import { useEffect, useRef, useState } from 'react';

const ImageEditor = () => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);

  useEffect(() => {
    // Dynamically import fabric.js to ensure compatibility with ES module
    import('fabric').then((fabricModule) => {
      const fabricCanvas = new fabricModule.fabric.Canvas(canvasRef.current, {
        width: 400,
        height: 400,
      });
      setCanvas(fabricCanvas);
    }).catch(err => {
      console.error("Error importing fabric.js:", err);
    });
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      import('fabric').then((fabricModule) => {
        fabricModule.fabric.Image.fromURL(e.target.result, (img) => {
          img.set({
            left: 50,
            top: 50,
          });
          canvas.add(img);
          canvas.renderAll();
        });
      });
    };
    reader.readAsDataURL(file);
  };

  // Add text and stickers the same way by importing 'fabric' dynamically
  const addText = () => {
    import('fabric').then((fabricModule) => {
      const text = new fabricModule.fabric.Textbox('Your Text Here', {
        left: 100,
        top: 100,
        fill: 'white',
        fontSize: 24,
        editable: true,
      });
      canvas.add(text);
      canvas.renderAll();
    });
  };

  const addSticker = () => {
    import('fabric').then((fabricModule) => {
      fabricModule.fabric.Image.fromURL('/path/to/sticker.png', (img) => {
        img.scale(0.5);
        img.set({
          left: 150,
          top: 150,
        });
        canvas.add(img);
        canvas.renderAll();
      });
    });
  };

  const exportImage = () => {
    const dataURL = canvas.toDataURL({
      format: 'png',
      quality: 1.0,
    });
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'edited-image.png';
    link.click();
  };

  return (
    <div className="image-editor">
      <input type="file" onChange={handleImageUpload} />
      <button onClick={addText}>Add Text</button>
      <button onClick={addSticker}>Add Sticker</button>
      <button onClick={exportImage}>Export Image</button>
      <canvas ref={canvasRef} style={{ border: '1px solid black' }}></canvas>
    </div>
  );
};

export default ImageEditor;
