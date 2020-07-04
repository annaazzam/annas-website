import * as React from 'react';
import styles from './laptop_demo.module.css';
import laptopImg from './laptop.png';

export const LaptopDemo = React.memo(({ demoImg }: { demoImg: string }) => (
    <div className={styles.image}>
      <img alt="laptop" src={laptopImg} className={styles.laptop}/>
      <img alt="demo" src={demoImg} className={styles.laptopContents}/>
    </div>
));
