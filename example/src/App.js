import React, { Component, Fragment } from 'react';
import ImageLoader from '../../src';
import styles, {
  MOBILE_BP,
  BREAKPOINT_MOBILE_HIGH_RES,
  BREAKPOINT_MOBILE_LOW_RES,
  BREAKPOINT_DESKTOP_LOW_RES,
} from './styles';


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

const imgSrcs = {
  highRes: {
    BANNER: './imgs/corgi-hi-res-banner.jpg',
    FULL: './imgs/corgi-hi-res-full.jpg',
    PORTRAIT: './imgs/corgi-hi-res-portrait.jpg',
  },
  lowRes: {
    BANNER: './imgs/corgi-low-res-banner.jpg',
    FULL: './imgs/corgi-low-res-full.jpg',
    MISSING: './imgs/missing-image.jpg',
    PORTRAIT: './imgs/corgi-low-res-portrait.jpg',
  },
};

/**
 * Example App
 */
export default class App extends Component {
  constructor() {
    super();

    this.state = {
      mobileDevice: false,
      mounted: false,
    };

    this.determineDevice = this.determineDevice.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    this.determineDevice();
    window.addEventListener('resize', this.handleResize);

    this.setState({
      mounted: true,
    });
  }

  /**
   * Handles updating device type if the window is resized.
   * @param {Event} ev - resize
   */
  handleResize(ev) {
    if(this.debounce) clearTimeout(this.debounce);

    this.debounce = setTimeout(this.determineDevice, 50);
  }

  /**
   * Detects if on a mobile device
   */
  determineDevice() {
    if( window.matchMedia(MOBILE_BP).matches )
      this.setState({ mobileDevice: true });
    else if(this.state.mobileDevice)
      this.setState({ mobileDevice: false });
  }

  render() {
    const { mobileDevice } = this.state;

    const headerImgType = (mobileDevice) ? 'banner' : 'full';
    const headerImgTypeUC = headerImgType.toUpperCase();

    return (
      <Fragment>
        <div className={`images-wrapper ${ styles.imagesWrapper }`}>
          <div className={`${ styles.exampleWrapper }`}>
            <div className={`image-wrapper ${ styles.imageWrapper } is--${ headerImgType }`}>
              <ImageLoader
                LoadingIndicator={Indicator}
                sources={[
                  {
                    media: BREAKPOINT_DESKTOP_LOW_RES,
                    srcSet: imgSrcs.highRes[headerImgTypeUC],
                  },
                  {
                    media: BREAKPOINT_MOBILE_HIGH_RES,
                    srcSet: imgSrcs.highRes[headerImgTypeUC],
                  },
                  {
                    media: BREAKPOINT_MOBILE_LOW_RES,
                    srcSet: imgSrcs.lowRes[headerImgTypeUC],
                  },
                ]}
                src={imgSrcs.lowRes[headerImgTypeUC]}
              />
            </div>
            <div className={`description ${ styles.description } for--header-image`}>
              The first example is utilizing the <code>picture</code> tag so
              that on devices with <code>2.0</code> DPR (or higher) or
              a <code>1024px</code> viewing width, a high-resolution image will
              be used. On devices with <code>1.0</code> DPR, or a max viewing
              width of <code>1023px</code> a low-resoltuion image will be used.
            </div>
          </div>
          <div className={`row ${ styles.row }`}>
            <div className={`row__item image-wrapper ${ styles.imageWrapper } is--portrait`}>
              <ImageLoader
                LoadingIndicator={Indicator}
                src={(mobileDevice)
                  ? imgSrcs.lowRes.PORTRAIT
                  : imgSrcs.highRes.PORTRAIT
                }
              />
            </div>
            <div className={`row__item image-wrapper ${ styles.imageWrapper } is--portrait`}>
              <ImageLoader
                ErrorOverlay={ErrorOverlay}
                LoadingIndicator={Indicator}
                src={imgSrcs.lowRes.MISSING}
              />
            </div>
          </div>
          <div className={`description ${ styles.description }`}>
            The second example is using an <code>img</code> tag and swapping the
            source based on CSS breakpoints via Javascript. The third example
            shows what happens if an image fails to load and you pass in
            an <code>ErrorOverlay</code>.
          </div>
        </div>
      </Fragment>
    );
  }
}