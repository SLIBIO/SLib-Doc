import React, { Component } from 'react';
import 'react-mdl/extra/css/material.deep_orange-orange.min.css';
import 'react-mdl-extra/dist/react-mdl-extra.min.css';
import 'normalize.css/normalize.css';
import { NavigationBar, Footer, ImageGallery } from '../components';
import Background from '../assets/main_background.png';
import '../styles/image-gallery.css';
import styles from '../styles/MainScene.scss';

export default class App extends Component {
  render() {
    const images = [{
      original: `${Background}`,
      thumbnail: '',
    }, {
      original: `${Background}`,
      thumbnail: ''
    }];

    return (
      <div>
        <NavigationBar />
        <div className={styles.container}>
          <ImageGallery
            showNav={false}
            showFullscreenButton={false}
            showThumbnails={false}
            showPlayButton={false}
            items={images}
            slideInterval={2000}
          />
          <div className={styles.descriptionContainer}>
            <div className={styles.header1}>
              MAKE IT FASTER&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </div>
            <div className={styles.header2}>
              <span className={styles.label}>SLib</span> is a C++ cross-platform framework built for speed.
            </div>
            <div className={styles.btnGettingStarted}>
              GETTING STARTED
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}
