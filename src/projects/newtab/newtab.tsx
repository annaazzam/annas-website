import * as React from 'react';
import styles from '../projects.module.css';
import newtabGif from './newtab_gif.gif';
import { LaptopDemo } from '../ui/laptop_demo/laptop_demo';
import { Button } from '../../ui/button';
import { Languages } from '../ui/languages/languages';

export class NewtabProject extends React.Component {
  render() {
    return (
      <>
        <LaptopDemo demoImg={newtabGif} />
        <div className={styles.content}>
          <div className={styles.descriptionText}>
            A Google Chrome extension which replaces the New Tab page with a
            clean, simple page. Displays an image from a collection of beautiful
            curated photos, or allows you to upload your own.
          </div>
          <div className={styles.languagesSection}>
            <Languages languages={['JavaScript', 'HTML', 'CSS', 'JSON']} />
          </div>
          {/* TODO: Still not published */}
          <div className={styles.actionButton}>
            <Button label="View on Chrome Store >" />
          </div>
          <div className={styles.actionButton}>
            <Button
              label="View source >"
              link="https://github.com/annaazzam/newtab-extension"
              external={true}
            />
          </div>
          <br />
          <br />
          <br />
        </div>
      </>
    );
  }
}
