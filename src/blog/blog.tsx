import * as React from 'react';
import RSSParser from 'rss-parser';
import styles from './blog.module.css';
import { Card } from '../card/card';
import cardStyles from '../card/card.module.css';

type BlogPost = {
  title?: string;
  image?: string;
  pubDate?: string;
  link?: string;
};

export const hardcodedBlogsPosts: BlogPost[] = [
  {
    title: "3 Ways to Remove Duplicates in JavaScript Arrays",
    image: "https://miro.medium.com/max/4800/1*lDOC1idA-kOEXWELjOMlwQ.png",
    pubDate: "Fri, 22 Jan 2021",
    link: "https://annaazzam.medium.com/3-ways-to-remove-duplicates-in-javascript-arrays-41775c7caf91",
  },
  {
    title: "React Functional vs. Class Components",
    image: "https://cdn-images-1.medium.com/max/500/1*AByIfmKBF6hFjLuA0hpSxg.jpeg",
    pubDate: "Thu, 21 Jan 2021",
    link: "https://medium.com/swlh/react-functional-vs-class-components-517be1d9ff13?source=rss-8e7d2b0e2483------2",
  },
  {
    title: "Add Windowing to Your Webpage with Intersection Observer",
    image: "https://cdn-images-1.medium.com/max/500/1*Ja91YFGlclW_n9sICdDkXw.jpeg",
    pubDate: "Wed, 08 Jul 2020",
    link: "https://codeburst.io/add-windowing-to-your-webpage-with-intersection-observer-8e9067387cfb?source=rss-8e7d2b0e2483------2",
  },
  {
    title: "4 Fun JavaScript Web APIs to Try",
    image: "https://cdn-images-1.medium.com/max/500/1*ZD0XuFQhv10QOtRulDJiwQ.jpeg",
    pubDate: "Wed, 17 Jun 2020",
    link: "https://medium.com/swlh/4-fun-javascript-web-apis-to-try-8ef1e6ede1fd?source=rss-8e7d2b0e2483------2",
  },
  {
    title: "3 Ways to Initialize an Array with Conditional Elements in JavaScript",
    image: "https://cdn-images-1.medium.com/max/500/1*J7QqISsZ8fuDHtfEvy4rIQ.png",
    pubDate: "Mon, 15 Jun 2020",
    link: "https://codeburst.io/3-ways-to-initialize-an-array-with-conditional-elements-in-javascript-c95397615a7e?source=rss-8e7d2b0e2483------2",
  },
  {
    title: "TypeScript vs. JavaScript: Why you should switch to TypeScript",
    image: "https://cdn-images-1.medium.com/max/500/1*_fwFCjaPrth8igpUJ7nHIw.png",
    pubDate: "Fri, 05 Jun 2020",
    link: "https://medium.com/weekly-webtips/typescript-vs-javascript-why-you-should-switch-to-typescript-31654de9a664?source=rss-8e7d2b0e2483------2",
  },
  {
    title: "Aggregation vs. Composition in Object Oriented Programming",
    image: "https://cdn-images-1.medium.com/max/500/1*iYhUsIOIR8C32645dE_meA.jpeg",
    pubDate: "Thu, 04 Jun 2020",
    link: "https://medium.com/swlh/aggregation-vs-composition-in-object-oriented-programming-3fa4fd471a9f?source=rss-8e7d2b0e2483------2",
  },
  {
    title: "3 Tips to Declutter Your Phone",
    image: "https://cdn-images-1.medium.com/max/500/1*l9HYr52hidcFQJLANVshUQ.png",
    pubDate: "Thu, 04 Jun 2020",
    link: "https://medium.com/@annaazzam/3-tips-to-declutter-your-phone-36d282c4cb85?source=rss-8e7d2b0e2483------2",
  },
  {
    title: "MobX and Async Actions",
    image: "https://cdn-images-1.medium.com/max/500/1*fH7s-bxlR35brJcURj4rIQ.jpeg",
    pubDate: "Wed, 16 Oct 2019",
    link: "https://medium.com/@annaazzam/mobx-and-async-actions-e68f488a9b0d?source=rss-8e7d2b0e2483------2",
  },
  {
    title: "Getting a Software Job: Technical Interview Tips",
    image: "https://miro.medium.com/max/4800/1*6anw8-I8GsHuCeq-6WkwFQ.jpeg",
    pubDate: "Sun, 13 Oct 2019",
    link: "https://annaazzam.medium.com/getting-a-software-job-technical-interview-tips-8732555074a0",
  },
  {
    title: "Low performance CSS transitions, and some alternatives",
    image: "https://miro.medium.com/max/4800/1*AcHHGd9VUvJD8ZuNvGpuxw.jpeg",
    pubDate: "Mon, 5 Aug 2019",
    link: "https://codeburst.io/low-performance-css-transitions-and-some-alternatives-f84ff35bf07",
  },
];

// Note: RSS Feed has a limitation that it only gets the 8 most recent blog posts :( 
// Until I find a better solution, just going to hardcode the posts for now.

export function getBlogsFromRss(): Promise<BlogPost[]> {
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

        const pubdateDateOnly = item.pubDate
          ? item.pubDate?.split(' ').slice(0, 4).join(' ')
          : undefined;
        return {
          title: item.title,
          image: reducedQualityImgSrc,
          pubDate: pubdateDateOnly,
          link: item.link,
        };
      });
      // Medium considers comments the same as blog posts. Until I find a better way to filter them
      // out, putting this hack here:
      blogPosts = blogPosts.filter(({ title }) => {
        const commentStrings = ['Thanks Ehsan', 'Thanks Sean'];
        const isComment = commentStrings.find(comment => title?.includes(comment));
        return !isComment;
      });
      resolve(blogPosts);
    });
  });
}

export class Blog extends React.Component {
  render() {
    return (
      <BlogGrid blogPosts={hardcodedBlogsPosts} wrap={true} numPlaceholders={8} />
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
    {blogPosts.map(({ title, image, link, pubDate }: BlogPost, i: number) => (
      <div className={styles.blogCard} key={i}>
        <Card
          text={title}
          subtitle={pubDate}
          image={image}
          link={link}
          overlayText="Read on medium"
          ariaLabel={`Open blog post on Medium: ${title}`}
        />
      </div>
    ))}
  </div>
);
