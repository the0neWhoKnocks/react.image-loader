import React from 'react';
import { mount } from 'enzyme';
import { checkIfImageCached, loadImage } from './utils';
import ImageLoader, { tempImg } from './index';
import styles from './styles';

jest.mock('./utils', () => jest.genMockFromModule('./utils'));

describe('ImageLoader', () => {
  const imgURL = 'http://fake.com/not/real.jpg';
  let wrapper;
  let img;
  let loaderProps;
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

    expect(wrapper.childAt(0).props().className).toEqual(className);
  });

  it('should load an image if not cached', () => {
    const altText = 'alt text';
    checkIfImageCached.mockReturnValue(false);

    // render out everything in a loading state
    wrapper = mount(<ImageLoader src={imgURL} alt={altText} />);
    img = wrapper.find('img').instance();
    loaderProps = wrapper.find('LoaderOverlay').props();

    expect(loadImage).toHaveBeenCalledWith(imgURL, expect.any(Function));
    expect(img.src).toEqual(tempImg);
    expect(img.alt).toEqual(altText);
    expect(loaderProps.visible).toBe(true);

    // loading has completed
    loadImageCB();
    rafCB();
    wrapper.update();
    img = wrapper.find('img').instance();
    loaderProps = wrapper.find('LoaderOverlay').props();

    expect(img.src).toEqual(imgURL);
    expect(loaderProps.visible).toBe(false);
  });

  it('should set the source if the image is cached', () => {
    checkIfImageCached.mockReturnValue(true);

    // render out everything in a loaded state
    wrapper = mount(<ImageLoader src={imgURL} />);
    img = wrapper.find('img').instance();
    rafCB();
    wrapper.update();
    loaderProps = wrapper.find('LoaderOverlay').props();

    expect(img.src).toEqual(imgURL);
    expect(loaderProps.visible).toBe(false);
  });

  it('should NOT try to set state if component was unmounted before load listener completed', () => {
    checkIfImageCached.mockReturnValue(false);

    wrapper = mount(<ImageLoader src={imgURL} />);
    const instance = wrapper.instance();
    instance.componentWillUnmount();
    loadImageCB();
    wrapper.update();

    expect(instance.state.loaded).toBe(false);
  });

  it('should add class to fade image in', () => {
    wrapper = mount(<ImageLoader src={imgURL} />);
    const instance = wrapper.instance();
    instance.handleLoadedImage();
    wrapper.update();

    expect(instance.state.loaded).toBe(true);
    expect(instance.state.revealImage).toBe(false);
    expect(wrapper.find('img').props().className).toEqual(`${ styles.img }`);

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
    expect(wrapper.find('img').props().className).toEqual(`${ styles.img } is--loaded`);
  });

  it('should handle `src` updates', () => {
    checkIfImageCached.mockReturnValue(true);

    wrapper = mount(<ImageLoader src={imgURL} />);
    rafCB();
    wrapper.update();
    expect(wrapper.find('img').props().src).toEqual(imgURL);

    const newURL = 'http://fake.com/new/url.jpg';
    wrapper.setProps({
      src: newURL,
    });
    expect(wrapper.find('img').props().src).toEqual(newURL);
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
    const pic = wrapper.find('picture');
    const picSources = pic.find('source');

    expect(loadImage).toHaveBeenCalledWith(sources[1].srcSet, expect.any(Function));
    expect(pic.length).toBe(1);
    expect(picSources.length).toBe(2);
    expect(picSources.get(0).props).toEqual(sources[0]);
    expect(picSources.get(1).props).toEqual(sources[1]);
  });
});
