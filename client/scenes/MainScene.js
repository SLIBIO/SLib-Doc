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
      },
    ];

    return (
      <div>
        <NavigationBar />
        <div className={styles.container}>
          <ImageGallery
            showFullscreenButton={false}
            showThumbnails={false}
            showPlayButton={false}
            items={images}
            slideInterval={2000}
          />
          <div className={styles.descriptionContainer}>
            <div className={styles.header2}>
              <span className={styles.label}>SLib</span>.io is a C++ cross-platform framework built for speed
            </div>
            <div className={styles.header1}>
              MAKE IT FASTER
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <div className={styles.gettingStarted}>
              <svg width='200px' height='40px' viewBox='0 0 200 37'>
                <g strokeWidth='2' fill='none' fillRule='evenodd'>
                  <polygon stroke='#FBAF3F' points='199 36 1 36 1 1 182 1' />
                </g>
              </svg>
              <div className={styles.label}>GETTING STARTED</div>
            </div>
            <div className={styles.showCase}>
              <svg width='200px' height='40px' viewBox='0 0 200 37'>
                <g strokeWidth='2' fill='none' fillRule='evenodd'>
                  <polygon fill='#00A79D' points='0 0 18.5209434 37 200 37 200 0' />
                </g>
              </svg>
              <div className={styles.label}>SHOWCASE</div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}
