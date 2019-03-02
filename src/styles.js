import { css } from 'emotion';

export const MODIFIER__LOADED = 'is--loaded';
export const ROOT_CLASS = 'image-loader';

export default css`
  position: relative;

  noscript img,
  noscript picture {
    position: absolute;
    top: 0;
    left: 0;
  }
  
  .${ ROOT_CLASS } {
    
    &__image {
      width: 100%;
      display: block;
      opacity: 0;
      transition: opacity 0.5s;
      position: relative;

      &.is--loaded {
        opacity: 1;
      }
    }
    
    &__indicator-wrapper,
    &__error-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      pointer-events: none;
    }
  }
  
  &.${ MODIFIER__LOADED } {
    
    .${ ROOT_CLASS } {
      
      &__image {
        opacity: 1;
      }
    }
  }
`;