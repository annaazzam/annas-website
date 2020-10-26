import * as React from 'react';
import styles from '../projects.module.css';
import digitalPetGameGif from './digital_pet_game.gif';
import { LaptopDemo } from '../ui/laptop_demo/laptop_demo';
import { Button } from '../../ui/button';
import { Languages } from '../ui/languages/languages';

export class DigitalPetGame extends React.Component {
  render() {
    return (
      <>
        <LaptopDemo demoImg={digitalPetGameGif} />
        <div className={styles.content}>
          <div className={styles.descriptionText}>
          This digital pet game which allows you to raise a pet and take care of it! This game is in Beta, and some features are not yet finished. Stay tuned for more soon!
          </div>
          <div className={styles.languagesSection}>
            <Languages languages={['React', 'HTML', 'CSS', 'MobX']} />
          </div>
          <div className={styles.actionButton}>
            <Button
              label="Play now"
              link={'https://digital-pet-game.web.app/'}
              external={true}
            />
          </div>
          <div className={styles.actionButton}>
            <Button
              label="View source >"
              link="https://github.com/annaazzam/digital-pet-game"
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
