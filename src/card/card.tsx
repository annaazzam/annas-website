import classNames from 'classnames';
import * as mobx from 'mobx';
import * as mobxReact from 'mobx-react';
import * as React from 'react';
import styles from './card.module.css';

@mobxReact.observer
export class Card extends React.Component<{
  text?: string;
  subtitle?: string;
  image?: string;
  // Props should either have both `overlayText` and `link`, or `onClick`.
  // overlayText is used to show what will happen when the link is clicked, e.g. "Read on Medium".
  overlayText?: string;
  link?: string;
  onClick?(): void;
  // When true, the image is larger and the title is smaller
  largeImage?: boolean;
  ariaLabel: string;
}> {
  @mobx.observable.ref
  private showOverlay: boolean = false;

  private titleRef = React.createRef<HTMLDivElement>();
  private textRef = React.createRef<HTMLDivElement>();
  private subtitleRef = React.createRef<HTMLDivElement>();

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
    const subtitleHeight = this.subtitleRef.current
        ? parseInt(this.subtitleRef.current.style.height, 10)
        : 0;
    titleElement.style.fontSize = '25px';
    titleElement.style.fontSize = '25px';
    const textPadding = parseInt(textElement.style.padding, 10);
    const textElementHeight =
      textElement.getBoundingClientRect().height - (textPadding * 2) - subtitleHeight;
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
    const {
      text,
      image,
      overlayText,
      largeImage = false,
      ariaLabel,
      subtitle,
    } = this.props;
    return (
      <div className={styles.card} onBlur={this.onBlur} role="button">
        <div
          className={classNames(styles.cardText, largeImage && styles.small)}
          // Style is inlined here so that it can be used for font-size calculation in
          // this.calculateFontSize().
          style={{ padding: '30px' }}
          ref={this.textRef}
        >
          <div className={styles.cardTitle} ref={this.titleRef}>
            {text}
          </div>
          {subtitle && (
            // Style is inlined here so that it can be used for font-size calculation in
            // this.calculateFontSize()
            <div className={styles.subtitle} ref={this.subtitleRef} style={{ height: '17px' }}>
              {subtitle}
            </div>
          )}
        </div>
        <div
          style={{ backgroundImage: `url(${image})` }}
          className={styles.cardImg}
        />
        <button
          className={classNames(
            styles.cardOverlay,
            overlayText && styles.darkOverlay,
            overlayText && this.showOverlay && styles.show,
          )}
          onClick={this.onClick}
          aria-label={ariaLabel}
        >
          {overlayText && (
            <div className={styles.cardOverlayText}>
              {overlayText} {'>'}
            </div>
          )}
        </button>
      </div>
    );
  }
}
