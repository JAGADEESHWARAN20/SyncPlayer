export function handlePlayPause(controlsContainer, videoElement, audioElement) {
     const playicon = controlsContainer.querySelector('.bx-play');
     playicon.addEventListener('click', () => {
          if (playicon.classList.contains('bx-play')) {
               playicon.classList.remove('bx-play');
               playicon.classList.add('bx-pause');
               videoElement.pause();
               audioElement.pause();
          } else {
               playicon.classList.remove('bx-pause');
               playicon.classList.add('bx-play');
               videoElement.play();
               audioElement.play();
          }
     });
}

export function handleKeyDown(videoElement, audioElement) {
     document.addEventListener('keydown', (e) => {
          switch (e.code) {
               case 'Space':
                    e.preventDefault();
                    if (videoElement.paused) {
                         videoElement.play();
                         audioElement.play();
                    } else {
                         videoElement.pause();
                         audioElement.pause();
                    }
                    break;
               // Add more key handlers as needed...
          }
     });
}

export function handleMouseEvents(controlsContainer, menuContainer) {
     let isMouseOverControls = false;
     let isMouseOverMenu = false;

     controlsContainer.addEventListener('mouseenter', () => {
          isMouseOverControls = true;
     });

     controlsContainer.addEventListener('mouseleave', () => {
          isMouseOverControls = false;
     });

     menuContainer.addEventListener('mouseenter', () => {
          isMouseOverMenu = true;
     });

     menuContainer.addEventListener('mouseleave', () => {
          isMouseOverMenu = false;
     });

     document.addEventListener('mousemove', (event) => {
          const cursorYPosition = event.clientY;
          const windowHeight = window.innerHeight;
          const threshold = windowHeight - 50;

          if (cursorYPosition >= threshold || isMouseOverControls) {
               controlsContainer.classList.remove('translate-y-[100%]');
               controlsContainer.classList.add('translate-y-0');
          } else if (!isMouseOverControls && cursorYPosition < threshold - 10) {
               controlsContainer.classList.remove('translate-y-0');
               controlsContainer.classList.add('translate-y-[100%]');
          }

          const cursorPosition = event.clientX;
          if (cursorPosition <= 10 || isMouseOverMenu) {
               menuContainer.classList.remove('left-[-1000px]');
               menuContainer.classList.add('left-[10px]');
          } else if (!isMouseOverMenu && cursorPosition > 50) {
               menuContainer.classList.remove('left-[10px]');
               menuContainer.classList.add('left-[-1000px]');
          }
     });
}

export function handleDragEvents(videoElement, controlsContainer) {
     const handleplayer = controlsContainer.querySelector('.w-[20px]');
     const playerProgress = controlsContainer.querySelector('.w-[1150px]');

     let isDragging = false;

     handleplayer.addEventListener('mousedown', () => {
          isDragging = true;
          document.addEventListener('mousemove', onDrag);
          document.addEventListener('mouseup', () => {
               isDragging = false;
               document.removeEventListener('mousemove', onDrag);
          });
     });

     const onDrag = (e) => {
          if (!isDragging) return;

          const rect = playerProgress.getBoundingClientRect();
          let newLeft = e.clientX - rect.left;
          newLeft = Math.max(0, Math.min(newLeft, rect.width));

          handleplayer.style.left = `${(newLeft / rect.width) * 100}%`;
          videoElement.currentTime = (newLeft / rect.width) * videoElement.duration;
     };
}

export function handleFileInputs(audioElement, videoElement, inputContainer, menuContainer) {
     const audioInput = inputContainer.querySelector('input[type="file"][accept="audio/*"]');
     const videoInput = menuContainer.querySelector('input[type="file"][accept="video/*"]');

     let isAudioSelected = false;
     let isVideoSelected = false;

     audioInput.addEventListener('change', () => {
          if (audioInput.files.length > 0) {
               isAudioSelected = true;
               audioElement.src = URL.createObjectURL(audioInput.files[0]);
               checkFileStatus();
          }
     });

     videoInput.addEventListener('change', () => {
          if (videoInput.files.length > 0) {
               isVideoSelected = true;
               videoElement.src = URL.createObjectURL(videoInput.files[0]);
               checkFileStatus();
          }
     });

     function checkFileStatus() {
          if (isAudioSelected && isVideoSelected) {
               startProgressLoader();
          }
     }

     function startProgressLoader() {
          const blackCanvas = document.createElement('div');
          blackCanvas.className = 'fixed inset-0 bg-black hidden flex justify-center items-center';

          const loaderWrapper = document.createElement('div');
          loaderWrapper.className = 'flex flex-col items-center';

          const progressLoaderContainer = document.createElement('div');
          progressLoaderContainer.className = 'w-[50%] h-[4px] bg-gray-700 rounded-full relative mb-4';

          const progressLoader = document.createElement('div');
          progressLoader.className = 'bg-white h-full rounded-full absolute left-0';
          progressLoader.style.width = '0%';

          const progressText = document.createElement('span');
          progressText.className = 'text-white text-sm';
          progressText.textContent = 'Loading 0%';

          progressLoaderContainer.appendChild(progressLoader);
          loaderWrapper.appendChild(progressLoaderContainer);
          loaderWrapper.appendChild(progressText);
          blackCanvas.appendChild(loaderWrapper);

          document.body.appendChild(blackCanvas);

          let progress = 0;

          const interval = setInterval(() => {
               if (progress >= 100) {
                    clearInterval(interval);
                    progressText.textContent = '';
                    progressLoader.style.width = '0%';
                    videoElement.classList.remove('hidden');
                    videoElement.play();
                    audioElement.play();

                    inputContainer.querySelector('.w-1/2').classList.add('hidden');
               } else {
                    progress += 5;
                    progressLoader.style.width = `${progress}%`;
                    progressText.textContent = `Loading ${progress}%`;
               }
          }, 50);
     }
}