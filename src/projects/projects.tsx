import * as mobx from 'mobx';
import * as mobxReact from 'mobx-react';
import * as React from 'react';
import styles from './projects.module.css';
import { Card } from '../card/card';
import { NewtabProject } from './newtab/newtab';
import { YoutubeFocusModeProject } from './youtube_extension/youtube_extension';
import { PersonalWebsite } from './personal_website/personal_website';
import { PythonTutorials } from './python_tutorials/python_tutorials';

import newtabExtensionThumbnail from './newtab_extension_thumbnail.jpg';
import youtubeExtensionThumbnail from './youtube_extension_thumbnail.jpg';
import pythonTutorialsThumbnail from './python_tutorials_thumbnail.jpg';
import personalWebsiteThumbnail from './personal_website_thumbnail.jpg';

type Project = {
  name: string,
  displayName: string,
  image: string, 
};

const projects: Project[] = [
  { name: 'youtube-focus-mode', displayName: 'YouTube Focus Mode Chrome Extension', image: youtubeExtensionThumbnail },
  { name: 'simple-newtab', displayName: 'Simple Newtab Chrome Extension', image: newtabExtensionThumbnail },
  { name: 'python-tutorials', displayName: 'Python Tutorial Videos', image: pythonTutorialsThumbnail },
  { name: 'personal-website', displayName: 'Personal Website', image: personalWebsiteThumbnail },
];

@mobxReact.observer
export class Projects extends React.Component {
  @mobx.observable.ref
  private currentProject?: string;

  componentDidMount() {
    const hash = window.location.hash;
    this.currentProject = hash.substring(1);
    window.addEventListener('hashchange', this.onHashChange);
  }

  componentWillUnmount() {
    window.removeEventListener('hashchange', this.onHashChange);
  }

  private readonly onHashChange = () => {
    const hash = window.location.hash;
    this.currentProject = hash.substring(1);
  };

  @mobx.action.bound
  private readonly onCardClick = (name: string) => {
    window.location.hash = name;
    this.currentProject = name;
  };

  private getDisplayName = (projectName: string) => {
    return projects.find(p => p.name === projectName)?.displayName!;
  };

  private readonly renderCurrentProject = () => {
    switch (this.currentProject) {
      case 'simple-newtab':
        return <NewtabProject/>;
      case 'youtube-focus-mode':
        return <YoutubeFocusModeProject/>;
      case 'personal-website':
        return <PersonalWebsite/>;
      case 'python-tutorials':
        return <PythonTutorials/>;
      default:
        return <div>Not found</div>
    }
  };

  render() {
    return this.currentProject
        ? (
            <div className={styles.projectPage}>
              <div className={styles.projectTitle}>
                {this.getDisplayName(this.currentProject).toUpperCase()}
              </div>
              {this.renderCurrentProject()}
            </div>
        ) : <ProjectsGrid onCardClick={this.onCardClick} wrap={true}/>;
  }
}

export const ProjectsGrid = ({
  onCardClick,
  wrap,
  numProjects,
}: {
  onCardClick(name: string): void,
  wrap?: boolean,
  numProjects?: number,
}) => (
    <div className={styles.projectCards} style={{ flexWrap: wrap ? 'wrap' : 'nowrap' }}>
      {projects.slice(0, numProjects).map(({ displayName, image, name }: Project, i: number) => (
          <Card
              text={displayName}
              image={image}
              onClick={() => onCardClick(name)}
              key={i}
              largeImage={true}
          />
      ))}
    </div>
);
