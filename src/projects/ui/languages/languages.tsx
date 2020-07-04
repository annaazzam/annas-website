import * as React from 'react';
import styles from './languages.module.css';

export const Languages = ({ languages }: { languages: string[] }) => {
  const icons = new Map<string, string>([
    [
      'javascript',
      'https://img.icons8.com/color/48/000000/javascript-logo-1.png',
    ],
    ['css', 'https://img.icons8.com/color/48/000000/css3.png'],
    ['html', 'https://img.icons8.com/color/48/000000/html-5.png'],
    [
      'json',
      'https://img.icons8.com/color/32/000000/placeholder-thumbnail-json-1.png',
    ],
    ['react', 'https://img.icons8.com/color/48/000000/react-native.png'],
    ['mobx', 'https://miro.medium.com/max/1200/1*Hlj8qvb2M0oqjgk36Yz5LA.png'],
    ['typescript', 'https://img.icons8.com/color/48/000000/typescript.png'],
  ]);
  return (
    <div className={styles.container}>
      {languages.map((language, i) => {
        const icon = icons.get(language.toLowerCase());
        return (
          <div className={styles.pill} key={i}>
            {icon && (
              <img
                className={styles.icon}
                src={icon}
                alt="programming-language"
              />
            )}
            {language.toUpperCase()}
          </div>
        );
      })}
    </div>
  );
};
