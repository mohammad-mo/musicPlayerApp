const musicContainer = document.querySelector('.music-container')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-container')
const title = document.querySelector('#title')
const cover = document.querySelector('#cover')

// Song titles
const songs = ['Rain', 'Beach', 'In The Forest Ambient']

// Keep track of songs
let songIndex = 0

// Update song detailes
const loadSong = (song) =>
{
    title.innerText = song
    audio.src = `sounds/${song}.mp3`
    cover.src = `images/${song}.jpg`
}

// Initially load song info DOM
loadSong(songs[songIndex])

const playSong = () =>
{
    musicContainer.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')

    audio.play()
}

const pauseSong = () =>
{
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')
    playBtn.querySelector('i.fas').classList.add('fa-play')

    audio.pause()
}

const prevSong = () =>
{
    songIndex--

    if (songIndex < 0)
    {
        songIndex = songs.length - 1
    }

    loadSong(songs[songIndex])

    playSong()
}

const nextSong = () =>
{
    songIndex++

    if (songIndex > songs.length - 1)
    {
        songIndex = 0
    }

    loadSong(songs[songIndex])

    playSong()
}

const updateProgress = (event) =>
{
    const {duration, currentTime} = event.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
}

function setProgress(event)
{
    const width = this.clientWidth
    const clickX = event.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration
}

// Event listeners
playBtn.addEventListener('click', () =>
{
    const isPlaying = musicContainer.classList.contains('play')

    if (isPlaying)
    {
        pauseSong()
    }
    else
    {
        playSong()
    }
})

// Changes Song events
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

audio.addEventListener('timeupdate', updateProgress)

// For clicking on the progressbar
progressContainer.addEventListener('click', setProgress)

audio.addEventListener('ended', nextSong)