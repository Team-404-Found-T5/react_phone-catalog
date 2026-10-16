
import click from './CLICK.mp3'
import open from './OPENBOX.mp3'
import close from './BOXCLOSE.mp3'
import click2 from './CLICK2.wav'
import cart from './CARTADD.mp3'
import cartremove from './CARTREMOVE.mp3'
import plus from './Plus.mp3'
import minus from './Minus.mp3'
import cancel from './CANCEL.mp3'
import victory from './VICTORY.wav'
import fshuh from './FSHUH.mp3'








export const playClickSound = () => {
  try {
    const audio = new Audio(click);
    audio.volume = 0.8;
    audio.play().catch((e) => {
      console.warn('Audio play blocked or failed!!!!!', e);
    });
  } catch (e) {
    console.error('Audio error!!!!!', e);
  }
};

export const playBoxOpenSound = () => {
  try {
    const audio = new Audio(open);
    audio.volume = 0.4;
    audio.play().catch((e) => {
      console.warn('Audio play blocked or failed!!!!!', e);
    });
  } catch (e) {
    console.error('Audio error!!!!!', e);
  }
};

export const playBoxCloseSound = () => {
  try {
    const audio = new Audio(close);
    audio.volume = 0.4;
    audio.play().catch((e) => {
      console.warn('Audio play blocked or failed!!!!!', e);
    });
  } catch (e) {
    console.error('Audio error!!!!!', e);
  }
};
export const playClick2Sound = () => {
  try {
    const audio = new Audio(click2);
    audio.volume = 0.4;
    audio.play().catch((e) => {
      console.warn('Audio play blocked or failed!!!!!', e);
    });
  } catch (e) {
    console.error('Audio error!!!!!', e);
  }
};
export const playCartAddSound = () => {
  try {
    const audio = new Audio(cart);
    audio.volume = 0.4;
    audio.play().catch((e) => {
      console.warn('Audio play blocked or failed!!!!!', e);
    });
  } catch (e) {
    console.error('Audio error!!!!!', e);
  }
};
export const playCartRemoveSound = () => {
  try {
    const audio = new Audio(cartremove);
    audio.volume = 0.4;
    audio.play().catch((e) => {
      console.warn('Audio play blocked or failed!!!!!', e);
    });
  } catch (e) {
    console.error('Audio error!!!!!', e);
  }
};
export const playPlusSound = () => {
  try {
    const audio = new Audio(plus);
    audio.volume = 0.25;
    audio.play().catch((e) => {
      console.warn('Audio play blocked or failed!!!!!', e);
    });
  } catch (e) {
    console.error('Audio error!!!!!', e);
  }
};
export const playMinusSound = () => {
  try {
    const audio = new Audio(minus);
    audio.volume = 0.25;
    audio.play().catch((e) => {
      console.warn('Audio play blocked or failed!!!!!', e);
    });
  } catch (e) {
    console.error('Audio error!!!!!', e);
  }
};
export const playCancelSound = () => {
  try {
    const audio = new Audio(cancel);
    audio.volume = 0.25;
    audio.play().catch((e) => {
      console.warn('Audio play blocked or failed!!!!!', e);
    });
  } catch (e) {
    console.error('Audio error!!!!!', e);
  }
};
export const playVictorySound = () => {
  try {
    const audio = new Audio(victory);
    audio.volume = 0.25;
    audio.play().catch((e) => {
      console.warn('Audio play blocked or failed!!!!!', e);
    });
  } catch (e) {
    console.error('Audio error!!!!!', e);
  }
};
export const playFshuhSound = () => {
  try {
    const audio = new Audio(fshuh);
    audio.volume = 0.4;
    audio.play().catch((e) => {
      console.warn('Audio play blocked or failed!!!!!', e);
    });
  } catch (e) {
    console.error('Audio error!!!!!', e);
  }
};
