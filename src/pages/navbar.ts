import '../output.css';
import 'boxicons/css/boxicons.min.css';

document.addEventListener('DOMContentLoaded', () => {
     const root = document.getElementById('root');

     if (root) {
          const audioElement = document.createElement('audio');
          const videoElement = document.createElement('video');


          const container = document.createElement('div');
          container.className = 'flex flex-col fixed justify-center  items-center h-[100vh] w-[100vw] bg-white text-black';

          const title = document.createElement('h1');
          title.className = 'text-2xl font-bold mb-6';
          title.textContent = 'Upload Audio and Video Files';
          container.appendChild(title);

          // Flex row container for audio and video input
          const inputContainer = document.createElement('div');
          inputContainer.className = 'flex flex-row inputContainer gap-4 w-[30dvw] h-[20dvh] relative items-center';
          // Create the ControlsContainer element
          const ControlsContainer = document.createElement('div');
          ControlsContainer.className = 'absolute justify-center w-[100dvw] z-[999999999]  h-[10dvh] bg-black bottom-0 flex flex-row items-center transition-transform translate-y-[100%] duration-200'; // Initially hidden

          const playicon = document.createElement('i');
          playicon.className = 'bx bx-play text-white text-4xl'; // Add the initial 'bx-play' class

          const progressContainer = document.createElement('div');
          progressContainer.className = 'w-full flex items-center justify-between text-white text-sm font-mono';

          // Create left timestamp (Current Time)
          const currentTimeDisplay = document.createElement('span');
          currentTimeDisplay.innerText = '00:00:00:00';

          // Create right timestamp (Remaining Time)
          const remainingTimeDisplay = document.createElement('span');
          remainingTimeDisplay.innerText = '00:00:00:00';

          // Create progress bar
          const playerProgress = document.createElement('div');
          playerProgress.className = 'w-[1200px] h-[2px] bg-white relative flex items-center';

          // Create handle
          const handleplayer = document.createElement('span');
          handleplayer.className = 'w-[20px] h-[20px] bg-black rounded-full border-2 border-white absolute left-0 transform -translate-x-1/2';

          // Append elements
          ControlsContainer.appendChild(playicon)
          playerProgress.appendChild(handleplayer);
          progressContainer.appendChild(currentTimeDisplay);
          progressContainer.appendChild(playerProgress);
          progressContainer.appendChild(remainingTimeDisplay);
          ControlsContainer.appendChild(progressContainer);

          const formatTime = (time: number): string => {
               const hours = Math.floor(time / 3600).toString().padStart(2, '0');
               const minutes = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
               const seconds = Math.floor(time % 60).toString().padStart(2, '0');
               const milliseconds = Math.floor((time % 1) * 1000).toString().padStart(3, '0');
               return `${hours}:${minutes}:${seconds}:${milliseconds}`;
          };
          // Add a click event listener to toggle between 'bx-play' and 'bx-pause'
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

          container.appendChild(ControlsContainer);

          // Variable to track if the mouse is inside the controls
          let isMouseOverControls = false;

          // Add mouseenter and mouseleave events to the controls container
          ControlsContainer.addEventListener("mouseenter", () => {
               isMouseOverControls = true; // Mouse is inside the controls
          });

          ControlsContainer.addEventListener("mouseleave", () => {
               isMouseOverControls = false; // Mouse left the controls
          });

          // Listen to mouse movements
          document.addEventListener("mousemove", (event) => {
               const cursorYPosition = event.clientY; // Get the cursor's y-coordinate
               const windowHeight = window.innerHeight;
               const threshold = windowHeight - 50; // Show when mouse is near the bottom 50px

               if (cursorYPosition >= threshold || isMouseOverControls) {
                    // Slide in the controls
                    ControlsContainer.classList.remove('translate-y-[100%]');
                    ControlsContainer.classList.add('translate-y-0');
               } else if (!isMouseOverControls && cursorYPosition < threshold - 10) {
                    // Slide out the controls when moving away and not hovering over it
                    ControlsContainer.classList.remove('translate-y-0');
                    ControlsContainer.classList.add('translate-y-[100%]');
               }
          });

          // Create the MenuContainer element
          // Create the MenuContainer element
          const MenuContainer = document.createElement('div');
          MenuContainer.className = 'absolute left-[-1000px] duration-200 z-[9999999] top-[100px] bg-black flex flex-col w-[30dvw] h-[30dvh] transition-all';
          document.body.appendChild(MenuContainer);

          // Variable to track if the mouse is inside the menu
          let isMouseOverMenu = false;

          // Add mouseenter and mouseleave events to the menu container
          MenuContainer.addEventListener("mouseenter", () => {
               isMouseOverMenu = true; // Mouse is inside the menu
          });

          MenuContainer.addEventListener("mouseleave", () => {
               isMouseOverMenu = false; // Mouse left the menu
          });

          // Listen to mouse movements
          document.addEventListener("mousemove", (event) => {
               const cursorPosition = event.clientX; // Get the cursor's x-coordinate
               const threshold = 10; // Set the threshold for "near the corner"

               if (cursorPosition <= threshold || isMouseOverMenu) {
                    // Slide in the menu
                    MenuContainer.classList.remove('left-[-1000px]');
                    MenuContainer.classList.add('left-[10px]');
               } else if (!isMouseOverMenu && cursorPosition > 50) {
                    // Slide out the menu when moving away and not hovering over it
                    MenuContainer.classList.remove('left-[10px]');
                    MenuContainer.classList.add('left-[-1000px]');
               }
          });



          const audioInputWrapper = document.createElement('div');
          audioInputWrapper.className = 'relative flex flex-col group border cursor-pointer rounded-md border-black hover:bg-black items-center justify-center w-1/2 h-full';

          // Audio icon
          const audioIcon = document.createElement('i');
          audioIcon.className = 'bx bx-music text-5xl text-black group-hover:text-white  absolute';
          audioIcon.style.transform = 'translate(-50%, -50%) scale(1.5)'; // Center and scale the icon
          audioIcon.style.top = '50%';
          audioIcon.style.left = '50%';
          audioInputWrapper.appendChild(audioIcon);

          // Audio input
          const audioInput = document.createElement('input');
          audioInput.type = 'file';
          audioInput.accept = 'audio/*';
          audioInput.className = 'file-input bg-gray-800 z-[999] w-full cursor-pointer opacity-0 absolute h-full left-0 top-0 text-white p-2 rounded hover:bg-gray-700 focus:ring-2 focus:ring-blue-500';
          audioInputWrapper.appendChild(audioInput);

          // Video input
          const videoInputWrapper = document.createElement('div');
          videoInputWrapper.className = 'relative flex border group cursor-pointer rounded-md border-black hover:bg-black flex-col items-center  justify-center w-1/2 h-full';

          // Video icon
          const videoIcon = document.createElement('i');
          videoIcon.className = 'bx bx-video text-5xl text-black group-hover:text-white absolute';
          videoIcon.style.transform = 'translate(-50%, -50%) scale(1.5)';
          videoIcon.style.top = '50%';
          videoIcon.style.left = '50%';
          videoInputWrapper.appendChild(videoIcon);

          // Video input
          const videoInput = document.createElement('input');
          videoInput.type = 'file';
          videoInput.accept = 'video/*';
          videoInput.className = 'file-input bg-gray-800 z-[999] w-full opacity-0 cursor-pointer absolute h-full right-0 top-0 text-white p-2 rounded hover:bg-gray-700 focus:ring-2 focus:ring-blue-500';
          videoInputWrapper.appendChild(videoInput);

          inputContainer.appendChild(audioInputWrapper);
          inputContainer.appendChild(videoInputWrapper);
          container.appendChild(inputContainer);

          // Black canvas and progress loader
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

          container.appendChild(blackCanvas);

          // Video and audio elements
          videoElement.className = 'w-full h-full hidden';
          blackCanvas.appendChild(videoElement);

          root.appendChild(container);

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
               blackCanvas.classList.remove('hidden');
               let progress = 0;

               const interval = setInterval(() => {
                    if (progress >= 100) {
                         clearInterval(interval);
                         progressText.textContent = '';
                         progressLoader.style.width = '0%'; // Reset loader
                         videoElement.classList.remove('hidden');
                         videoElement.play();
                         audioElement.play();

                         videoInputWrapper.classList.add('hidden')
                         audioInputWrapper.classList.add('hidden')
                    } else {
                         progress += 5;
                         progressLoader.style.width = `${progress}%`; // From 0% to 50%
                         progressText.textContent = `Loading ${progress}%`;
                    }
               }, 50);
          }

          videoElement.addEventListener('timeupdate', () => {
               if (Math.abs(videoElement.currentTime - audioElement.currentTime) > 0.1) {
                    audioElement.currentTime = videoElement.currentTime;
               }
          });
          let forwardTimeout: ReturnType<typeof setTimeout> | null = null;
          let backwardTimeout: ReturnType<typeof setTimeout> | null = null;

          // Function to update handle position
          const updateHandlePosition = () => {
               if (!videoElement.duration) return;

               const progress = (videoElement.currentTime / videoElement.duration) * 100;
               handleplayer.style.left = `${progress}%`;

               // Update timestamps
               currentTimeDisplay.innerText = formatTime(videoElement.currentTime);
               remainingTimeDisplay.innerText = formatTime(videoElement.duration - videoElement.currentTime);
          };

          // Sync handle with video progress
          videoElement.addEventListener('timeupdate', updateHandlePosition);

          // Drag functionality for handle
          let isDragging = false;

          handleplayer.addEventListener('mousedown', (e) => {
               isDragging = true;
               document.addEventListener('mousemove', onDrag);
               document.addEventListener('mouseup', () => {
                    isDragging = false;
                    document.removeEventListener('mousemove', onDrag);
               });
          });
          const onDrag = (e: MouseEvent) => {
               if (!isDragging) return;

               const rect = playerProgress.getBoundingClientRect();
               let newLeft = e.clientX - rect.left;

               // Prevent handle from going out of bounds
               newLeft = Math.max(0, Math.min(newLeft, rect.width));

               handleplayer.style.left = `${(newLeft / rect.width) * 100}%`;

               // Update video time accordingly
               videoElement.currentTime = (newLeft / rect.width) * videoElement.duration;
               updateHandlePosition();
          };

          document.addEventListener('keydown', (e) => {
               switch (e.code) {
                    case 'Space': // Play/Pause toggle on Spacebar
                         // e.preventDefault();

                         // // Remove any existing icons before creating a new one
                         // const existingIconWrapper = document.querySelector('.absolute-icon-wrapper');
                         // if (existingIconWrapper) {
                         //      existingIconWrapper.remove();
                         // }

                         // // Create the wrapper and icon element
                         // const iconWrapper = document.createElement('div');
                         // iconWrapper.className = 'absolute-icon-wrapper absolute inset-0 w-[100dvw] h-[100dvh] bg-slate-800 bg-opacity-70 backdrop-blur-md  flex justify-center items-center z-10 transition-opacity duration-200'; // Background blur effect
                         // const boxIcon = document.createElement('i');
                         // boxIcon.className = 'bx text-6xl scale-[400%] text-white'; // Base icon styles

                         // if (videoElement.paused) {
                         //      // Play state: show play icon briefly
                         //      videoElement.play();
                         //      audioElement.play();
                         //      boxIcon.classList.add('bx-play'); // Play icon
                         //      iconWrapper.appendChild(boxIcon);
                         //      videoElement.parentElement.appendChild(iconWrapper);

                         //      // Fade-out effect
                         //      setTimeout(() => {
                         //           iconWrapper.style.opacity = '0';
                         //           setTimeout(() => {
                         //                iconWrapper.remove(); // Remove after fade-out
                         //           }, 1000);
                         //      }, 20);
                         // } else {
                         //      // Pause state: show pause icon persistently
                         //      videoElement.pause();
                         //      audioElement.pause();
                         //      boxIcon.classList.add('bx-pause'); // Pause icon
                         //      iconWrapper.appendChild(boxIcon);
                         //      videoElement.parentElement.appendChild(iconWrapper);
                         // }
                         e.preventDefault();

                         // Remove any existing icon wrapper
                         let iconWrapper = document.querySelector('.absolute-icon-wrapper') as HTMLElement;
                         if (iconWrapper) {
                              iconWrapper.remove();
                         }

                         // Create a new icon wrapper
                         iconWrapper = document.createElement('div');
                         iconWrapper.className = 'absolute-icon-wrapper fixed inset-0 w-screen h-screen bg-slate-800 bg-opacity-70 backdrop-blur-md flex justify-center items-center z-[99] transition-opacity duration-200';

                         const boxIcon = document.createElement('i');
                         boxIcon.className = 'bx text-6xl scale-[400%] text-white'; // Icon styles

                         if (videoElement.paused) {
                              // Play state
                              videoElement.play();
                              audioElement.play();
                              videoElement.classList.add('fullscreen-mode');
                              boxIcon.classList.add('bx-play'); // Play icon
                         } else {
                              // Pause state
                              videoElement.pause();
                              audioElement.pause();
                              videoElement.classList.remove('fullscreen-mode');
                              boxIcon.classList.add('bx-pause'); // Pause icon
                         }

                         // Append icon to wrapper and wrapper to body
                         iconWrapper.appendChild(boxIcon);
                         document.body.appendChild(iconWrapper);

                         // Handle fade-out for play state
                         if (!videoElement.paused) {
                              setTimeout(() => {
                                   iconWrapper.style.opacity = '0';
                                   setTimeout(() => {
                                        iconWrapper.remove();
                                   }, 1000); // Remove after fade-out
                              }, 500); // Show icon for 500ms
                         }

                         break;

                    // case 'ArrowUp': // Increase volume using Arrow Up
                    //      if (videoElement.volume < 1) {
                    //           videoElement.volume += 0.05;
                    //           audioElement.volume += 0.05;
                    //      }
                    //      break;
                    case 'ArrowUp':
                    case 'ArrowDown': // Decrease volume
                         e.preventDefault();

                         // Remove any existing volume display before creating a new one
                         const existingVolumeWrapper = document.querySelector('.volume-display-wrapper');
                         if (existingVolumeWrapper) {
                              existingVolumeWrapper.remove();
                         }

                         // Adjust volume
                         const step = 0.1; // Volume adjustment step
                         if (e.code === 'ArrowUp') {
                              videoElement.volume = Math.min(videoElement.volume + step, 1); // Increase volume, max 1
                              audioElement.volume = videoElement.volume;
                         } else if (e.code === 'ArrowDown') {
                              videoElement.volume = Math.max(videoElement.volume - step, 0); // Decrease volume, min 0
                              audioElement.volume = videoElement.volume;
                         }

                         // Create the wrapper for volume display
                         const volumeWrapper = document.createElement('div');
                         volumeWrapper.className = 'volume-display-wrapper absolute top-4 right-[10%] scale-[200%] text-white px-4 py-2 rounded-md flex items-center gap-2 z-20';

                         // Create the volume icon
                         const volumeIcon = document.createElement('i');
                         volumeIcon.className = 'bx'; // Base icon class
                         if (videoElement.volume === 0) {
                              volumeIcon.classList.add('bx-volume-mute'); // Mute icon
                         } else if (videoElement.volume < 0.5) {
                              volumeIcon.classList.add('bx-volume-low'); // Low volume icon
                         } else {
                              volumeIcon.classList.add('bx-volume-full'); // Full volume icon
                         }

                         // Create the volume level text
                         const volumeText = document.createElement('span');
                         volumeText.textContent = `${Math.round(videoElement.volume * 100)}%`; // Show volume as percentage

                         // Append icon and text to wrapper
                         volumeWrapper.appendChild(volumeIcon);
                         volumeWrapper.appendChild(volumeText);

                         // Append the volume display to the video container
                         videoElement.parentElement.appendChild(volumeWrapper);

                         // Auto-remove the volume display after 2 seconds
                         setTimeout(() => {
                              volumeWrapper.style.opacity = '0';
                              setTimeout(() => {
                                   volumeWrapper.remove();
                              }, 500); // Remove after fade-out
                         }, 2000);

                         break;

                    case 'ArrowRight': // Forward action with delay
                         e.preventDefault();
                         if (forwardTimeout) clearTimeout(forwardTimeout);
                         forwardTimeout = setTimeout(() => {
                              videoElement.currentTime = Math.min(videoElement.currentTime + 5, videoElement.duration);
                              updateHandlePosition();
                         }, 20);
                         break;

                    case 'ArrowLeft': // Backward action with delay
                         e.preventDefault();
                         if (backwardTimeout) clearTimeout(backwardTimeout);
                         backwardTimeout = setTimeout(() => {
                              videoElement.currentTime = Math.max(videoElement.currentTime - 5, 0);
                              updateHandlePosition();
                         }, 10);
                         break;
                    case 'KeyF': // Enter fullscreen using F
                         if (!document.fullscreenElement) {
                              // Request fullscreen
                              if (videoElement.requestFullscreen) {
                                   videoElement.requestFullscreen();
                                   console.log('full screen active')
                                   // You can remove controls if needed when fullscreen is active
                                   videoElement.removeAttribute('controls')
                              }
                         } else {
                              if (videoElement.requestFullscreen) {
                                   videoElement.requestFullscreen();
                                   console.log('full screen active')
                                   // You can remove controls if needed when fullscreen is active
                                   videoElement.removeAttribute('controls')
                              }
                         }
                         break;
                    case 'Escape': // Exit fullscreen using Escape
                         if (document.exitFullscreen) {
                              document.exitFullscreen();
                         }
                         break;

                    default:
                         break;
               }
          });

          // Mouse functionality for volume control and dragging
          let isMouseDown = false;
          let startX = 0;
          let videoStartTime = 0;

          document.addEventListener('wheel', (e) => {
               if (e.deltaY < 0) { // Scroll Up (increase volume)
                    if (videoElement.volume < 1) {
                         videoElement.volume += 0.05;
                         audioElement.volume += 0.05;
                    }
               } else if (e.deltaY > 0) { // Scroll Down (decrease volume)
                    if (videoElement.volume > 0) {
                         videoElement.volume -= 0.05;
                         audioElement.volume -= 0.05;
                    }
               }
          });

          document.addEventListener('mousedown', (e) => {
               if (e.button === 0) { // Left mouse button clicked
                    isMouseDown = true;
                    startX = e.clientX;
                    videoStartTime = videoElement.currentTime;
               }
          });

          document.addEventListener('mousemove', (e) => {
               if (isMouseDown) {
                    const diffX = e.clientX - startX;
                    const newTime = videoStartTime + diffX / 100;
                    if (newTime >= 0 && newTime <= videoElement.duration) {
                         videoElement.currentTime = newTime;
                         audioElement.currentTime = newTime;
                    }
               }
          });

          document.addEventListener('mouseup', () => {
               isMouseDown = false;
          });

     } else {
          console.error('Element with id "root" not found.');
     }
});

