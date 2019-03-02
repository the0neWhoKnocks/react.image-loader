import { css, keyframes } from 'emotion';

const MAX_MOBILE_WIDTH = 1023;
export const MOBILE_BP = `(max-width: ${ MAX_MOBILE_WIDTH }px)`;
export const DESKTOP_BP = `(min-width: ${ MAX_MOBILE_WIDTH + 1 }px)`;
export const BREAKPOINT_MOBILE_HIGH_RES = `${ MOBILE_BP } and (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)`;
export const BREAKPOINT_MOBILE_LOW_RES = MOBILE_BP;
export const BREAKPOINT_DESKTOP_LOW_RES = DESKTOP_BP;

const pulse = keyframes`
  0% {
    transform: translate(-50%, -50%) scale(0.9);
    opacity: 0;
  }
  50% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(0.9);
    opacity: 0;
  }
`;
const tiltHead = keyframes`
  0% {
    transform: translate(-50%, -50%);
  }
  24%,26% {
    transform: translate(-50%, -50%) rotate(20deg);
  }
  48%,51% {
    transform: translate(-50%, -50%);
  }
  74%,76% {
    transform: translate(-50%, -50%) rotate(-20deg);
  }
  100% {
    transform: translate(-50%, -50%);
  }
`;
const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export default {
  description: css`
    line-height: 1.3em;
    padding: 0.5em;
    border-radius: 0.25em;
    margin-top: 0.4em;
    box-shadow: 0 2px 2px 0 #00000050;
    background: #fff;

    @media${ DESKTOP_BP } {
      font-size: 1.5rem;

      &.for--header-image {
        
        @media${ DESKTOP_BP } {
          border-radius: 0.25em 0.25em 0.5em 0.5em;
          margin: 0.25em;
          background: #ffffffcf;
          position: absolute;
          bottom: 0;
          left: 0;
        }
      }
    }
  `,
  
  exampleWrapper: css`
    position: relative;
  `,

  imagesWrapper: css`
    max-width: 1050px;
    margin: 0 auto;
  `,
  
  imageWrapper: css`
    border: solid 1px #a0a0a0;
    border-radius: 1em;
    margin-top: 0.5em;
    overflow: hidden;
    position: relative;

    &::before {
      content: '';
      width: 100%;
      display: block;
    }
    
    /**
     * Aspect ratios (padding-top) are determined by calculating
     * '(height / width) * 100'. These values are hardcoded for this use case
     * since there are a limited set of images to deal with.
     */
    &.is--full {
      max-width: 1364px;

      &::before {
        padding-top: 80%;
      }
    }
    
    &.is--banner {
      max-width: 1384px;

      &::before {
        padding-top: 49%;
      }
    }
    
    &.is--portrait {
      max-width: 633px;

      &::before {
        padding-top: 100%;
      }
    }

    .image-loader {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      
      &.has--error {
        
        .overlay__icon {
          fill: #b50d00;
        }
      }
    }
  `,
  
  overlay: css`
    background: #eee;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    pointer-events: none;
    animation: ${ fadeIn } 1s forwards;

    .overlay__icon {
      width: 30%;
      max-width: 100px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform-origin: center;
    }
    
    &.is--indicator .overlay__icon {
      animation: ${ pulse } 2s infinite;
    }
    
    &.is--error {
      .overlay__msg {
        color: #b50d00;
        font-weight: bold;
        position: absolute;
        top: 32%;
        left: 50%;
        transform: rotate(10deg);
      }

      .overlay__icon {
        
        fill: #b50d00;
        animation: ${ tiltHead } 6s infinite;
      }
    }
  `,
  
  row: css`
    display: flex;
    flex-direction: row;

    .row__item {
      width: 50%;

      &:nth-of-type(odd) {
        margin-right: 0.25em;
      }

      &:nth-of-type(even) {
        margin-left: 0.25em;
      }
    }
  `,
};