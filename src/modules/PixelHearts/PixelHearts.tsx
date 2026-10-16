import React from 'react';
import './PixelHearts.scss';
import heartImage from './Heart.svg';
import soundFile from './8bitLIKE.mp3';

const playChiptuneSound = () => {
  try {
    const audio = new Audio(soundFile);
    audio.volume = 0.4;
    audio.play().catch((e) => {
      console.warn('Audio play blocked or failed:', e);
    });
  } catch (e) {
    console.error('Audio error:', e);
  }
};

export const PixelHearts = (event: React.MouseEvent<HTMLElement>) => {
  if (!event || !event.currentTarget) return;

  const target = event.currentTarget as HTMLElement;
  playChiptuneSound();

  const rect = target.getBoundingClientRect();
  const startX = rect.left + rect.width / 2;
  const startY = rect.top + rect.height / 2;

  const count = 12;

  for (let i = 0; i < count; i++) {
    const heart = document.createElement('img');

    heart.src = heartImage;
    heart.className = 'pixel-heart-particle';
    heart.style.left = `${startX}px`;
    heart.style.top = `${startY}px`;

    document.body.appendChild(heart);

    const angle = (Math.PI * 2 / count) * i + (Math.random() - 0.5) * 0.5;
    const velocity = 50 + Math.random() * 60;
    const destinationX = Math.cos(angle) * velocity;
    const destinationY = Math.sin(angle) * velocity - 45;

    const animation = heart.animate([
      { transform: 'translate(-50%, -50%) scale(0.4)', opacity: 0 },
      { transform: 'translate(-50%, -50%) scale(1.2)', opacity: 1, offset: 0.2 },
      { transform: `translate(calc(-50% + ${destinationX}px), calc(-50% + ${destinationY}px)) scale(1)`, opacity: 1, offset: 0.7 },
      { transform: `translate(calc(-50% + ${destinationX * 1.2}px), calc(-50% + ${destinationY + 30}px)) scale(0.8)`, opacity: 0 }
    ], {
      duration: 750,
      easing: 'cubic-bezier(0.25, 1, 0.5, 1)'
    });

    animation.onfinish = () => heart.remove();
  }
};
