import React, { Component } from 'react';
import 'react-mdl/extra/css/material.deep_orange-orange.min.css';
import 'react-mdl-extra/dist/react-mdl-extra.min.css';
import 'normalize.css/normalize.css';
import { NavigationBar, Footer, ImageGallery } from '../components';
import Background from '../assets/carousel-1.jpg';
import '../styles/image-gallery.css';
import styles from '../styles/MainScene.scss';

export default class App extends Component {
  render() {
    const images = [
      {
        original: `${Background}`,
        thumbnail: '',
      },
      {
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
            <div className={styles.header1}>
              Make it fast
            </div>
            <div className={styles.header2}>
              SLib is a C++ cross-platform framework built for speed
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}
