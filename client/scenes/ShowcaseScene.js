import React, { Component } from 'react';
import { Grid, Card, CardTitle, CardText } from 'react-mdl';
import { NavigationBar } from '../components';
import styles from '../styles/ShowcaseScene.scss';

const showcaseItems = [{
  title: 'Update',
  backgroundImage: 'url(http://www.getmdl.io/assets/demos/dog.png)',
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenan convallis.'
}, {
  title: 'Update',
  backgroundImage: 'url(http://www.getmdl.io/assets/demos/dog.png)',
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenan convallis.'
}, {
  title: 'Update',
  backgroundImage: 'url(http://www.getmdl.io/assets/demos/dog.png)',
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenan convallis.'
}, {
  title: 'Update',
  backgroundImage: 'url(http://www.getmdl.io/assets/demos/dog.png)',
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenan convallis.'
}, {
  title: 'Update',
  backgroundImage: 'url(http://www.getmdl.io/assets/demos/dog.png)',
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenan convallis.'
}, {
  title: 'Update',
  backgroundImage: 'url(http://www.getmdl.io/assets/demos/dog.png)',
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenan convallis.'
}];

export default class ShowcaseScene extends Component {
  renderShowcaseItems() {
    const ret = [];
    showcaseItems.map((item) => {
      const { title, content, backgroundImage } = item;
      ret.push(
        <Card shadow={0} className={styles.showcaseItemContainer}>
          <CardTitle expand className={styles.title} style={{ backgroundImage }}>
            {title}
          </CardTitle>
          <CardText>
            {content}
          </CardText>
        </Card>
      );
    })
    return ret;
  }
  render() {
    return (
      <div className={styles.container}>
        <NavigationBar />
        <div className={styles.mainContainer}>
          <div className={styles.titleContainer}>
            We’re proud to feature amazing apps built with SLib!
          </div>
          <div className={styles.titleDescription}>
            If you have an app to share for the SLib Showcase, please
            <span className={styles.contactUs}>&nbsp;let us know.</span>
          </div>
          <div className={styles.gridContainer}>
            <Grid>
              {this.renderShowcaseItems()}
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}
