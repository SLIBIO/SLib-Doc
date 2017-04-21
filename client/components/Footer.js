import React, { Component } from 'react';
import styles from '../styles/components/Footer.scss';

export class Footer extends Component {
  renderSocialIcon(iconClass) {
    return (
      <div className={`${styles[iconClass]} ${styles.iconContainer}`}>
        <a href='' target='_blank'>
          <span className='fa-stack'>
            <i className='fa fa-circle fa-stack-2x' />
            <i className={`fa ${iconClass} fa-stack-1x fa-inverse`} />
          </span>
        </a>
      </div>
    );
  }
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <div className={styles.socialContainer}>
            { this.renderSocialIcon('fa-twitter') }
            { this.renderSocialIcon('fa-facebook') }
            { this.renderSocialIcon('fa-github') }
            { this.renderSocialIcon('fa-linkedin') }
          </div>
          <div className={styles.copyRight}>
            Copyright © SLIBIO 2017. All Rights Reserved
          </div>
        </div>
        <div className={styles.bar} />
      </div>
    );
  }
}
