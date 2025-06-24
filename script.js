document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const playPauseBtn = document.getElementById('play-pause-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    const songCover = document.getElementById('current-song-cover');
    const songTitle = document.getElementById('current-song-title');
    const songArtist = document.getElementById('current-song-artist');

    const progressBarWrapper = document.querySelector('.progress-bar-wrapper');
    const progressBar = document.getElementById('progress-bar');
    const currentTimeEl = document.getElementById('current-time');
    const totalDurationEl = document.getElementById('total-duration');

    const volumeSlider = document.getElementById('volume-slider');

    // Create Audio object
    const audio = new Audio();

    // Song data
    const songs = [
        {
            title: 'Forest Lullaby',
            artist: 'Lesfm',
            cover: 'assets/images/cover1.png',
            file: 'assets/music/music1.mp3'
        },
        {
            title: 'Lost in the City',
            artist: 'Cosmo Sheldrake',
            cover: 'assets/images/cover2.png',
            file: 'assets/music/music2.mp3'
        }
        // Add more songs here
    ];

    let currentSongIndex = 0;
    let isPlaying = false;

    // --- Functions ---

    // Load song details into the player
    function loadSong(song) {
        songCover.src = song.cover;
        songTitle.textContent = song.title;
        songArtist.textContent = song.artist;
        audio.src = song.file;
    }

    // Play the current song
    function playSong() {
        isPlaying = true;
        playPauseBtn.innerHTML = "<i class='bx bx-pause'></i>";
        audio.play();
    }

    // Pause the current song
    function pauseSong() {
        isPlaying = false;
        playPauseBtn.innerHTML = "<i class='bx bx-play'></i>";
        audio.pause();
    }

    // Go to the previous song
    function prevSong() {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        loadSong(songs[currentSongIndex]);
        playSong();
    }

    // Go to the next song
    function nextSong() {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        loadSong(songs[currentSongIndex]);
        playSong();
    }

    // Update progress bar and time display
    function updateProgress() {
        const { duration, currentTime } = audio;
        const progressPercent = (currentTime / duration) * 100;
        progressBar.style.width = `${progressPercent}%`;

        // Update time display
        totalDurationEl.textContent = formatTime(duration);
        currentTimeEl.textContent = formatTime(currentTime);
    }
    
    // Format time from seconds to MM:SS
    function formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    // Set progress bar on click
    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;
        audio.currentTime = (clickX / width) * duration;
    }


    // --- Event Listeners ---

    // Play/Pause button
    playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
    });

    // Previous and Next buttons
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);

    // Update progress bar as song plays
    audio.addEventListener('timeupdate', updateProgress);
    
    // Automatically play next song when current one ends
    audio.addEventListener('ended', nextSong);

    // Seek functionality
    progressBarWrapper.addEventListener('click', setProgress);
    
    // Volume control
    volumeSlider.addEventListener('input', (e) => {
        audio.volume = e.target.value;
    });

    // Initial load
    loadSong(songs[currentSongIndex]);
});