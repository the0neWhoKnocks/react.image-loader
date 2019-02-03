import { css } from 'glamor';

const styles = {
  imgLoader: css({
    position: 'relative',
    
    ':not(.is--mounted)': {
      
      ' noscript + img, noscript + picture': {
        display: 'none',
      },
    },
  }),

  img: css({
    width: '100%',
    display: 'block',
    opacity: 0,
    transition: 'opacity 0.5s',
    position: 'relative',

    '.is--loaded': {
      opacity: 1,
    },
  }),

  overlayWrapper: css({
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    pointerEvents: 'none',
  }),
};

export default styles;
