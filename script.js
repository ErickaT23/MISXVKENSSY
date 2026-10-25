const eventDate = new Date('2026-11-06T18:00:00-06:00').getTime();
const units = { days: 86400000, hours: 3600000, minutes: 60000, seconds: 1000 };
function updateCountdown() {
  const difference = Math.max(0, eventDate - Date.now());
  Object.entries(units).forEach(([name, unit]) => {
    const element = document.getElementById(name);
    element.textContent = String(Math.floor(difference / unit) % (name === 'days' ? Infinity : unit === 86400000 ? 1 : unit === 3600000 ? 24 : 60)).padStart(2, '0');
  });
  document.getElementById('days').textContent = String(Math.floor(difference / units.days)).padStart(2, '0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

const music = document.getElementById('music');
const musicButton = document.getElementById('musicButton');
const musicProgress = document.getElementById('musicProgress');
const currentTime = document.getElementById('currentTime');
const duration = document.getElementById('duration');
const formatTime = (seconds) => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;
musicButton.addEventListener('click', async () => {
  if (music.paused) { await music.play(); musicButton.textContent = 'Ⅱ'; }
  else { music.pause(); musicButton.textContent = '▶'; }
});
music.addEventListener('loadedmetadata', () => { duration.textContent = formatTime(music.duration); });
music.addEventListener('timeupdate', () => { currentTime.textContent = formatTime(music.currentTime); musicProgress.value = music.duration ? music.currentTime / music.duration * 100 : 0; });
musicProgress.addEventListener('input', () => { music.currentTime = music.duration * musicProgress.value / 100; });

setTimeout(() => {
  const scrollLink = document.querySelector('.scroll-link');
  if (!scrollLink) return;
  scrollLink.classList.add('expired');
  setTimeout(() => scrollLink.remove(), 700);
}, 10000);

window.addEventListener('scroll', () => {
  const bubble = document.querySelector('.scroll-link');
  if (bubble) bubble.style.setProperty('--parallax', `${Math.min(window.scrollY * 0.08, 18)}px`);
  document.querySelector('.music-player')?.style.setProperty('--player-parallax', `${Math.min(window.scrollY * 0.025, 10)}px`);
}, { passive: true });
