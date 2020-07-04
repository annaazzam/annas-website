import * as React from 'react';
import { Link } from 'react-router-dom';
import styles from './button.module.css';

export const Button = ({ label, link, external }: {
  label: string,
  link?: string,
  external?: boolean,
}) =>  {
  const content = (
      <div className={styles.button}>
        {label}
      </div>
  );
  return (
    <div className={styles.container}>
      {link
        ? (external
          ? <a href={link} target="_">{content}</a>
          : <Link to={link}>{content}</Link>)
        : content}
    </div>
  );
};
