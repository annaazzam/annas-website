import * as mobx from 'mobx';
import * as mobxReact from 'mobx-react';
import * as React from 'react';
import RSSParser from 'rss-parser';
import styles from './blog.module.css';
import { Card } from '../card/card';
import cardStyles from '../card/card.module.css';

export type BlogPost = {
  title?: string;
  image?: string;
  pubDate?: string;
  link?: string;
};

export function getBlogs(): Promise<BlogPost[]> {
  const corsPrefix = 'https://cors-anywhere.herokuapp.com/';
  const blogUrl = 'https://medium.com/feed/@annaazzam';
  const url = corsPrefix + blogUrl;
  let parser = new RSSParser();

  return new Promise((resolve, error) => {
    let blogPosts: BlogPost[] = [];
    parser.parseURL(url, (err, feed) => {
      err && error();
      if (!(feed && feed.items)) {
        return;
      }
      blogPosts = feed.items.map((item) => {
        const el = document.createElement('html');
        el.innerHTML = item.content || item['content:encoded'] || '';
        const firstImg = el.getElementsByTagName('img')[0];
        const imgSrc = firstImg && firstImg.src;
        const reducedQualityImgSrc = imgSrc.replace(
          /max\/[0-9]+\//g,
          'max/500/',
        );
        return {
          title: item.title,
          image: reducedQualityImgSrc,
          pubDate: item.pubDate,
          link: item.link,
        };
      });
      // Medium considers comments the same as blog posts. Until I find a better way to filter them
      // out, putting this hack here:
      blogPosts = blogPosts.filter(({ title }) => !title?.includes('Thanks Sean'));
      resolve(blogPosts);
    });
  });
}

@mobxReact.observer
export class Blog extends React.Component {
  @mobx.observable.ref
  private blogPosts: BlogPost[] = [];

  @mobx.action
  async componentDidMount() {
    this.blogPosts = await getBlogs();
  }

  render() {
    return (
      <BlogGrid blogPosts={this.blogPosts} wrap={true} numPlaceholders={8} />
    );
  }
}

export const BlogGrid = ({
  blogPosts,
  numPlaceholders = 0,
  wrap = false,
}: {
  blogPosts: BlogPost[];
  numPlaceholders?: number;
  wrap?: boolean;
}) => (
  <div
    className={styles.blogCards}
    style={{ flexWrap: wrap ? 'wrap' : 'nowrap' }}
  >
    {blogPosts.length === 0 && (
      <>
        {Array(numPlaceholders)
          .fill(0)
          .map((_, key) => (
            <div className={styles.blogCard} key={key} >
              <div className={cardStyles.placeholder} />
            </div>
          ))}
      </>
    )}
    {blogPosts.map(({ title, image, link }: BlogPost, i: number) => (
      <div className={styles.blogCard}>
        <Card
          text={title}
          image={image}
          link={link}
          overlayText="Read on medium"
          key={i}
        />
      </div>
    ))}
  </div>
);
