import React from 'react';
import { mount } from 'enzyme';
import { checkIfImageCached, loadImage } from './utils';
import ImageLoader, { tempImg } from './index';
import styles from './styles';

jest.mock('./utils', () => jest.genMockFromModule('./utils'));

describe('ImageLoader', () => {
  const imgURL = 'http://fake.com/not/real.jpg';
  const LoadingIndicator = () => null; // eslint-disable-line
  const ErrorOverlay  = () => null; // eslint-disable-line
  let wrapper;
  let instance;
  let img;
  let rafCB;
  let loadImageCB;

  beforeEach(() => {
    jest.spyOn(global, 'requestAnimationFrame');
    global.requestAnimationFrame.mockImplementation((cb) => { rafCB = cb; });
    global.matchMedia = jest.fn(() => ({}));
    loadImage.mockImplementation((src, cb) => { loadImageCB = cb; });
  });

  afterEach(() => {
    global.requestAnimationFrame.mockRestore();
  });

  it('should add a custom CSS class to the container if one was supplied', () => {
    const altText = 'alt text';
    const className = 'custom-class';
    checkIfImageCached.mockReturnValue(true);

    wrapper = mount(<ImageLoader className={className} src={imgURL} alt={altText} />);

    expect(wrapper.childAt(0).props().className).toContain(className);
  });

  it('should load an image if not cached', () => {
    const altText = 'alt text';
    checkIfImageCached.mockReturnValue(false);

    // render out everything in a loading state
    wrapper = mount(
      <ImageLoader
        alt={altText}
        LoadingIndicator={LoadingIndicator}
        src={imgURL}
      />
    );
    jest.runAllTimers();
    wrapper.update();
    img = wrapper.find('NoScript + img').instance();
    
    expect(loadImage).toHaveBeenCalledWith(imgURL, expect.any(Function));
    expect(img.src).toEqual(tempImg);
    expect(img.alt).toEqual(altText);
    expect(wrapper.find('LoadingIndicator').length).toBe(1);
    
    // loading has completed
    loadImageCB();
    rafCB();
    wrapper.update();
    img = wrapper.find('NoScript + img').instance();
    
    expect(img.src).toEqual(imgURL);
  });

  it('should set the source if the image is cached', () => {
    checkIfImageCached.mockReturnValue(true);

    // render out everything in a loaded state
    wrapper = mount(
      <ImageLoader
        LoadingIndicator={LoadingIndicator}
        src={imgURL}
      />
    );
    jest.runAllTimers();
    wrapper.update();
    img = wrapper.find('NoScript + img').instance();
    rafCB();
    wrapper.update();

    expect(img.src).toEqual(imgURL);
    expect(wrapper.find('LoadingIndicator').length).toBe(0);
  });

  it('should NOT try to set state if component was unmounted before load listener completed', () => {
    checkIfImageCached.mockReturnValue(false);

    wrapper = mount(<ImageLoader src={imgURL} />);
    instance = wrapper.instance();
    instance.componentWillUnmount();
    loadImageCB();
    wrapper.update();

    expect(instance.state.loaded).toBe(false);
  });

  it('should add class to fade image in', () => {
    wrapper = mount(<ImageLoader src={imgURL} />);
    instance = wrapper.instance();
    instance.handleLoadedImage();
    wrapper.update();

    expect(instance.state.loaded).toBe(true);
    expect(instance.state.revealImage).toBe(false);
    expect(wrapper.find('NoScript + img').props().className).toContain(`${ styles.img }`);

    // shouldn't call setState if not mounted
    instance.mounted = false;
    rafCB();
    wrapper.update();
    expect(instance.state.revealImage).not.toBe(true);

    // should update state and reveal image when mounted
    instance.mounted = true;
    rafCB();
    wrapper.update();
    expect(instance.state.revealImage).toBe(true);
    expect(wrapper.find('NoScript + img').props().className).toContain(`${ styles.img } is--loaded`);
  });

  it('should handle source updates', () => {
    checkIfImageCached.mockReturnValue(true);

    wrapper = mount(
      <ImageLoader
        sources={[{
          media: '()',
          srcSet: 'http://fake.com/new/small-image.jpg',
        }]}
        src={imgURL}
      />
    );
    rafCB();
    wrapper.update();
    expect(wrapper.find('NoScript + picture img').props().src).toEqual(imgURL);

    const newURL = 'http://fake.com/new/url.jpg';
    wrapper.setProps({
      src: newURL,
    });
    wrapper.update();
    expect(wrapper.find('NoScript + picture img').props().src).toEqual(newURL);

    const newSources = [{
      media: '()',
      srcSet: 'http://fake.com/new/big-image.jpg',
    }];
    wrapper.setProps({
      sources: newSources,
    });
    wrapper.update();
    const sources = wrapper.find('NoScript + picture source');
    expect(sources.length).toBe(1);
    expect(sources.get(0).props.srcSet).toEqual(newSources[0].srcSet);
  });

  it('should use a `picture` element if `sources provided`', () => {
    const sources = [
      {
        media: '(min-width: 1024px)',
        srcSet: 'http://fake.com/hiResImg.jpg',
      },
      {
        media: '(max-width: 1023px)',
        srcSet: 'http://fake.com/lowResImg.jpg',
      },
    ];
    checkIfImageCached.mockReturnValue(false);
    global.matchMedia
      .mockReturnValueOnce({})
      .mockReturnValueOnce({ matches: true });

    wrapper = mount(<ImageLoader sources={sources} src={imgURL} />);
    loadImageCB();
    rafCB();
    wrapper.update();
    const pic = wrapper.find('NoScript + picture');
    const picSources = pic.find('source');

    expect(loadImage).toHaveBeenCalledWith(sources[1].srcSet, expect.any(Function));
    expect(pic.length).toBe(1);
    expect(picSources.length).toBe(2);
    expect(picSources.get(0).props).toEqual(sources[0]);
    expect(picSources.get(1).props).toEqual(sources[1]);
  });

  it('should handle missing images gracefully', () => {
    checkIfImageCached.mockReturnValue(false);

    wrapper = mount(
      <ImageLoader
        ErrorOverlay={ErrorOverlay}
        src={imgURL}
      />
    );
    instance = wrapper.instance();
    instance.handleLoadedImage({
      type: 'error',
    });
    wrapper.update();

    expect(wrapper.find('ErrorOverlay').length).toBe(1);
  });

  it('should NOT display the loading indicator if the image loaded quickly', () => {
    checkIfImageCached.mockReturnValue(false);

    wrapper = mount(
      <ImageLoader
        LoadingIndicator={LoadingIndicator}
        src={imgURL}
      />
    );
    instance = wrapper.instance();
    instance.startLoadingImage();
    wrapper.setState({ loaded: true });
    wrapper.update();
    jest.runAllTimers();

    expect(wrapper.find('LoadingIndicator').length).toBe(0);
  });
});
