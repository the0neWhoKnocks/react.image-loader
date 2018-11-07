import React, { Component, Fragment } from 'react';
import { arrayOf, bool, func, shape, string } from 'prop-types';
import { checkIfImageCached, loadImage } from './utils';
import styles from './styles';

const tempImg = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

/**
 * A Component that preloads `img` or `picture` tags.
 */
class ImageLoader extends Component {
  static getDerivedStateFromProps(props, state) {
    if( state.src !== props.src ) return { src: props.src };

    return null;
  }

  constructor(props) {
    super();

    this.state = {
      loaded: false,
      revealImage: false,
      src: props.src,
    };
  }

  componentDidMount() {
    const {
      sources,
      src,
    } = this.props;
    this.mounted = true;
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
      : loadImage(currSrc, this.handleLoadedImage.bind(this));
  }

  shouldComponentUpdate(nextProps, nextState) {
    if( this.state.src !== nextProps.src ) return true;
    if( this.state.revealImage === nextState.revealImage ) return false;

    return true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  /**
   * Ensures that on older browsers like IE11, the default `img` will use the
   * correct image source based on the current media query.
   */
  updateSourceFromQuery(src) {
    this.setState({ src });
  }

  /**
   * Handles the loaded image and sets props that allow for animation.
   */
  handleLoadedImage() {
    if( this.mounted ){
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
  }

  render() {
    const {
      loaded,
      revealImage,
    } = this.state;
    const {
      alt,
      className,
      LoaderOverlay,
      sources,
      src,
    } = this.props;
    const currSrc = (loaded) ? src : tempImg;
    const imgClass = `${ styles.img }${ (revealImage) ? 'is--loaded' : '' }`;

    return (
      <Fragment>
        <div className={className}>
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
        {LoaderOverlay && (
          <LoaderOverlay visible={!loaded} />
        )}
      </Fragment>
    );
  }
}

ImageLoader.propTypes = {
  alt: string,
  className: string,
  LoaderOverlay: func,
  showOverlay: bool,
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
