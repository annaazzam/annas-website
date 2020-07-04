import * as React from 'react';
import personalWebsiteImg from './personal_website.png';
import personalWebsiteStyles from './personal_website.module.css';
import styles from '../projects.module.css';
import { Button } from '../../ui/button';
import { Languages } from '../ui/languages/languages';

export class PersonalWebsite extends React.Component {
  render() {
    return (
      <>
        <div className={personalWebsiteStyles.imageContainer}>
          <img
            className={personalWebsiteStyles.image}
            src={personalWebsiteImg}
            alt="personal website"
          />
        </div>
        <div className={styles.content}>
          <div className={styles.descriptionText}>
            The website you're browsing right now! Feel free to check out the{' '}
            <a target="_" href="ttps://github.com/annaazzam/annas-blog">
              source code
            </a>
            , or fill out{' '}
            <a target="_" href="https://forms.gle/aAZJDFHYQHAYtJC86">
              this form
            </a>{' '}
            if you have any feedback.
          </div>
          <div className={styles.languagesSection}>
            <Languages languages={['React', 'MobX', 'CSS', 'TypeScript']} />
          </div>
          <div className={styles.actionButton}>
            <Button
              label="View source >"
              link="https://github.com/annaazzam/annas-blog"
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
