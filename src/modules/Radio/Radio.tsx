import { useState, useRef } from 'react';
import styles from './Radio.module.scss';
import musicBoxIcon from './musicbox.svg';
import noteIcon from './note.png';
import note2Icon from './note2.png';
import note3Icon from './note3.png';

import minecraftAudio from './minecraft.mp3';
import minecraft2Audio from './minecraft2.mp3';
import minecraft3Audio from './minecraft3.mp3';
import { playClickSound } from '../PixelHearts/sounds';

export const Radio = () => {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  const radioAudioRef = useRef<HTMLAudioElement | null>(null);
  const local1AudioRef = useRef<HTMLAudioElement | null>(null);
  const local2AudioRef = useRef<HTMLAudioElement | null>(null);
  const local3AudioRef = useRef<HTMLAudioElement | null>(null);

  const audioRefs = [radioAudioRef, local1AudioRef, local2AudioRef, local3AudioRef];

  const tracks = [
    { icon: musicBoxIcon, alt: 'Radio Stream' },
    { icon: noteIcon, alt: 'Local Track 1' },
    { icon: note2Icon, alt: 'Local Track 2' },
    { icon: note3Icon, alt: 'Local Track 3' },
  ];

  const stopAllExcept = (targetIndex: number) => {
    audioRefs.forEach((ref, index) => {
      if (index !== targetIndex && ref.current) {
        ref.current.pause();
      }
    });
  };

  const toggleTrack = (index: number) => {
    const currentRef = audioRefs[index].current;
    if (!currentRef) return;

    if (playingIndex === index) {
      currentRef.pause();
      setPlayingIndex(null);
    } else {
      stopAllExcept(index);

      if (index === 0) {
        currentRef.load();
      }

      currentRef
        .play()
        .then(() => setPlayingIndex(index))
        .catch((error) => {
          console.error(`Playback error on track ${index}:`, error);
          setPlayingIndex(null);
        });
    }
  };


  const activeIndex = playingIndex !== null ? playingIndex : 0;

  return (
    <div className={styles.container}>
      <audio
        ref={radioAudioRef}
        src="https://stream.zeno.fm/f3wvbbqmdg8uv"
        preload="none"
        crossOrigin="anonymous"
      />
      <audio ref={local1AudioRef} src={minecraftAudio} preload="auto" loop />
      <audio ref={local2AudioRef} src={minecraft2Audio} preload="auto" loop />
      <audio ref={local3AudioRef} src={minecraft3Audio} preload="auto" loop />

      <div className={styles.wrapper}>
        {tracks.map((track, index) => {
          const isPlaying = playingIndex === index;
          const isActive = index === activeIndex;

          return (
            <button
              key={index}
              type="button"
              className={`
                ${styles.button}
                ${isPlaying ? styles.playing : ''}
                ${isActive ? styles.active : ''}
              `}
              onClick={() => {
                playClickSound()
                toggleTrack(index)}}
              aria-label={track.alt}
            >
              <img src={track.icon} alt={track.alt} className={styles.icon} />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Radio;
