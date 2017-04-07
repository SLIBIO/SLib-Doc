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
      windowPosition: window.pageYOffset,
      mobileNavVisible: false,
      navClasses: styles.navigationBar
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
        <li key={202}><a href='./doc/Index.html'>DOCUMENT</a></li>
        <li key={200}><Link to='about'>FAQ</Link></li>
        <li key={203}><Link to='/showcase'>About US</Link></li>
        <li key={205}><Link to='contact'>REGISTER</Link></li>
      </ul>
    ];
  }

  handleResize = () => {
    console.log('handleResize');
    this.setState({ windowWidth: window.innerWidth });
  };

  handleScroll = () => {
    this.setState({ windowPosition: window.pageYOffset });
    if (this.state.windowPosition >= 150) {
      this.setState({ navClasses: `${styles.navigationBar} ${styles.nav_pinch}` });
    } else {
      this.setState({ navClasses: styles.navigationBar });
    }
  };
  handleScrollPosition = (position) => {
    console.log('scroll');
    this.setState({ windowPosition: position });
    if (this.state.windowPosition >= 150) {
      this.setState({ navClasses: `${styles.navigationBar} ${styles.nav_pinch}` });
    } else {
      this.setState({ navClasses: styles.navigationBar });
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
    // const detector = new MobileDetect(window.navigator.userAgent);
    // if (this.state.windowWidth <= 700 || detector.mobile()) {
    //   return [
    //     <div key={101} className={styles.mobileNav}>
    //       <p onClick={this.handleNavClick.bind(this)}><MobileNav /></p>
    //       {this.renderMobileNav()}
    //     </div>
    //   ];
    // }
    return [
      <div key={102} className={styles.navMenu}>
        {this.navigationLinks()}
      </div>
    ];
  }

  render() {
    return (
      <div>
        <div key={200} className={this.state.navClasses}>
          <div key={300} className={styles.navigationLogo}>
            <img role='presentation' src={`${SlibIcon}`} className={styles.imgLogo} />
          </div>
          {this.renderNavigation()}
        </div>
        <div className={styles.contactBorder} />
        <div className={styles.contactLabel}>
          CONTACT
        </div>
      </div>
    );
  }
}
