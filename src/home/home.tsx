import * as mobx from 'mobx';
import * as mobxReact from 'mobx-react';
import * as React from 'react';
import { BlogGrid, hardcodedBlogsPosts } from '../blog/blog';
import styles from './home.module.css';
import background from './skybg.jpg';
import { CollectionGrid } from '../photography/photography';
import { ProjectsGrid } from '../projects/projects';
import { Button } from '../ui/button';

@mobxReact.observer
export class Home extends React.Component {

  @mobx.observable.ref
  private numColumns: number = 0;

  componentDidMount() {
    this.calculateNumColumns();
    window.addEventListener('resize', this.calculateNumColumns);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.calculateNumColumns);
  }

  @mobx.action
  private readonly calculateNumColumns = () => {
    if (window.innerWidth < 500) {
      this.numColumns = 1;
      return;
    }
    if (window.innerWidth < 1000) {
      this.numColumns = 2;
      return;
    }
    this.numColumns = 3;
  };

  render() {
    return (
      <div className={styles.home}>
        <div className={styles.homeContainer}>
          <div
            className={styles.backgroundHeaderPhoto}
            style={{ backgroundImage: `url(${background})` }}
          />
          <div className={styles.intro}>
            <h1 className={styles.annaAzzam}>ANNA AZZAM</h1>
            <br />
            <div className={styles.introText}>
              Software Developer @{' '}
              <span className={styles.fancyText}>
                <span className={styles.canvaLink}>
                  <a href="https://www.canva.com/careers/">Canva, Sydney</a>
                </span>
              </span>
              <br />
            </div>
          </div>
        </div>
        <div className={styles.blogIntro}>
          <BlogGrid
            blogPosts={hardcodedBlogsPosts.slice(0, this.numColumns)}
            numPlaceholders={this.numColumns}
          />
          <div className={styles.seeMoreContainer}>
            <Button link="/blog" label="See more blog posts >" />
          </div>
        </div>
        <div className={styles.photogIntro}>
          <CollectionGrid
            numCollections={this.numColumns}
            onCardClick={(folder) =>
              (window.location.href = `/photojournals#${folder}`)
            }
            largeImage={false}
          />
          <div className={styles.seeMoreContainer}>
            <Button
              link="/photojournals"
              label="See more photo collections >"
            />
          </div>
        </div>
        <div className={styles.projectsIntro}>
          <ProjectsGrid
            numProjects={this.numColumns}
            onCardClick={(name) => (window.location.href = `/projects#${name}`)}
            largeImage={false}
          />
          <div className={styles.seeMoreContainer}>
            <Button link="/projects" label="See more projects >" />
          </div>
        </div>
      </div>
    );
  }
}
