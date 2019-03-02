import React, { Component, Fragment } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { arrayOf, func, number, shape, string } from 'prop-types';
import { checkIfImageCached, loadImage } from './utils';
import styles, {
  MODIFIER__LOADED,
  ROOT_CLASS,
} from './styles';

const tempImg = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

/* eslint-disable-next-line */
const NoScript = ({ children }) => (
  <noscript dangerouslySetInnerHTML={{
    __html: renderToStaticMarkup(children),
  }} />
);

/**
 * A Component that preloads `img` or `picture` tags.
 */
class ImageLoader extends Component {
  /**
   * If Chrome detects a `source` it'll now try to pre-load it, causing
   * the proxy `tempImg` not to be used which then collapses the image
   * container. Supplying a temorary Array of empty sources allows us to get
   * around that.
   *
   * @param {Array} sources - Current picture sources
   * @return {Array}
   */
  static buildEmptySources(sources) {
    return sources.map((v, ndx) => ({ media: ndx, srcSet: '' }));
  }
  
  /**
   * For `picture` elements find the currently matched source, and check if
   * that's been loaded instead. Further loads (after a resize), will be
   * handled by the Browser.
   *
   * @param {Array} src - Current img source
   * @param {Array} sources - Current picture sources
   * @return {String}
   */
  static getMatchedSource(src, sources) {
    let matchedSource = src;
    
    for(let i=0; i<sources.length; i++){
      const source = sources[i];

      if( window.matchMedia(source.media).matches ){
        matchedSource = source.srcSet;
        break;
      }
    }
    
    return matchedSource;
  }
  
  constructor({
    sources,
    src,
  }) {
    super();
    
    this.state = {
      error: false,
      loaded: false,
      mounted: false,
      revealImage: false,
      showIndicator: false,
      src: src,
    };
    
    this.emptySources = ImageLoader.buildEmptySources(sources);
  }

  componentDidMount() {
    this.mounted = true;
    
    this.updateState({
      src: ImageLoader.getMatchedSource(this.state.src, this.props.sources),
    }, this.loadSources);
  }

  componentDidUpdate(prevProps, prevState) {
    // If new sources were passed in, those take priority
    const { sources: currentSources, src: currentSrc } = this.props;
    const prevSrc = prevProps.src;
    const prevSources = prevProps.sources;
    const propSourcesMatch = JSON.stringify(prevSources) === JSON.stringify(currentSources);
    const currState = {};
    
    if( prevSrc !== currentSrc ) currState.src = currentSrc;
    if( !propSourcesMatch ){
      currState.sources = currentSources;
      this.emptySources = ImageLoader.buildEmptySources(currentSources);
      currState.src = ImageLoader.getMatchedSource(currentSrc, currentSources);
    }
    if( currState.src || currState.sources ){
      currState.loaded = false;
      currState.revealImage = false;
    }
    
    if(Object.keys(currState).length)
      this.updateState(currState, this.loadSources);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(
      this.state.error !== nextState.error
      || this.state.loaded !== nextState.loaded
      || this.state.src !== nextProps.src
      || this.state.showIndicator !== nextState.showIndicator
    ) return true;
    if( this.state.revealImage === nextState.revealImage ) return false;

    return true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  /**
   * Handles whether or not to start loading an image, or display the cached
   * version of the image.
   */
  loadSources() {
    const {
      src,
    } = this.state;

    ( checkIfImageCached(src) )
      ? this.handleLoadedImage()
      : this.startLoadingImage(src);
  }

  /**
   * Ensures that on older browsers like IE11, the default `img` will use the
   * correct image source based on the current media query.
   *
   * @param {Object} state - New state
   * @param {Function} cb - Callback after state has updated
   */
  updateState(state, cb) {
    this.setState(state, cb);
  }

  /**
   * Starts the image load, and ensures the indicator doesn't display unless
   * the specified delay has run it's course.
   *
   * @param {String} imgSrc - Image URL
   */
  startLoadingImage(imgSrc) {
    loadImage(imgSrc, this.handleLoadedImage.bind(this));

    this.indicatorDelay = setTimeout(() => {
      if( !this.state.loaded ){
        this.setState({
          showIndicator: true,
        });
      }
    }, this.props.indicatorDelay);
  }

  /**
   * Handles the loaded image and sets props that allow for animation.
   */
  handleLoadedImage(ev) {
    if( this.mounted ){
      // `ev` won't be defined when image is cached
      if( !ev || ev.type === 'load' ){
        this.setState({
          loaded: true,
        }, () => {
          /**
          * We have to wait until the image source has been set before we can
          * animate it via CSS.
          */
          window.requestAnimationFrame(() => {
            if( this.mounted ){
              this.setState({
                revealImage: true,
              });
            }
          });
        });
      }
      else{
        this.setState({
          error: true,
        });
      }
    }
  }
  
  /**
   * Renders a `noscript`, and lazy loadable version of an `img` element.
   * 
   * @param {Object} props - The props needed to render the element.
   * @return {Function}
   */
  renderImg({
    alt,
    imgClass,
    noscriptImgClass,
    noscriptSrc,
    src,
  }) {
    /* eslint-disable-next-line */
    const img = (className, src) => (
      <img className={className} src={src} alt={alt} />
    );
    
    return (
      <Fragment>
        <NoScript>{img(noscriptImgClass, noscriptSrc)}</NoScript>
        {img(imgClass, src)}
      </Fragment>
    );
  }
  
  /**
   * Renders a `noscript`, and lazy loadable version of a `picture` element.
   * 
   * @param {Object} props - The props needed to render the element.
   * @return {Function}
   */
  renderPicture({
    alt,
    imgClass,
    noscriptImgClass,
    noscriptSrc,
    sources,
    src,
  }) {
    /* eslint-disable-next-line */
    const pic = (className, src) => (
      <picture>
        {sources.map(({ media, srcSet }) => (
          <source
            key={media}
            srcSet={srcSet}
            media={media}
          />
        ))}
        <img className={className} src={src} alt={alt} />
      </picture>
    );
    
    return (
      <Fragment>
        <NoScript>{pic(noscriptImgClass, noscriptSrc)}</NoScript>
        {pic(imgClass, src)}
      </Fragment>
    );
  }

  render() {
    const {
      error,
      loaded,
      revealImage,
      showIndicator,
    } = this.state;
    const {
      alt,
      className,
      ErrorOverlay,
      LoadingIndicator,
      sources: actualSources,
      src,
    } = this.props;
    const currSrc = (loaded) ? src : tempImg;
    const baseImgClass = `${ ROOT_CLASS }__image`;
    const imgClass = `${ baseImgClass }${ (revealImage) ? ` ${ MODIFIER__LOADED }` : '' }`;
    const noscriptImgClass = `${ baseImgClass } ${ MODIFIER__LOADED }`;
    const addIndicator = LoadingIndicator && showIndicator;
    const addError = ErrorOverlay && error;
    const sharedOpts = {
      alt,
      imgClass,
      noscriptImgClass,
      src: currSrc,
    };
    let rootModifier = '';
    let sources = this.emptySources;
    
    if(revealImage) rootModifier = MODIFIER__LOADED;
    // NOTE - Once the image has loaded, we can swap out the proxy sources with
    // the real ones to support responsive behavior.
    if(loaded) sources = actualSources;
    
    return (
      <div className={`${ ROOT_CLASS } ${ styles } ${ className } ${ rootModifier }`}>
        {addIndicator && (
          <div className={`${ ROOT_CLASS }__indicator-wrapper`}>
            <LoadingIndicator />
          </div>
        )}
        {addError && (
          <div className={`${ ROOT_CLASS }__error-wrapper`}>
            <ErrorOverlay />
          </div>
        )}
        {!!sources.length && this.renderPicture({
          ...sharedOpts,
          sources,
        })}
        {!sources.length && this.renderImg({
          ...sharedOpts,
          noscriptSrc: src,
        })}
      </div>
    );
  }
}

ImageLoader.defaultProps = {
  className: '',
  indicatorDelay: 300,
  sources: [],
};
ImageLoader.propTypes = {
  alt: string,
  className: string,
  ErrorOverlay: func,
  LoadingIndicator: func,
  indicatorDelay: number,
  sources: arrayOf(shape({
    media: string,
    srcSet: string,
  })),
  src: string,
};

export default ImageLoader;
export {
  tempImg,
};
