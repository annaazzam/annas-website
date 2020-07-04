import * as mobx from 'mobx';
import * as mobxReact from 'mobx-react';
import * as React from 'react';
import Masonry from 'react-masonry-component';
import images, { ImageCollection } from './images_constructor';
import { Lightbox } from './lightbox/lightbox';
import styles from './photography.module.css';
import { Card } from '../card/card';

@mobxReact.observer
export class PhotoJournals extends React.Component {
  @mobx.observable.ref
  private currentCollection?: string;

  componentDidMount() {
    const hash = window.location.hash;
    this.currentCollection = hash.substring(1);
    window.addEventListener('hashchange', this.onHashChange);
  }

  componentWillUnmount() {
    window.removeEventListener('hashchange', this.onHashChange);
  }

  private readonly onHashChange = () => {
    const hash = window.location.hash;
    this.currentCollection = hash.substring(1);
  };

  private readonly getThumbnails = (collectionName: string) => {
    return images.get(collectionName)!.thumbnails;
  };

  private readonly getPhotos = (collectionName: string) => {
    return images.get(collectionName)!.photos;
  };

  private readonly getDisplayName = (collectionName: string) => {
    return images.get(collectionName)!.displayName;
  };

  @mobx.action.bound
  private readonly onCardClick = (collectionFolderName: string) => {
    window.location.hash = collectionFolderName;
    this.currentCollection = collectionFolderName;
  };

  render() {
    // If we are currently viewing a collection, it's stored in the hash e.g. #blackandwhite
    return this.currentCollection ? (
      <>
        <div className={styles.collectionTitle}>
          {this.getDisplayName(this.currentCollection).toUpperCase()}
        </div>
        <PhotoCollection
          photos={this.getPhotos(this.currentCollection)}
          thumbnails={this.getThumbnails(this.currentCollection)}
        />
      </>
    ) : (
      <CollectionGrid onCardClick={this.onCardClick} wrap={true} />
    );
  }
}

export class CollectionGrid extends React.Component<{
  wrap?: boolean;
  numCollections?: number;
  onCardClick(collectionFolderName: string): void;
}> {
  private readonly getCollections = () => {
    const { numCollections } = this.props;
    const collections: ImageCollection[] = [];
    images.forEach((collection) => collections.push(collection));
    return collections.slice(0, numCollections);
  };

  render() {
    const { wrap = false, onCardClick } = this.props;
    return (
      <div
        className={styles.photographyCards}
        style={{ flexWrap: wrap ? 'wrap' : 'nowrap' }}
      >
        {this.getCollections().map(({ displayName, photos, folderName }, i) => (
          <Card
            text={displayName}
            image={photos[0]}
            key={i}
            onClick={() => onCardClick(folderName)}
            largeImage={true}
          />
        ))}
      </div>
    );
  }
}

@mobxReact.observer
export class PhotoCollection extends React.Component<{
  photos: string[];
  thumbnails: string[];
}> {
  // Index in the `photos` array of the image which is currently open in the lightbox.
  // No image is open if `openLightbox` is undefined;
  @mobx.observable.ref
  private openLightboxIndex?: number;

  @mobx.action.bound
  private onPhotoClick(index: number) {
    this.openLightboxIndex = index;
  }

  @mobx.action.bound
  private onLightboxClose() {
    this.openLightboxIndex = undefined;
  }

  @mobx.action.bound
  private goToNextPhoto() {
    this.openLightboxIndex! += 1;
  }

  @mobx.action.bound
  private goToPreviousPhoto() {
    this.openLightboxIndex! -= 1;
  }

  @mobx.computed
  private get nextPhotoAvailable() {
    const { photos } = this.props;
    return (
      this.openLightboxIndex !== undefined &&
      this.openLightboxIndex < photos.length - 1
    );
  }

  @mobx.computed
  private get previousPhotoAvailable() {
    return this.openLightboxIndex !== undefined && this.openLightboxIndex > 0;
  }

  private readonly onKeyDown = (e: KeyboardEvent) => {
    if (!this.openLightboxIndex === undefined) {
      return;
    }
    // Prevent default to stop whole page scrolling.
    e.preventDefault();
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      this.previousPhotoAvailable && this.goToPreviousPhoto();
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      this.nextPhotoAvailable && this.goToNextPhoto();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
  }

  render() {
    const { photos, thumbnails } = this.props;

    const masonryOptions = {
      horizontalOrder: true,
      columnWidth: 10,
    };

    return (
      <div>
        {this.openLightboxIndex !== undefined && (
          <Lightbox
            image={photos[this.openLightboxIndex]}
            onClose={this.onLightboxClose}
            previousPhotoAvailable={this.previousPhotoAvailable}
            nextPhotoAvailable={this.nextPhotoAvailable}
            goToPreviousPhoto={this.goToPreviousPhoto}
            goToNextPhoto={this.goToNextPhoto}
          />
        )}
        <Masonry className={styles.photosMasonry} options={masonryOptions}>
          {thumbnails.map((image, index) => (
            <div onClick={() => this.onPhotoClick(index)} key={index}>
              {/* TODO: Add meaningful description/alt text for each photo */}
              <img
                alt="slideshow"
                src={image}
                className={styles.photoElement}
              />
            </div>
          ))}
        </Masonry>
      </div>
    );
  }
}
