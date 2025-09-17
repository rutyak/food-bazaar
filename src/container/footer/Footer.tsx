import React, { useContext } from 'react';
import * as homeFooter from './Footer.module.scss';
import { Text } from '@chakra-ui/react';

const Footer = () => {

  const styles: any = homeFooter;

  return (
    <footer className={styles.footer}>
      <div className={styles["container"]}>
        <div className={styles["footer-content"]}>
          <div className={styles["footer-column"]}>
            <Text color='#4be7e7'>About Us</Text>
            <p>Indias fastest delivery app, Providing good food with rewards. free registration and enjoy enjoy meal. Buy 2 items get free delivary</p>
          </div>
          <div className={styles["footer-column"]}>
            <Text color='#4be7e7'>Services</Text>
            <ul>
              <li>Web Design</li>
              <li>Graphic Design</li>
              <li>SEO</li>
            </ul>
          </div>
          <div className={styles["footer-column"]}>
            <Text color='#4be7e7'>Contact Us</Text>
            <p>Email: foodbazaar.official@gmail.com</p>
            <p>Phone: 123-456-7890</p>
          </div>
        </div>
        <div className={styles["footer-bottom"]}>
          <p>&copy; 2024 Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
