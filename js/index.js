const getElement = inputId => document.querySelector(inputId);
const $video = getElement('#video');
const $play = getElement('#play');
const $pause = getElement('#pause');
const $backward = getElement('#backward');
const $forward = getElement('#forward');
const $volume = getElement('#volume');
const $resize = getElement('#resize');
const $progressVolume = getElement('#progress-volume');
const $iconVolume = getElement('#icon-volume');
const $iconResize = getElement('#icon-resize');
const $progress = getElement('#progress');

const listIconsVolume = Array('fa-volume-mute', 'fa-volume-down', 'fa-volume-up');
const listIconsResize = Array('fa-expand', 'fa-compress');
let auxVolumen = $video.volume;

$play.addEventListener('click', handlePlay);
$pause.addEventListener('click', handlePause);
$backward.addEventListener('click', handleBackward);
$forward.addEventListener('click', handleForward);
$volume.addEventListener('click', handleMutedVolume);
$resize.addEventListener('click', handleResize);
$progressVolume.addEventListener('input', handleIconVolume);
$video.addEventListener('loadedmetadata', handleLoaded);
$video.addEventListener('timeupdate', handleTimeUpdate);
$progress.addEventListener('input', handleRangeProgress);

function handleMutedVolume() {
  const progressCurrentVolume = Number($progressVolume.value)
  if (progressCurrentVolume > 0) {
    setIconVolume(listIconsVolume[0])
    $video.volume = 0
    $progressVolume.value = 0
  } else {
    auxVolumen = auxVolumen == 0 ? 1 : auxVolumen
    $video.volume = auxVolumen
    $progressVolume.value = auxVolumen
    handleIconVolume()
  }
}

function setIconVolume(currentIcon) {
  listIconsVolume.forEach(icon => {
    if (icon != currentIcon) {
      $iconVolume.classList.remove(icon)
    } else {
      $iconVolume.classList.add(icon)
    }
  })
}

function handleIconVolume() {
  const currentVolume = Number($progressVolume.value);
  if (currentVolume == 0) {
    setIconVolume(listIconsVolume[0])
  } else if (currentVolume > 0 && currentVolume <= 0.5) {
    setIconVolume(listIconsVolume[1])
  } else {
    setIconVolume(listIconsVolume[2])
  }
  auxVolumen = currentVolume
  $video.volume = currentVolume
}

function setIconResize(currentIcon) {
  listIconsResize.forEach(icon => {
    if (icon != currentIcon) {
      $iconResize.classList.remove(icon)
    } else {
      $iconResize.classList.add(icon)
    }
  })
}

function handleResize() {
  const $body = getElement('body')
  if (!document.fullscreenElement) {
    setIconResize(listIconsResize[1]);
    document.documentElement.requestFullscreen();
    $body.classList.add('full-screen')
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      $body.classList.remove('full-screen')
      setIconResize(listIconsResize[0])
    }
  }
}

function handlePlay() {
  $video.play();
  $play.hidden = true;
  $pause.hidden = false;
}

function handlePause() {
  $video.pause();
  $play.hidden = false;
  $pause.hidden = true;
}

function handleBackward() {
  $video.currentTime -= 10;
}

function handleForward() {
  $video.currentTime += 10;
}




let videoDuration = 0 
function handleLoaded() {
  $progress.max = $video.duration;
  videoDuration = $video.duration;
}

function handleTimeUpdate() {
  $progress.value = $video.currentTime;
  if ($progress.value == videoDuration) {
    $play.hidden = false;
    $pause.hidden = true; 
  }
}


function handleRangeProgress() {
  $video.currentTime = $progress.value;
}
