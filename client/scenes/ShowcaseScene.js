import React, { Component } from 'react';
import { Grid, Card, CardTitle, CardText } from 'react-mdl';
import { NavigationBar } from '../components';
import styles from '../styles/ShowcaseScene.scss';
import Item1 from '../assets/showcase/item1_1.png';
import Item2 from '../assets/showcase/item2_1.png';

const showcaseItems = [{
  backgroundImage: `url(${Item1})`,
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenan convallis.'
}, {
  backgroundImage: `url(${Item2})`,
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenan convallis.'
}, {
  backgroundImage: `url(${Item1})`,
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenan convallis.'
}, {
  backgroundImage: `url(${Item2})`,
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenan convallis.'
}, {
  backgroundImage: `url(${Item1})`,
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenan convallis.'
}, {
  backgroundImage: `url(${Item2})`,
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenan convallis.'
}];

export default class ShowcaseScene extends Component {
  constructor(props) {
    super(props);
    this.navigationRef = null;
  }
  onPaneDidMounted = (ref) => {
    if (ref) {
      ref.addEventListener('scroll', () => {
        this.navigationRef.handleScrollPosition(ref.scrollTop);
      });
    }
  };
  renderShowcaseItems() {
    const ret = [];
    showcaseItems.forEach((item, index) => {
      const { title, content, backgroundImage } = item;
      ret.push(
        <Card shadow={0} className={`${styles.showcaseItemContainer} ${styles[`item${index % 2}`]}`} >
          <CardTitle expand className={styles.title} style={{ backgroundImage }}>
            {title}
          </CardTitle>
          <CardText>
            {content}
          </CardText>
        </Card>
      );
    });
    return ret;
  }
  render() {
    return (
      <div className={styles.container}>
        <NavigationBar ref={ref => this.navigationRef = ref } />
        <div className={styles.mainContainer} ref={this.onPaneDidMounted}>
          <div className={styles.topHeader}>
            <div className={styles.titleContainer}>
              We’re proud to feature amazing apps built with SLib!
            </div>
            <div className={styles.titleDescription}>
              If you have an app to share for the SLib Showcase, please
              <span className={styles.contactUs}>&nbsp;let us know.</span>
            </div>
          </div>
          <div className={styles.gridContainer}>
            <Grid>
              {this.renderShowcaseItems()}
              <div style={{ width: '300px', height: '100px' }} />
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}
