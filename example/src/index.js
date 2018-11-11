import React, { Fragment } from 'react';
import { render } from 'react-dom';
import ImageLoader from '../../src';
import styles from './styles';


/**
 * Example Indicator
 */
const Indicator = () => (
  <div className={`overlay ${ styles.overlay } is--indicator`}>
    <svg className="overlay__icon">
      <use
        xmlnsXlink="http://www.w3.org/1999/xlink"
        xlinkHref="#dog-icon"
      />
    </svg>
  </div>
);
/**
 * Example ErrorOverlay
 */
const ErrorOverlay = () => (
  <div className={`overlay ${ styles.overlay } is--error`}>
    <div className="overlay__msg">Ruh-Roh!</div>
    <svg className="overlay__icon">
      <use
        xmlnsXlink="http://www.w3.org/1999/xlink"
        xlinkHref="#sad-dog-icon"
      />
    </svg>
  </div>
);

/**
 * Example App
 */
const App = () => (
  <Fragment>
    <div className={'images-wrapper'}>
      <div className={`image-wrapper ${ styles.imgWrapper } is--full`}>
        <ImageLoader
          LoadingIndicator={Indicator}
          src="./imgs/corgi-hi-res-full.jpg"
        />
      </div>
      <div className={`image-wrapper ${ styles.imgWrapper } is--banner`}>
        <ImageLoader
          LoadingIndicator={Indicator}
          src="./imgs/corgi-hi-res-banner.jpg"
        />
      </div>
      <div className={`image-wrapper ${ styles.imgWrapper } is--portrait`}>
        <ImageLoader
          LoadingIndicator={Indicator}
          src="./imgs/corgi-hi-res-portrait.jpg"
        />
      </div>
      <div className={`image-wrapper ${ styles.imgWrapper } is--portrait`}>
        <ImageLoader
          ErrorOverlay={ErrorOverlay}
          LoadingIndicator={Indicator}
          src="./imgs/missing-image.jpg"
        />
      </div>
    </div>
  </Fragment>
);

render(<App />, document.getElementById('root'));
