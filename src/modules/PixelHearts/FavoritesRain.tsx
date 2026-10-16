import './FavoritesRain.scss';
import heartSvg from './Heart.svg';
import soundFile from './8bitMAGIC.mp3';

// тут  функція яка запускає звук
const playFavoritesIntroSound = () => {
  try {
    const audio = new Audio(soundFile);
    audio.volume = 0.4;
    audio.play().catch(e => {
      console.warn('Audio play blocked or failed!!!!!', e);
    });
  } catch (e) {
    console.error('Audio error!!!!!', e);
  }
};

// тут сердечка
export default function FavoritesRain() {
  useEffect(() => {
    playFavoritesIntroSound();

    const container = document.createElement('div');
    container.className = 'favorites-rain-container';
    document.body.appendChild(container);

    const startTime = Date.now();
    const maxDuration = 1500; //

    const interval = setInterval(() => {
      if (Date.now() - startTime >= maxDuration) {
        clearInterval(interval);
        return;
      }

      for (let i = 0; i < 4; i++) {
        const heart = document.createElement('img');
        heart.src = heartSvg;
        heart.className = 'floating-pixel-heart';

        const randomX = Math.random() * window.innerWidth;
        const duration = 0.8 + Math.random() * 0.4;

        heart.style.left = `${randomX}px`;
        heart.style.animationDuration = `${duration}s`;

        container.appendChild(heart);

        setTimeout(() => {
          heart.remove();
        }, duration * 1000);
      }
    }, 60);

    const cleanupTimeout = setTimeout(() => {
      container.remove();
    }, 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(cleanupTimeout);
      container.remove();
    };
  }, []);

  return null;
}
