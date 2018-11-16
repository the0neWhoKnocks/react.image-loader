import React, { Component } from 'react';
import { arrayOf, func, number, shape, string } from 'prop-types';
import { checkIfImageCached, loadImage } from './utils';
import styles from './styles';

const tempImg = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

/**
 * A Component that preloads `img` or `picture` tags.
 */
class ImageLoader extends Component {
  static getDerivedStateFromProps(props, state) {
    const newState = {};

    if( JSON.stringify(state.sources) !== JSON.stringify(props.sources) )
      newState.sources = props.sources;
    if( state.src !== props.src )
      newState.src = props.src;
    if( newState.src || newState.sources ){
      newState.loaded = false;
      newState.revealImage = false;
    }

    return (Object.keys(newState).length) ? newState : null;
  }

  constructor(props) {
    super();

    this.state = {
      error: false,
      loaded: false,
      revealImage: false,
      showIndicator: false,
      sources: props.sources,
      src: props.src,
    };
  }

  componentDidMount() {
    this.mounted = true;
    this.loadSources();
  }

  componentDidUpdate(prevProps, prevState) {
    if(
      JSON.stringify(this.state.sources) !== JSON.stringify(prevState.sources)
      || this.state.src !== prevState.src
    ) {
      this.loadSources();
    }
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
      sources,
      src,
    } = this.state;
    let currSrc = src;

    // For `picture` elements find the currently matched source, and check if
    // that's been loaded instead. Further loads (after a resize), will be
    // handled by the Browser.
    if( sources ){
      for(let i=0; i<sources.length; i++){
        const source = sources[i];

        if( window.matchMedia(source.media).matches ){
          currSrc = source.srcSet;
          this.updateSourceFromQuery(currSrc);
          break;
        }
      }
    }

    ( checkIfImageCached(currSrc) )
      ? this.handleLoadedImage()
      : this.startLoadingImage(currSrc);
  }

  /**
   * Ensures that on older browsers like IE11, the default `img` will use the
   * correct image source based on the current media query.
   *
   * @param {String} src - Image URL
   */
  updateSourceFromQuery(src) {
    this.setState({ src });
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
      sources,
      src,
    } = this.props;
    const currSrc = (loaded) ? src : tempImg;
    const imgClass = `image-loader__image ${ styles.img }${ (revealImage) ? ' is--loaded' : '' }`;
    const userClass = (className) ? ` ${ className }` : '';
    const addIndicator = LoadingIndicator && showIndicator;
    const addError = ErrorOverlay && error;

    return (
      <div className={`image-loader ${ styles.imgLoader }${ userClass }`}>
        {addIndicator && (
          <div className={`image-loader__indicator-wrapper ${ styles.overlayWrapper }`}>
            <LoadingIndicator />
          </div>
        )}
        {addError && (
          <div className={`image-loader__error-wrapper ${ styles.overlayWrapper }`}>
            <ErrorOverlay />
          </div>
        )}
        {sources && (
          <picture>
            {sources.map(({ media, srcSet }) => (
              <source
                key={media}
                srcSet={srcSet}
                media={media}
              />
            ))}
            <img className={imgClass} src={currSrc} alt={alt} />
          </picture>
        )}
        {!sources && (
          <img className={imgClass} src={currSrc} alt={alt} />
        )}
      </div>
    );
  }
}

ImageLoader.defaultProps = {
  indicatorDelay: 300,
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
