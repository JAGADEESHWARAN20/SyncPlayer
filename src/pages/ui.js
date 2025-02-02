export function createAudioElement() {
     const audioElement = document.createElement('audio');
     return audioElement;
}

export function createVideoElement() {
     const videoElement = document.createElement('video');
     return videoElement;
}

export function createContainer() {
     const container = document.createElement('div');
     container.className = 'flex flex-col fixed justify-center items-center h-[100vh] w-[100vw] bg-white text-black';
     return container;
}

export function createTitle() {
     const title = document.createElement('h1');
     title.className = 'text-2xl font-bold mb-6';
     title.textContent = 'Upload Audio and Video Files';
     return title;
}

export function createControlsContainer() {
     const controlsContainer = document.createElement('div');
     controlsContainer.className = 'absolute justify-center w-[100dvw] z-[999999999] h-[10dvh] bg-black bottom-0 flex flex-row items-center transition-transform translate-y-[100%] duration-200';

     const playicon = document.createElement('i');
     playicon.className = 'bx bx-play text-white text-4xl';

     const progressContainer = document.createElement('div');
     progressContainer.className = 'w-full flex items-center justify-start gap-[20px] text-white text-sm font-mono';

     const currentTimeDisplay = document.createElement('span');
     currentTimeDisplay.innerText = '00:00:00:00';
     currentTimeDisplay.className = 'text-2xl fixed left-[5%] font-[poppins]';

     const remainingTimeDisplay = document.createElement('span');
     remainingTimeDisplay.innerText = '00:00:00:00';
     remainingTimeDisplay.className = 'text-2xl fixed right-[10%] font-[poppins]';

     const playerProgress = document.createElement('div');
     playerProgress.className = 'w-[1150px] min-w-[600px] max-w-[2160px] h-[2px] bg-white fixed left-[15%] relative flex items-center';

     const handleplayer = document.createElement('span');
     handleplayer.className = 'w-[20px] h-[20px] bg-black rounded-full border-2 border-white absolute left-0 transform -translate-x-1/2';

     playerProgress.appendChild(handleplayer);
     progressContainer.appendChild(currentTimeDisplay);
     progressContainer.appendChild(playerProgress);
     progressContainer.appendChild(remainingTimeDisplay);
     controlsContainer.appendChild(playicon);
     controlsContainer.appendChild(progressContainer);

     return controlsContainer;
}

export function createMenuContainer() {
     const menuContainer = document.createElement('div');
     menuContainer.className = 'absolute shadow-2xl rounded-lg left-[-1000px] duration-200 z-[9999999] top-[100px] bg-black flex flex-col w-[30dvw] h-[30dvh] transition-all';

     const playlistButton = document.createElement('button');
     playlistButton.id = 'playlistButton';
     playlistButton.className = 'w-full p-2 bg-gray-800 rounded mb-4 flex items-center';
     playlistButton.innerHTML = "<i class='bx bx-list-ul mr-2'></i> Playlist";

     const playlistContainer = document.createElement('div');
     playlistContainer.id = 'playlistContainer';
     playlistContainer.className = 'p-2 bg-gray-700 rounded hidden flex';
     playlistContainer.innerHTML = "<h2 class='text-lg font-semibold mb-2'>Now Playing</h2><ul id='playlistItems' class='space-y-2'></ul>";

     const statusLabel = document.createElement('p');
     statusLabel.id = 'statusLabel';
     statusLabel.className = 'mt-2 text-center text-gray-400';
     statusLabel.textContent = 'No video loaded';

     const addQueueButton = document.createElement('button');
     addQueueButton.id = 'addQueueButton';
     addQueueButton.className = 'p-2 bg-blue-600 text-white rounded ml-2';
     addQueueButton.textContent = 'Add to Queue';

     const videoInput = document.createElement('input');
     videoInput.type = 'file';
     videoInput.accept = 'video/*';
     videoInput.className = 'file-input bg-gray-800 z-[999] w-full opacity-0 cursor-pointer absolute h-full right-0 top-0 text-white p-2 rounded';

     menuContainer.appendChild(playlistButton);
     playlistContainer.appendChild(addQueueButton);
     menuContainer.appendChild(playlistContainer);
     menuContainer.appendChild(statusLabel);
     menuContainer.appendChild(videoInput);

     return menuContainer;
}

export function createInputContainer() {
     const inputContainer = document.createElement('div');
     inputContainer.className = 'flex flex-row inputContainer gap-4 w-[30dvw] h-[20dvh] relative items-center';

     const audioInputWrapper = document.createElement('div');
     audioInputWrapper.className = 'relative flex flex-col group border cursor-pointer rounded-md border-black hover:bg-black items-center justify-center w-1/2 h-full';

     const audioIcon = document.createElement('i');
     audioIcon.className = 'bx bx-music text-5xl text-black group-hover:text-white absolute';
     audioIcon.style.transform = 'translate(-50%, -50%) scale(1.5)';
     audioIcon.style.top = '50%';
     audioIcon.style.left = '50%';

     const audioInput = document.createElement('input');
     audioInput.type = 'file';
     audioInput.accept = 'audio/*';
     audioInput.className = 'file-input bg-gray-800 z-[999] w-full cursor-pointer opacity-0 absolute h-full left-0 top-0 text-white p-2 rounded hover:bg-gray-700 focus:ring-2 focus:ring-blue-500';

     audioInputWrapper.appendChild(audioIcon);
     audioInputWrapper.appendChild(audioInput);

     const videoInputWrapper = document.createElement('div');
     videoInputWrapper.className = 'relative flex border group cursor-pointer rounded-md border-black hover:bg-black flex-col items-center justify-center w-1/2 h-full';

     const videoIcon = document.createElement('i');
     videoIcon.className = 'bx bx-video text-5xl text-black group-hover:text-white absolute';
     videoIcon.style.transform = 'translate(-50%, -50%) scale(1.5)';
     videoIcon.style.top = '50%';
     videoIcon.style.left = '50%';

     const videoInput = document.createElement('input');
     videoInput.type = 'file';
     videoInput.accept = 'video/*';
     videoInput.className = 'file-input bg-gray-800 z-[999] w-full opacity-0 cursor-pointer absolute h-full right-0 top-0 text-white p-2 rounded';

     videoInputWrapper.appendChild(videoIcon);
     videoInputWrapper.appendChild(videoInput);

     inputContainer.appendChild(audioInputWrapper);
     inputContainer.appendChild(videoInputWrapper);

     return inputContainer;
}