import classNames from 'classnames';
import * as mobx from 'mobx';
import * as mobxReact from 'mobx-react';
import * as React from 'react';
import styles from './card.module.css';

@mobxReact.observer
export class Card extends React.Component<{
  text?: string,
  image?: string,
  // Props should either have both `overlayText` and `link`, or `onClick`.
  // overlayText is used to show what will happen when the link is clicked, e.g. "Read on Medium".
  overlayText?: string,
  link?: string,
  onClick?(): void,
  // When true, the image is larger and the title is smaller
  largeImage?: boolean,
}> {
  @mobx.observable.ref
  private showOverlay: boolean = false;

  private titleRef = React.createRef<HTMLDivElement>();
  private textRef = React.createRef<HTMLDivElement>();

  componentDidMount() {
    this.calculateFontSize();
    window.addEventListener('resize', this.calculateFontSize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.calculateFontSize);
  }

  @mobx.action
  private readonly onBlur = () => {
    this.showOverlay = false;
  };

  private readonly calculateFontSize = () => {
    const titleElement = this.titleRef.current!;
    const textElement = this.textRef.current!;
    titleElement.style.fontSize = '25px';
    titleElement.style.fontSize = '25px';
    const textPadding = parseInt(textElement.style.padding, 10);
    const textElementHeight = textElement.getBoundingClientRect().height - textPadding * 2;
    while (titleElement.getBoundingClientRect().height > textElementHeight) {
      const size = parseInt(titleElement.style.fontSize, 10);
      titleElement.style.fontSize = `${size - 1}px`;
    }
  };

  @mobx.action
  private readonly onClick = () => {
    const { link, overlayText, onClick } = this.props;
    if (onClick) {
      onClick();
      return;
    }
    if (!overlayText || !link) {
      return;
    }
    if (window.matchMedia('(hover: none)').matches && !this.showOverlay) {
      this.showOverlay = true;
    } else {
      this.showOverlay = false;
      window.open(link, '_');
    }
  };

  render() {
    const { text, image, overlayText, largeImage = false } = this.props;
    return (
        <div className={styles.card} onBlur={this.onBlur} tabIndex={-1}>
          <div
              className={classNames(styles.cardText, largeImage && styles.small)}
              // Style is inlined here so that it can be used for font-size calculation in
              // this.calculateFontSize().
              style={{ padding: '30px' }}
              ref={this.textRef}
          >
            <div
                className={styles.cardTitle}
                ref={this.titleRef}
            >
              {text}
            </div>
          </div>
          <div
              style={{ backgroundImage: `url(${image})` }}
              className={styles.cardImg}
          />
          <div
              className={classNames(
                  styles.cardOverlay,
                  overlayText && styles.darkOverlay,
                  overlayText && this.showOverlay && styles.show,
              )}
              onClick={this.onClick}
          >
            {overlayText && <div className={styles.cardOverlayText}>{overlayText} {'>'}</div>}
          </div>
        </div>
    );
  }
};
