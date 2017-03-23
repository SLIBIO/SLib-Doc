import React, { Component } from 'react';
import superagent from 'superagent';
import 'react-mdl/extra/css/material.deep_orange-orange.min.css';
import 'react-mdl-extra/dist/react-mdl-extra.min.css';
import 'normalize.css/normalize.css';
import { NavigationBar, Footer } from '../components';
import Background from '../assets/hero-bg-01.jpg';
import styles from '../styles/MainScene.scss';

export default class App extends Component {
  // fetchExternalHTML() {
  //   superagent.get(`http://${window.location.host}/doc/index.html`)
  //     .end((err, res) => {
  //       this.setState({ html: res.text });
  //     });
  // }

  render() {
    return (
      <div>
        <NavigationBar />
        <div className={styles.container} style={{ backgroundImage: `url(${Background})` }}>
          <Footer />
        </div>
      </div>
    );
  }
}