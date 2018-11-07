import { css } from 'glamor';

const styles = {
  img: css({
    width: '100%',
    display: 'block',
    opacity: 0,
    transition: 'opacity 0.25s',

    '.is--loaded': {
      opacity: 1,
    },
  }),
};

export default styles;
