import * as React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from 'react-router-dom';
import { Blog } from './blog/blog';
import { HelpButton } from './help_button/help_button';
import { Home } from './home/home';
import { Navbar } from './navbar/navbar';
import { PhotoJournals } from './photography/photography';
import { Projects } from './projects/projects';
import styles from './main.module.css';

function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export class Main extends React.Component {
  render() {
    return (
        <Router>
          <div className={styles.app}>
            <Navbar/>
            <div className={styles.content}>
              <Switch>
                <Route exact path="/">
                  <ScrollToTop/>
                  <Home/>
                </Route>
                <Route path="/photojournals">
                  <ScrollToTop/>
                  <PhotoJournals/>
                </Route>
                <Route path="/blog">
                  <ScrollToTop/>
                  <Blog/>
                </Route>
                <Route path="/projects">
                  <ScrollToTop/>
                  <Projects/>
                </Route>
              </Switch>
            </div>
            <div className={styles.helpButton}>
              <HelpButton/>
            </div>
          </div>
        </Router>
    );
  }
}
