let player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '360',
        width: '640',
        videoId: '', // Start with no video loaded
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

// Function to extract YouTube video ID from the URL
function getVideoIdFromUrl(url) {
    const urlObj = new URL(url);
    return urlObj.searchParams.get("v") || urlObj.pathname.split("/").pop();
}

// Function to load the video from the URL
function loadVideo() {
    const videoUrl = document.getElementById("videoUrl").value;
    const videoId = getVideoIdFromUrl(videoUrl);
    
    if (videoId) {
        player.loadVideoById(videoId);
    } else {
        alert("Please enter a valid YouTube URL.");
    }
}

function onPlayerReady(event) {
    document.getElementById('playButton').addEventListener('click', function() {
        player.playVideo();
    });
    document.getElementById('pauseButton').addEventListener('click', function() {
        player.pauseVideo();
    });
    document.getElementById('stopButton').addEventListener('click', function() {
        player.seekTo(0);
        player.pauseVideo();
    });
    document.getElementById('loadVideoButton').addEventListener('click', loadVideo);
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        const duration = player.getDuration();
        const interval = setInterval(() => {
            const currentTime = player.getCurrentTime();
            document.getElementById('currentTime').innerText = currentTime.toFixed(2);
            document.getElementById('duration').innerText = duration.toFixed(2);

            if (currentTime >= duration || event.data !== YT.PlayerState.PLAYING) {
                clearInterval(interval);
            }
        }, 1000);
    }
}

// Load YouTube Iframe API dynamically
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
