import * as React from 'react';
import ReactTooltip from 'react-tooltip';
import styles from './help_button.module.css';

export const HelpButton = () => (
  <>
    <div data-tip data-for="helpTip" className={styles.button}>
      ?
    </div>
    <ReactTooltip
      id="helpTip"
      place="left"
      effect="solid"
      event="click"
      globalEventOff="click"
      clickable={true}
      className={styles.tooltip}
    >
      <div onClick={(e) => e.stopPropagation()}>
        Hello!{' '}
        <span role="img" aria-label="wave">
          👋
        </span>{' '}
        Feedback? Bug reports? Please leave them at{' '}
        <a target="_" href="https://forms.gle/aAZJDFHYQHAYtJC86">
          this form.
        </a>
      </div>
    </ReactTooltip>
  </>
);
