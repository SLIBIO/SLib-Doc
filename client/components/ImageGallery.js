import React from 'react';
import Swipeable from 'react-swipeable';
import { throttle, debounce } from 'lodash';

const screenChangeEvents = [
  'fullscreenchange',
  'msfullscreenchange',
  'mozfullscreenchange',
  'webkitfullscreenchange'
];

export default class ImageGallery extends React.Component {
  static defaultProps = {
    items: [],
    showNav: true,
    infinite: true,
    indexSeparator: ' / ',
    startIndex: 0,
    slideDuration: 450,
    swipingTransitionDuration: 0,
    slideInterval: 3000,
  };
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: props.startIndex,
      offsetPercentage: 0,
      galleryWidth: 0,
      isFullscreen: false,
      isPlaying: false
    };

    if (props.lazyLoad) {
      this._lazyLoaded = [];
    }
  }
  componentWillMount() {
    // Used to update the throttle if slideDuration changes
    this._unthrottledSlideToIndex = this.slideToIndex.bind(this);
    this.slideToIndex = throttle(this._unthrottledSlideToIndex,
      this.props.slideDuration,
      { trailing: false });

    this._handleResize = this._handleResize.bind(this);
    this._debounceResize = debounce(this._handleResize, 500);
    this._handleScreenChange = this._handleScreenChange.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
  }

  componentDidMount() {
    this._handleResize();
    if (this.props.autoPlay) {
      this.play();
    }
    if (!this.props.disableArrowKeys) {
      window.addEventListener('keydown', this._handleKeyDown);
    }
    window.addEventListener('resize', this._debounceResize);
    this._onScreenChangeEvent();
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.disableArrowKeys !== nextProps.disableArrowKeys) {
      if (nextProps.disableArrowKeys) {
        window.removeEventListener('keydown', this._handleKeyDown);
      } else {
        window.addEventListener('keydown', this._handleKeyDown);
      }
    }

    if (nextProps.lazyLoad &&
      (!this.props.lazyLoad || this.props.items !== nextProps.items)) {
      this._lazyLoaded = [];
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentIndex !== this.state.currentIndex) {
      if (this.props.onSlide) {
        this.props.onSlide(this.state.currentIndex);
      }
    }

    if (prevProps.slideDuration !== this.props.slideDuration) {
      this.slideToIndex = throttle(this._unthrottledSlideToIndex,
        this.props.slideDuration,
        { trailing: false });
    }
  }

  componentWillUnmount() {
    if (!this.props.disableArrowKeys) {
      window.removeEventListener('keydown', this._handleKeyDown);
    }

    if (this._debounceResize) {
      window.removeEventListener('resize', this._debounceResize);
    }

    this._offScreenChangeEvent();

    if (this._intervalId) {
      window.clearInterval(this._intervalId);
      this._intervalId = null;
    }

    if (this._resizeTimer) {
      window.clearTimeout(this._resizeTimer);
    }
  }

  play(callback = true) {
    if (!this._intervalId) {
      const { slideInterval, slideDuration } = this.props;
      this.setState({ isPlaying: true });
      this._intervalId = window.setInterval(() => {
        if (!this.state.hovering) {
          if (!this.props.infinite && !this._canSlideRight()) {
            this.pause();
          } else {
            this.slideToIndex(this.state.currentIndex + 1);
          }
        }
      }, Math.max(slideInterval, slideDuration));

      if (this.props.onPlay && callback) {
        this.props.onPlay(this.state.currentIndex);
      }
    }
  }

  pause(callback = true) {
    if (this._intervalId) {
      window.clearInterval(this._intervalId);
      this._intervalId = null;
      this.setState({ isPlaying: false });

      if (this.props.onPause && callback) {
        this.props.onPause(this.state.currentIndex);
      }
    }
  }
  slideToIndex(index, event) {
    const { currentIndex } = this.state;

    if (event) {
      if (this._intervalId) {
        // user triggered event while ImageGallery is playing, reset interval
        this.pause(false);
        this.play(false);
      }
    }

    const slideCount = this.props.items.length - 1;
    let nextIndex = index;

    if (index < 0) {
      nextIndex = slideCount;
    } else if (index > slideCount) {
      nextIndex = 0;
    }

    this.setState({
      previousIndex: currentIndex,
      currentIndex: nextIndex,
      offsetPercentage: 0,
      style: {
        transition: `all ${this.props.slideDuration}ms ease-out`
      }
    });
  }

  _handleScreenChange() {
    /*
     handles screen change events that the browser triggers e.g. esc key
     */
    const fullScreenElement = document.fullscreenElement ||
      document.msFullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullscreenElement;

    if (this.props.onScreenChange) {
      this.props.onScreenChange(fullScreenElement);
    }

    this.setState({ isFullscreen: !!fullScreenElement });
  }

  _onScreenChangeEvent() {
    screenChangeEvents.forEach((eventName) => {
      document.addEventListener(eventName, this._handleScreenChange);
    });
  }

  _offScreenChangeEvent() {
    screenChangeEvents.forEach((eventName) => {
      document.removeEventListener(eventName, this._handleScreenChange);
    });
  }

  _handleResize() {
    // delay initial resize to get the accurate this.refImageGallery height/width
    this._resizeTimer = window.setTimeout(() => {
      if (this.refImageGallery) {
        this.setState({
          galleryWidth: this.refImageGallery.offsetWidth
        });
      }

      if (this.refImageGallerySlideWrapper) {
        this.setState({
          gallerySlideWrapperHeight: this.refImageGallerySlideWrapper.offsetHeight
        });
      }
    }, 500);
  }

  _handleKeyDown(event) {
    const LEFT_ARROW = 37;
    const RIGHT_ARROW = 39;
    const key = parseInt(event.keyCode || event.which || 0, 10);
    switch (key) {
      case LEFT_ARROW:
        if (this._canSlideLeft() && !this._intervalId) {
          this._slideLeft();
        }
        break;
      case RIGHT_ARROW:
        if (this._canSlideRight() && !this._intervalId) {
          this._slideRight();
        }
        break;
      default:
        break;
    }
  }

  _handleOnSwiped(ev, x, y, isFlick) {
    this.setState({ isFlick });
  }

  _shouldSlideOnSwipe() {
    const shouldSlide = Math.abs(this.state.offsetPercentage) > 30 ||
      this.state.isFlick;

    if (shouldSlide) {
      // reset isFlick state after so data is not persisted
      this.setState({ isFlick: false });
    }
    return shouldSlide;
  }

  _handleOnSwipedTo(index) {
    let slideTo = this.state.currentIndex;

    if (this._shouldSlideOnSwipe()) {
      slideTo += index;
    }

    if (index < 0) {
      if (!this._canSlideLeft()) {
        slideTo = this.state.currentIndex;
      }
    } else if (!this._canSlideRight()) {
      slideTo = this.state.currentIndex;
    }

    this._unthrottledSlideToIndex(slideTo);
  }

  _handleSwiping(index, _, delta) {
    const { swipingTransitionDuration } = this.props;
    const { galleryWidth } = this.state;

    let offsetPercentage = index * ((delta / galleryWidth) * 100);
    if (Math.abs(offsetPercentage) >= 100) {
      offsetPercentage = index * 100;
    }

    const swipingTransition = {
      transition: `transform ${swipingTransitionDuration}ms ease-out`
    };

    this.setState({ offsetPercentage, style: swipingTransition });
  }

  _canNavigate() {
    return this.props.items.length >= 2;
  }

  _canSlideLeft() {
    return this.props.infinite || this.state.currentIndex > 0;
  }

  _canSlideRight() {
    return this.props.infinite ||
      this.state.currentIndex < this.props.items.length - 1;
  }

  _getAlignmentClassName(index) {
    // LEFT, and RIGHT alignments are necessary for lazyLoad
    const { currentIndex } = this.state;
    let alignment = '';
    const LEFT = 'left';
    const CENTER = 'center';
    const RIGHT = 'right';

    switch (index) {
      case (currentIndex - 1):
        alignment = ` ${LEFT}`;
        break;
      case (currentIndex):
        alignment = ` ${CENTER}`;
        break;
      case (currentIndex + 1):
        alignment = ` ${RIGHT}`;
        break;
      default:
        break;
    }

    if (this.props.items.length >= 3 && this.props.infinite) {
      if (index === 0 && currentIndex === this.props.items.length - 1) {
        // set first slide as right slide if were sliding right from last slide
        alignment = ` ${RIGHT}`;
      } else if (index === this.props.items.length - 1 && currentIndex === 0) {
        // set last slide as left slide if were sliding left from first slide
        alignment = ` ${LEFT}`;
      }
    }

    return alignment;
  }

  _getTranslateXForTwoSlide(index) {
    // For taking care of infinite swipe when there are only two slides
    const { currentIndex, offsetPercentage, previousIndex } = this.state;
    const baseTranslateX = -100 * currentIndex;
    let translateX = baseTranslateX + (index * 100) + offsetPercentage;

    // keep track of user swiping direction
    if (offsetPercentage > 0) {
      this.direction = 'left';
    } else if (offsetPercentage < 0) {
      this.direction = 'right';
    }

    // when swiping make sure the slides are on the correct side
    if (currentIndex === 0 && index === 1 && offsetPercentage > 0) {
      translateX = -100 + offsetPercentage;
    } else if (currentIndex === 1 && index === 0 && offsetPercentage < 0) {
      translateX = 100 + offsetPercentage;
    }

    if (currentIndex !== previousIndex) {
      // when swiped move the slide to the correct side
      if (previousIndex === 0 && index === 0 &&
        offsetPercentage === 0 && this.direction === 'left') {
        translateX = 100;
      } else if (previousIndex === 1 && index === 1 &&
        offsetPercentage === 0 && this.direction === 'right') {
        translateX = -100;
      }
    } else if (currentIndex === 0 && index === 1 &&
      offsetPercentage === 0 && this.direction === 'left') {
      translateX = -100;
    } else if (currentIndex === 1 && index === 0 &&
      offsetPercentage === 0 && this.direction === 'right') {
      translateX = 100;
    }

    return translateX;
  }

  _getSlideStyle(index) {
    const { currentIndex, offsetPercentage } = this.state;
    const { infinite, items } = this.props;
    const baseTranslateX = -100 * currentIndex;
    const totalSlides = items.length - 1;

    // calculates where the other slides belong based on currentIndex
    let translateX = baseTranslateX + (index * 100) + offsetPercentage;

    // adjust zIndex so that only the current slide and the slide were going
    // to is at the top layer, this prevents transitions from flying in the
    // background when swiping before the first slide or beyond the last slide
    let zIndex = 1;
    if (index === currentIndex) {
      zIndex = 3;
    } else if (index === this.state.previousIndex) {
      zIndex = 2;
    } else if (index === 0 || index === totalSlides) {
      zIndex = 0;
    }

    if (infinite && items.length > 2) {
      if (currentIndex === 0 && index === totalSlides) {
        // make the last slide the slide before the first
        translateX = -100 + offsetPercentage;
      } else if (currentIndex === totalSlides && index === 0) {
        // make the first slide the slide after the last
        translateX = 100 + offsetPercentage;
      }
    }

    // Special case when there are only 2 items with infinite on
    if (infinite && items.length === 2) {
      translateX = this._getTranslateXForTwoSlide(index);
    }

    const translate3d = `translate3d(${translateX}%, 0, 0)`;

    return {
      WebkitTransform: translate3d,
      MozTransform: translate3d,
      msTransform: translate3d,
      OTransform: translate3d,
      transform: translate3d,
      zIndex
    };
  }

  _slideLeft(event) {
    this.slideToIndex(this.state.currentIndex - 1, event);
  }

  _slideRight(event) {
    this.slideToIndex(this.state.currentIndex + 1, event);
  }

  _renderItem(item) {
    return (
      <div className='image-gallery-image'>
        <div
          className='galleryImage'
          style={{ backgroundImage: `url(${item.original})` }}
        />
      </div>
    );
  }
  renderLeftNav(onClick, disabled) {
    return (
      <button
        type='button'
        className='image-gallery-left-nav'
        disabled={disabled}
        onClick={onClick}
        aria-label='Previous Slide'
      />
    );
  }
  renderRightNav(onClick, disabled) {
    return (
      <button
        type='button'
        className='image-gallery-right-nav'
        disabled={disabled}
        onClick={onClick}
        aria-label='Next Slide'
      />
    );
  }
  renderContent(slides) {
    const slideLeft = this._slideLeft.bind(this);
    const slideRight = this._slideRight.bind(this);
    const ret = [];
    if (this._canNavigate()) {
      if (this.props.showNav) {
        ret.push(
          <span key='navigation'>
            {this.renderLeftNav(slideLeft, !this._canSlideLeft())}
            {this.renderRightNav(slideRight, !this._canSlideRight())}
          </span>
        );
      }
      if (this.props.disableSwipe) {
        ret.push(
          <div className='image-gallery-slides' key='slides'>
            {slides}
          </div>
        );
      } else {
        ret.push(
          <Swipeable
            className='image-gallery-swipe'
            key='swipeable'
            delta={1}
            onSwipingLeft={this._handleSwiping.bind(this, -1)}
            onSwipingRight={this._handleSwiping.bind(this, 1)}
            onSwiped={this._handleOnSwiped.bind(this)}
            onSwipedLeft={this._handleOnSwipedTo.bind(this, 1)}
            onSwipedRight={this._handleOnSwipedTo.bind(this, -1)}
          >
            <div className='image-gallery-slides'>
              {slides}
            </div>
          </Swipeable>
        );
      }
      return ret;
    }
    return (
      <div className='image-gallery-slides'>
        {slides}
      </div>
    );
  }
  render() {
    const slides = [];

    this.props.items.forEach((item, index) => {
      const alignment = this._getAlignmentClassName(index);
      const originalClass = item.originalClass ?
        ` ${item.originalClass}` : '';

      const renderItem = item.renderItem ||
        this.props.renderItem || this._renderItem.bind(this);

      const showItem = !this.props.lazyLoad || alignment || this._lazyLoaded[index];
      if (showItem && this.props.lazyLoad) {
        this._lazyLoaded[index] = true;
      }

      const slide = (
        <div
          key={index}
          className={`image-gallery-slide${alignment}${originalClass}`}
          style={Object.assign(this._getSlideStyle(index), this.state.style)}
          onClick={this.props.onClick}
        >
          {showItem ? renderItem(item) : <div style={{ height: '100%' }} />}
        </div>
      );

      slides.push(slide);
    });

    const slideWrapper = (
      <div
        ref={ref => (this.refImageGallerySlideWrapper = ref)}
        className='image-gallery-slide-wrapper'
      >
        {this.renderContent(slides)}
      </div>
    );

    return (
      <section
        ref={ref => (this.refImageGallery = ref)}
        className='image-gallery'
        aria-live='polite'
      >
        <div className='image-gallery-content'>
          { slideWrapper }
        </div>
      </section>
    );
  }
}
