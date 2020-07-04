import * as mobx from 'mobx';
import * as mobxReact from 'mobx-react';
import * as React from 'react';
import { Swipeable } from 'react-swipeable'
import styles from './lightbox.module.css';
import chevron from './chevron.svg';

const classNames = require('classnames');

@mobxReact.observer
export class Lightbox extends React.Component<{
  image: string,
  onClose(): void,
  goToPreviousPhoto(): void,
  goToNextPhoto(): void,
  previousPhotoAvailable: boolean,
  nextPhotoAvailable: boolean,
}> {
  @mobx.observable.ref
  private hoverPosition?: 'left' | 'right';
  private readonly imageRef = React.createRef<HTMLImageElement>();

  @mobx.action.bound
  private readonly onMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    const imageRect = (e.target as HTMLImageElement).getBoundingClientRect();
    const mouseInLeftHalf = (e.clientX - imageRect.left) < (imageRect.width / 2);
    this.hoverPosition = mouseInLeftHalf ? 'left' : 'right';
  };

  private readonly onClick = () => {
    const {
      goToNextPhoto,
      goToPreviousPhoto,
      previousPhotoAvailable,
      nextPhotoAvailable,
    } = this.props;
    if (this.hoverPosition === 'left' && previousPhotoAvailable) {
      goToPreviousPhoto();
    } else if (this.hoverPosition === 'right' && nextPhotoAvailable) {
      goToNextPhoto();
    }
  };

  private readonly onOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const { onClose } = this.props;
    const imageRect = this.imageRef.current!.getBoundingClientRect();
    if (e.clientX < imageRect.left
        || e.clientX > imageRect.right
        || e.clientY < imageRect.top
        || e.clientY > imageRect.bottom) {
          onClose();
    }
  };

  render() {
    const {
      image,
      previousPhotoAvailable,
      nextPhotoAvailable,
      goToNextPhoto,
      goToPreviousPhoto,
    } = this.props;
    return (
      <div className={styles.lightboxBackdrop} onClick={this.onOutsideClick}>
        <Swipeable
            onSwipedLeft={goToPreviousPhoto}
            onSwipedRight={goToNextPhoto}
            className={styles.swipeable}
        >
          <div className={styles.container}>
              <img
                  alt="lightbox"
                  ref={this.imageRef}
                  onMouseMove={this.onMouseMove}
                  onClick={this.onClick}
                  className={classNames(styles.lightboxPhoto, {
                    [styles.leftCursor]: this.hoverPosition === 'left' && previousPhotoAvailable,
                    [styles.rightCursor]: this.hoverPosition === 'right' && nextPhotoAvailable,
                  })}
                  src={image}
              />
            <div className={styles.arrows}>
              <img
                  src={chevron}
                  className={classNames(styles.leftArrow, previousPhotoAvailable && styles.visible)}
                  onClick={previousPhotoAvailable ? (e: React.MouseEvent) => {
                    e.stopPropagation();
                    goToPreviousPhoto();
                  } : undefined}
                  alt="previous"
              />
              <img
                  src={chevron}
                  className={classNames(styles.rightArrow, nextPhotoAvailable && styles.visible)}
                  onClick={nextPhotoAvailable ? (e: React.MouseEvent) => {
                    e.stopPropagation();
                    goToNextPhoto();
                  } : undefined}
                  alt="next"
              />
            </div>
          </div>
        </Swipeable>
      </div>
    );
  }
}
