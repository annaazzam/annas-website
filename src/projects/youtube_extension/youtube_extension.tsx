import * as React from 'react';
import youtubeExtensionGif from './youtube_extension_gif.gif';
import styles from '../projects.module.css';
import { Button } from '../../ui/button';
import { Languages } from '../ui/languages/languages';
import { LaptopDemo } from '../ui/laptop_demo/laptop_demo';

export const YoutubeFocusModeProject = () => (
    <>
      <LaptopDemo demoImg={youtubeExtensionGif}/>
      <div className={styles.content}>
        <div className={styles.descriptionText}>
          A productivity Google Chrome extension which removes the 
          <span style={{ fontStyle: 'italic'}}> comments</span> and 
          <span style={{ fontStyle: 'italic'}}> recommendations</span> from
          YouTube, allowing you to focus on the video you're currently watching, and help you stop browsing.
        </div>
        <div className={styles.languagesSection}>
          <Languages languages={[
            'JavaScript',
            'HTML',
            'CSS',
            'JSON'
          ]}/>
        </div>
        <div className={styles.actionButton}>
          <Button
              label="View on Chrome Store >"
              link="https://chrome.google.com/webstore/detail/youtube-focus-mode/aiickpjplakbajmoglephfflijahgblj"
              external={true}
          />
        </div>
        <div className={styles.actionButton}>
          <Button
              label="View source >"
              link="https://github.com/annaazzam/youtube-focus-mode"
              external={true}
          />
        </div>
        <br/><br/><br/>
      </div>
    </>
);
