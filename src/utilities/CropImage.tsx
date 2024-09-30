const getCroppedImg = (imageSrc, pixelCrop) => {
  console.log(imageSrc, " data in  crop image utility function");
  console.log(pixelCrop, " aspect ratio in crop image utility function");
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;

    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Set canvas dimensions to the cropped area dimensions
      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;

      // Draw the cropped image on the canvas
      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
      );

      // DEBUGGING: Check if the canvas is drawn correctly
      console.log(
        "Canvas width:",
        canvas.width,
        "Canvas height:",
        canvas.height
      );

      // Use canvas.toBlob to create a Blob and handle it
      canvas.toBlob((blob) => {
        if (blob) {
          const blobUrl = URL.createObjectURL(blob);
          console.log("Blob URL:", blobUrl); // Check the URL here
          resolve(blob); // resolving error ,changed blobUrl to blob
        } else {
          reject(new Error("Canvas is empty or failed to create Blob"));
        }
      }, "image/jpeg");
    };

    image.onerror = (error) => {
      reject(new Error("Failed to load image: " + error));
    };
  });
};
export default getCroppedImg;
