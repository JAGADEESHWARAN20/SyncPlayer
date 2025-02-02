import { createAudioElement, createVideoElement, createContainer, createTitle, createControlsContainer, createMenuContainer, createInputContainer } from './ui.js';
import { formatTime, captureThumbnail } from './utils.js';
import { handlePlayPause, handleKeyDown, handleMouseEvents, handleDragEvents, handleFileInputs } from './eventHandlers.js';

document.addEventListener('DOMContentLoaded', () => {
     const root = document.getElementById('root');

     if (root) {
          // Create UI elements
          const audioElement = createAudioElement();
          const videoElement = createVideoElement();
          const container = createContainer();
          const title = createTitle();
          const controlsContainer = createControlsContainer();
          const menuContainer = createMenuContainer();
          const inputContainer = createInputContainer();

          // Append elements to the DOM
          container.appendChild(title);
          container.appendChild(inputContainer);
          root.appendChild(container);
          document.body.appendChild(controlsContainer);
          document.body.appendChild(menuContainer);

          // Initialize event handlers
          handlePlayPause(controlsContainer, videoElement, audioElement);
          handleKeyDown(videoElement, audioElement);
          handleMouseEvents(controlsContainer, menuContainer);
          handleDragEvents(videoElement, controlsContainer);
          handleFileInputs(audioElement, videoElement, inputContainer, menuContainer);
     } else {
          console.error('Element with id "root" not found.');
     }
});