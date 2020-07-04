import classNames from 'classnames';
import * as mobx from 'mobx';
import * as mobxReact from 'mobx-react';
import * as React from 'react';
import styles from './python_tutorials.module.css';

@mobxReact.observer
export class PythonTutorials extends React.Component {
  private readonly videos = [
    { videoId: 'M5ts0NKmqOo', duration: '6:12', videoName: 'Introduction to Python' },
    { videoId: 'X8LInoE2lrQ', duration: '6:55', videoName: 'Syntax and Control Structures' },
    { videoId: 'TqA_kg6nhyo', duration: '5:23', videoName: 'Functions' },
    { videoId: 'hc1sDvTjUo4', duration: '7:19', videoName: 'Modules and Virtual Environments' },
    { videoId: 'BXyEcdTtlm8', duration: '8:08', videoName: 'List Data Structure' },
    { videoId: 'DZss6668dQ0', duration: '7:09', videoName: 'More Data Structures' },
    { videoId: 'f3PA7LveBOA', duration: '12:55', videoName: 'OOP and Encapsulation' },
    { videoId: '7vuO3zEq3J4', duration: '7:22', videoName: 'Abstraction, Inheritance, Abstract Classes' },
    { videoId: 'bPwGhF0n7q0', duration: '4:50', videoName: 'Aggregation and Composition' },
    { videoId: 'lcN56KVITDQ', duration: '9:15', videoName: 'Decorators and Nested Functions' },
    { videoId: '7-jq9MM54Lc', duration: '11:37', videoName: 'File I/O in Python - Text, CSV and Pickle' },
    { videoId: 'oPsuzDvwHgg', duration: '7:53', videoName: 'Pytest Intro' },
    { videoId: 'OJqP-xR5HwA', duration: '9:49', videoName: 'Exception Handling in Python' },
    { videoId: 'TfJHsEVw58c', duration: '4:59', videoName: 'Test Driven Development (TDD)' },
  ];
  
  @mobx.observable.ref
  private videoIndex: number = 0;

  @mobx.action.bound
  private goToNextVideo() {
    this.videoIndex += 1;
  }

  @mobx.action.bound
  private goToPreviousVideo() {
    this.videoIndex -= 1;
  }

  @mobx.action.bound
  private goToItem(i: number) {
    this.videoIndex = i;
  }

  @mobx.computed
  private get nextVideoAvailable() {
    return this.videoIndex < this.videos.length - 1;
  }

  @mobx.computed
  private get previousVideoAvailable() {
    return this.videoIndex > 0;
  }

  render() {
    return (
        <div className={styles.container}>
          <div className={styles.textDescription}>
            Python Video Tutorials covering basics, Object Oriented Principles, and Test Driven Development.
          </div>
          <div className={styles.videoContainer}>
            <iframe
                title="python tutorial"
                className={styles.video}
                src={`https://www.youtube.com/embed/${this.videos[this.videoIndex].videoId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen={true}
            >
            </iframe>
          </div>
          <div className={styles.playlistContainer}>
            <div className={styles.playlistHeader}>
              Now playing - {this.videoIndex + 1}/{this.videos.length}
              <div className={styles.buttons}>
                <div
                    onClick={this.previousVideoAvailable ? this.goToPreviousVideo : undefined}
                    className={classNames(styles.button, !this.previousVideoAvailable && styles.disabled)}
                >
                  {'< Previous'}
                </div>
                <div
                    onClick={this.nextVideoAvailable ? this.goToNextVideo : undefined}
                    className={classNames(styles.button, !this.nextVideoAvailable && styles.disabled)}
                >
                  {'Next >'}
                </div>
              </div>
            </div>
            {this.videos.map(({ videoName, duration }, i) => {
              const isPlaying = i === this.videoIndex;
              return (
                  <div
                      className={classNames(styles.playlistItem, isPlaying && styles.current)}
                      onClick={() => this.goToItem(i)}
                      key={i}
                  >
                    <div className={styles.itemNumber}>{isPlaying
                        ? <div className={styles.play}/>
                        : `${i + 1}`
                    }</div>
                    <div className={styles.durationPill}>{duration}</div>
                    <div className={styles.playlistItemTitle}>{videoName}</div>
                  </div>
              );
            })}
          </div>
        </div>
    );
  }
}
