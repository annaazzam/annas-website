import * as mobx from 'mobx';
import * as mobxReact from 'mobx-react';
import * as React from 'react';
import ReactTooltip from 'react-tooltip';
import styles from './help_button.module.css';

@mobxReact.observer
export class HelpButton extends React.Component {
  @mobx.observable.ref
  private windowSize = window.innerWidth;

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  @mobx.action
  private readonly onResize = () => {
    this.windowSize = window.innerWidth;
  };

  render() {
    return (
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
            Feedback? Bug reports?
            {this.windowSize < 600 ? <br/> : null}{' '}
            Please leave them at{' '}
            <a target="_" href="https://forms.gle/aAZJDFHYQHAYtJC86">
              this form.
            </a>
          </div>
        </ReactTooltip>
      </>
    );
  }
}
