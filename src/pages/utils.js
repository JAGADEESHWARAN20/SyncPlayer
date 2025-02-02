export function formatTime(time) {
     const hours = Math.floor(time / 3600).toString().padStart(2, '0');
     const minutes = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
     const seconds = Math.floor(time % 60).toString().padStart(2, '0');
     const milliseconds = Math.floor((time % 1) * 1000).toString().padStart(3, '0');
     return `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

export function captureThumbnail(videoFile, callback) {
     const videoElement = document.createElement('video');
     videoElement.src = URL.createObjectURL(videoFile);
     videoElement.crossOrigin = 'anonymous';
     videoElement.muted = true;
     videoElement.currentTime = 2;

     videoElement.addEventListener('loadeddata', () => {
          const canvas = document.createElement('canvas');
          canvas.width = 160;
          canvas.height = 90;
          const ctx = canvas.getContext('2d');

          if (!ctx) {
               console.error('Canvas context is null.');
               return;
          }

          videoElement.play();
          setTimeout(() => {
               ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
               callback(canvas.toDataURL('image/png'));
               videoElement.remove();
          }, 500);
     });
}