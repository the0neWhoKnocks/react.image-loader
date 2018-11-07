import React, { Fragment } from 'react';
import { render } from 'react-dom';
import ImageLoader from '../../src';


/**
 * Simple loader overlay example
 */
const LoaderOverlay = () => (
  <img src="./imgs/loader-corgi.gif" />
);

/**
 * Simple Component wrapper
 */
const App = () => (
  <Fragment>
    <div className={'images-wrapper'}>
      <ImageLoader
        LoaderOverlay={LoaderOverlay}
        src="./imgs/corgi-hi-res-full.jpg"
      />
    </div>
    <footer>
      I don&apos;t own the image used here, found it on
      <a href="http://seattlerefined.com/lifestyle/photos-corgis-only-short-legs-cute-butts-gather-at-annual-pnw-corgi-picnic">this site</a>.
    </footer>
  </Fragment>
);

render(<App />, document.getElementById('root'));
