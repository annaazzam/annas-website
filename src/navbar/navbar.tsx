import classNames from 'classnames';
import * as mobx from 'mobx';
import * as mobxReact from 'mobx-react';
import * as React from 'react';
import {
  Link,
  useLocation,
  withRouter,
  RouteChildrenProps,
} from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import styles from './navbar.module.css';

import mediumIcon from './social_icons/medium.svg';
import githubIcon from './social_icons/github.svg';
import linkedinIcon from './social_icons/linkedin.svg';
import stackOverflowIcon from './social_icons/stackOverflow.svg';
// import instagramIcon from './social_icons/instagram.svg';
import menuIcon from './menu-icon.svg';

type NavbarItem = {
  text: string;
  route: string;
};

// Window width at which we start showing hamburger menu instead of expanded navbar.
const COLLAPSE_BREAKPOINT = 850;

@mobxReact.observer
export class Navbar extends React.Component {
  @mobx.observable.ref
  private collapse: boolean = false;

  @mobx.action.bound
  componentDidMount() {
    this.collapse = window.innerWidth < COLLAPSE_BREAKPOINT;
    window.addEventListener('resize', this.onResize);
  }

  componentWillUmount() {
    window.removeEventListener('resize', this.onResize);
  }

  @mobx.action.bound
  private readonly onResize = () => {
    this.collapse = window.innerWidth < COLLAPSE_BREAKPOINT;
  };

  private readonly routes: NavbarItem[] = [
    { text: 'Home', route: '/' },
    { text: 'Blog', route: '/blog' },
    { text: 'Projects', route: '/projects' },
    { text: 'Photo Journals', route: '/photojournals' },
  ];

  private readonly HamburgerMenu = withRouter((props: RouteChildrenProps) => (
    <HamburgerMenuImpl routes={this.routes} {...props} />
  ));

  render() {
    return (
      <div className={styles.navbarContainer}>
        <div className={styles.socialIconsWrapper}>
          <SocialIcons />
        </div>
        {this.collapse ? (
          <this.HamburgerMenu />
        ) : (
          <DesktopItems routes={this.routes} />
        )}
      </div>
    );
  }
}

type MenuProps = {
  routes: NavbarItem[];
};

@mobxReact.observer
class HamburgerMenuImpl extends React.Component<
  MenuProps & RouteChildrenProps
> {
  @mobx.observable.ref
  private isMenuOpen: boolean = false;

  @mobx.action
  private readonly openMenu = () => {
    this.isMenuOpen = true;
  };

  @mobx.action
  private readonly closeMenu = () => {
    this.isMenuOpen = false;
  };

  render() {
    const { location, routes } = this.props;
    const currentPage = location.pathname;

    return (
      <>
        <div
          className={classNames(styles.menu, this.isMenuOpen && styles.visible)}
        >
          {routes.map(({ text, route }, i) => (
            <div
              key={i}
              onClick={() => {
                this.closeMenu();
                route === currentPage && window.location.reload();
              }}
            >
              <Link to={route}>
                <div
                  className={classNames(styles.navbarItem, {
                    [styles.currentNavbarItem]: currentPage === route,
                  })}
                >
                  {text.toUpperCase()}
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div
          className={classNames(
            styles.backgroundOverlay,
            this.isMenuOpen && styles.visible,
          )}
          onClick={this.closeMenu}
        />
        <img
          alt="menu"
          src={menuIcon}
          className={styles.menuIcon}
          onClick={this.openMenu}
        />
      </>
    );
  }
}

const DesktopItems = mobxReact.observer(({ routes }: MenuProps) => {
  const currentPage = useLocation().pathname;

  return (
    <div className={styles.navItems}>
      {routes.map(({ text, route }, i) => (
        <div
          key={i}
          className={classNames(styles.navbarItem, {
            [styles.currentNavbarItem]: currentPage === route,
          })}
          onClick={() => {
            route === currentPage && window.location.reload();
          }}
        >
          <Link to={route}>{text.toUpperCase()}</Link>
        </div>
      ))}
    </div>
  );
});

type Social = {
  icon: string;
  link: string;
  name: string;
};

class SocialIcons extends React.Component {
  private readonly socials: Social[] = [
    { name: 'Medium', icon: mediumIcon, link: 'https://medium.com/@annaazzam' },
    { name: 'GitHub', icon: githubIcon, link: 'https://github.com/annaazzam' },
    {
      name: 'Linkedin',
      icon: linkedinIcon,
      link: 'https://www.linkedin.com/in/annaazzam/',
    },
    // {
    //   name: 'Instagram',
    //   icon: instagramIcon,
    //   link: 'https://www.instagram.com/annaazzam/',
    // },
    {
      name: 'Stack Overflow',
      icon: stackOverflowIcon,
      link: 'https://stackoverflow.com/users/10914325/anna-azzam',
    },
  ];

  render() {
    return (
      <div className={styles.socialIcons}>
        {this.socials.map(({ icon, link, name }, i: number) => (
          <div key={i} className={styles.socialIconContainer}>
            <ReactTooltip id={name} place="bottom">
              {name}
            </ReactTooltip>
            <a data-tip data-for={name} href={link} target="_">
              <img alt={name} src={icon} className={styles.socialIcon} />
            </a>
          </div>
        ))}
      </div>
    );
  }
}
