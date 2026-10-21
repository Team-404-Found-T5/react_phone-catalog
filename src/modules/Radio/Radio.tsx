import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styles from './Radio.module.scss';
import musicBoxIcon from './musicbox.svg';
import noteIcon from './note.png';
import note2Icon from './note2.png';
import note3Icon from './note3.png';

import minecraftAudio from './minecraft.mp3';
import minecraft2Audio from './minecraft2.mp3';
import minecraft3Audio from './minecraft3.mp3';
import { playClickSound } from '../PixelHearts/sounds';

const DEFAULT_TRACK_INDEX = 2;

export const Radio = () => {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [isHidden, setIsHidden] = useState(false);

  const radioAudioRef = useRef<HTMLAudioElement | null>(null);
  const local1AudioRef = useRef<HTMLAudioElement | null>(null);
  const local2AudioRef = useRef<HTMLAudioElement | null>(null);
  const local3AudioRef = useRef<HTMLAudioElement | null>(null);

  const audioRefs = useMemo(
    () => [radioAudioRef, local1AudioRef, local2AudioRef, local3AudioRef],
    [],
  );

  useEffect(() => {
    const handleMenuVisibility = (event: Event) => {
      const { isOpen } = (event as CustomEvent<{ isOpen: boolean }>).detail;

      if (isOpen) {
        audioRefs.forEach(ref => ref.current?.pause());
        setPlayingIndex(null);
      }

      setIsHidden(isOpen);
    };

    window.addEventListener('mobile-menu-visibility', handleMenuVisibility);

    return () =>
      window.removeEventListener(
        'mobile-menu-visibility',
        handleMenuVisibility,
      );
  }, [audioRefs]);

  const stopAllExcept = useCallback(
    (targetIndex: number) => {
      audioRefs.forEach((ref, index) => {
        if (index !== targetIndex && ref.current) {
          ref.current.pause();
        }
      });
    },
    [audioRefs],
  );

  const playTrack = useCallback(
    (index: number) => {
      const currentAudio = audioRefs[index].current;

      if (!currentAudio) {
        return;
      }

      stopAllExcept(index);

      if (index === 0) {
        currentAudio.load();
      }

      currentAudio
        .play()
        .then(() => setPlayingIndex(index))
        .catch((error: unknown) => {
          console.error(`Playback error on track ${index}:`, error);
          setPlayingIndex(null);
        });
    },
    [audioRefs, stopAllExcept],
  );

  const tracks = [
    { icon: musicBoxIcon, alt: 'Radio Stream' },
    { icon: noteIcon, alt: 'Local Track 1' },
    { icon: note2Icon, alt: 'Local Track 2' },
    { icon: note3Icon, alt: 'Local Track 3' },
  ];

  const toggleTrack = (index: number) => {
    const currentRef = audioRefs[index].current;

    if (!currentRef) {
      return;
    }

    if (playingIndex === index) {
      currentRef.pause();
      setPlayingIndex(null);
    } else {
      playTrack(index);
    }
  };

  const activeIndex =
    playingIndex !== null ? playingIndex : DEFAULT_TRACK_INDEX;

  return (
    <div
      className={styles.container}
      aria-hidden={isHidden}
      data-radio-control="true"
    >
      {/* These audio tracks are decorative music controls and have no spoken content. */}
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio
        ref={radioAudioRef}
        src="https://stream.zeno.fm/f3wvbbqmdg8uv"
        preload="none"
        crossOrigin="anonymous"
      />
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={local1AudioRef} src={minecraftAudio} preload="auto" loop />
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={local2AudioRef} src={minecraft2Audio} preload="auto" loop />
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={local3AudioRef} src={minecraft3Audio} preload="auto" loop />

      <div className={styles.wrapper}>
        {tracks.map((track, index) => {
          const isPlaying = playingIndex === index;
          const isActive = index === activeIndex;

          return (
            <button
              key={index}
              type="button"
              className={` ${styles.button} ${isPlaying ? styles.playing : ''} ${isActive ? styles.active : ''} `}
              onClick={() => {
                playClickSound();
                toggleTrack(index);
              }}
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
