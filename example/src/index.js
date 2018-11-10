import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { bool } from 'prop-types';
import { css } from 'glamor';
import ImageLoader from '../../src';

const pulse = css.keyframes({
  '0%': {
    transformOrigin: 'center',
    transform: 'translate(-50%, -50%) scale(0.9)',
    opacity: 0,
  },
  '50%': {
    transformOrigin: 'center',
    transform: 'translate(-50%, -50%) scale(1)',
    opacity: 1,
  },
  '100%': {
    transformOrigin: 'center',
    transform: 'translate(-50%, -50%) scale(0.9)',
    opacity: 0,
  },
});
const styles = {
  imgWrapper: css({
    position: 'relative',

    '.is--sml': {
      width: '80px',
      // height: '80px',
    },

    '.is--mdm': {
      width: '160px',
      // height: '160px',
    },

    '.is--lrg': {
      width: '220px',
      // height: '220px',
    },
  }),

  imgLoader: css({
    ' img': {
      width: '100%',
    },
  }),

  loaderOverlay: css({
    background: '#eee',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    pointerEvents: 'none',
    transition: 'opacity 1s',
    opacity: 0,

    ' .loader-overlay__img': {
      width: '30%',
      maxWidth: '100px', // width of image
      position: 'absolute',
      top: '50%',
      left: '50%',
      transformOrigin: 'center',
      transform: 'translate(-50%, -50%)',
      animation: `${ pulse } 2s infinite`,
    },

    '.is--visible': {
      opacity: 1,
    },
  }),
};

/**
 * Simple loader overlay example
 */
const LoaderOverlay = ({ visible }) => {
  const isVisible = (visible) ? ' is--visible' : '';

  return (
    <div className={`loader-overlay ${ styles.loaderOverlay }${ isVisible }`}>
      <img className="loader-overlay__img" src="./imgs/loader-corgi.gif" />
    </div>
  );
};
LoaderOverlay.propTypes = {
  visible: bool,
};

/**
 * Simple Component wrapper
 */
const App = () => (
  <Fragment>
    {/*
    <div className={`${ styles.imgWrapper } is--sml`}><LoaderOverlay /></div>
    <div className={`${ styles.imgWrapper } is--mdm`}><LoaderOverlay /></div>
    <div className={`${ styles.imgWrapper } is--lrg`}><LoaderOverlay /></div>
    */}
    <div className={'images-wrapper'}>
      <div className={`image-wrapper ${ styles.imgWrapper } is--lrg`}>
        <ImageLoader
          className={`loader ${ styles.imgLoader }`}
          LoaderOverlay={LoaderOverlay}
          src="./imgs/corgi-hi-res-full.jpg"
        />
      </div>
    </div>
  </Fragment>
);

render(<App />, document.getElementById('root'));
