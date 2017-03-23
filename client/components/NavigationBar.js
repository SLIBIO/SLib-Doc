import React, { Component } from 'react';
import { Link } from 'react-router';
import MobileDetect from 'mobile-detect';
import MobileNav from 'react-icons/lib/io/navicon-round';
import SlibIcon from '../assets/logo.png';
import styles from '../styles/components/NavigationBar.scss';

export default class NavContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: window.innerWidth,
      scrollPosition: window.scrollTop,
      windowPosition: window.pageYOffset,
      mobileNavVisible: false,
      navClasses: styles.nav_container
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('scroll', this.handleScroll);
  }

  navigationLinks() {
    return [
      <ul onClick={this.handleNavClick.bind(this)} key={100}>
        <li key={200}><Link to='about'>ABOUT</Link></li>
        <li key={202}><a href='./doc/index.html'>Document</a></li>
        <li key={203}><Link to='portfolio'>PORTFOLIO</Link></li>
        <li key={205}><Link to='contact'>CONTACT</Link></li>
      </ul>
    ];
  }

  handleResize = () => {
    this.setState({ windowWidth: window.innerWidth });
  };

  handleScroll = () => {
    this.setState({ windowPosition: window.pageYOffset });
    this.setState({ scrollPosition: document.body.scrollTop });
    if (this.state.windowPosition >= 150) {
      this.setState({ navClasses: `${styles.nav_container} ${styles.nav_pinch}` });
    } else {
      this.setState({ navClasses: styles.nav_container });
    }
  };
  handleNavClick() {
    if (!this.state.mobileNavVisible) {
      this.setState({
        mobileNavVisible: true
      });
    } else {
      this.setState({
        mobileNavVisible: false
      });
    }
  }

  renderMobileNav() {
    if (this.state.mobileNavVisible) {
      return this.navigationLinks();
    }
    return <div />;
  }

  renderNavigation() {
    const detector = new MobileDetect(window.navigator.userAgent);
    if (this.state.windowWidth <= 700 || detector.mobile()) {
      return [
        <div key={101} className={styles.mobileNav}>
          <p onClick={this.handleNavClick.bind(this)}><MobileNav /></p>
          {this.renderMobileNav()}
        </div>
      ];
    }
    return [
      <div key={102} className={styles.navMenu}>
        {this.navigationLinks()}
      </div>
    ];
  }

  render() {
    return (
      <div key={103} className={this.state.navClasses}>
        <div key={200} className={styles.navigationBar}>
          <div key={300} className={styles.navigationLogo}>
            <img role='presentation' src={`${SlibIcon}`} className={styles.imgLogo} />
            <div className={styles.logoName}>Lib</div>
          </div>
          {this.renderNavigation()}
        </div>
      </div>
    );
  }
}
