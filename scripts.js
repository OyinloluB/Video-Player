const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

function togglePlay() {
  video[video.paused ? "play" : "pause"]();
}

function updateIcon() {
  const icon = this.paused ? "►" : "❚ ❚"; //this refers to the video the paused property is bound to
  toggle.textContent = icon;
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
  console.log(this.dataset); //this refers to the video which the dataset is bound to
}

function range() {
  video[this.name] = this.value;
}

function progressUpdate() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

video.addEventListener("click", togglePlay);
video.addEventListener("play", updateIcon);
video.addEventListener("pause", updateIcon);
video.addEventListener("timeupdate", progressUpdate);
skipButtons.forEach((skipButton) => skipButton.addEventListener("click", skip)); //looping through each data-kip attribute present
ranges.forEach((range) => range.addEventListener("change", range));
ranges.forEach((range) => range.addEventListener("mousemove", range));
let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
