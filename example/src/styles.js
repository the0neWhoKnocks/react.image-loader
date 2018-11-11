import { css } from 'glamor';

const pulse = css.keyframes({
  '0%': {
    transform: 'translate(-50%, -50%) scale(0.9)',
    opacity: 0,
  },
  '50%': {
    transform: 'translate(-50%, -50%) scale(1)',
    opacity: 1,
  },
  '100%': {
    transform: 'translate(-50%, -50%) scale(0.9)',
    opacity: 0,
  },
});
const tiltHead = css.keyframes({
  '0%': {
    transform: 'translate(-50%, -50%)',
  },
  '24%,26%': {
    transform: 'translate(-50%, -50%) rotate(20deg)',
  },
  '48%,51%': {
    transform: 'translate(-50%, -50%)',
  },
  '74%,76%': {
    transform: 'translate(-50%, -50%) rotate(-20deg)',
  },
  '100%': {
    transform: 'translate(-50%, -50%)',
  },
});
const fadeIn = css.keyframes({
  '0%': {
    opacity: 0,
  },
  '100%': {
    opacity: 1,
  },
});

export default {
  imgWrapper: css({
    marginTop: '0.5em',
    overflow: 'hidden',
    position: 'relative',

    '::before': {
      content: '""',
      width: '100%',
      display: 'block',
    },
    /**
     * Aspect ratios (paddingTop) are determined by calculating
     * `(height / width) * 100`. These values are hardcoded for this use case
     * since there are a limited set of images to deal with.
     */
    '.is--full': {
      maxWidth: '1364px',

      '::before': {
        paddingTop: '80%',
      },
    },
    '.is--banner': {
      maxWidth: '1384px',

      '::before': {
        paddingTop: '49%',
      },
    },
    '.is--portrait': {
      maxWidth: '633px',

      '::before': {
        paddingTop: '100%',
      },
    },

    '> .image-loader': {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  }),

  imgLoader: css({
    ' img': {
      width: '100%',
    },
  }),

  overlay: css({
    background: '#eee',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    pointerEvents: 'none',
    animation: `${ fadeIn } 1s forwards`,

    ' .overlay__icon': {
      width: '30%',
      maxWidth: '100px',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transformOrigin: 'center',
    },
    '.is--indicator .overlay__icon': {
      animation: `${ pulse } 2s infinite`,
    },
    '.is--error': {
      ' .overlay__msg': {
        color: '#b50d00',
        fontWeight: 'bold',
        position: 'absolute',
        top: '32%',
        left: '50%',
        transform: 'rotate(10deg)',
      },

      ' .overlay__icon': {
        fill: '#b50d00',
        animation: `${ tiltHead } 6s infinite`,
      },
    },
  }),
};
