'use client';

import { Button, Typography } from '@mui/material';
import styles from './ExperienceLevel.module.scss';

type ExperienceLevelProps = {};
const ExperienceLevel: React.FC<ExperienceLevelProps> = ({}) => {
  return (
    <div className={styles.experienceContainer}>
      <div className={styles.title}>
        <Typography variant="h3" component="h1">
          How long have you been working?
        </Typography>
      </div>
      <div className={styles.title}>
        <Typography variant="h6" component="h2">
          We'll find the best templates for your experience level.
        </Typography>
      </div>
      <div className={styles.buttonGroup}>
        <Button variant="outlined" size="large" className={styles.buttonWrapper}>
          <Typography variant="h6" component="h3">
            No Experience
          </Typography>
        </Button>
        <Button variant="outlined" size="large" className={styles.buttonWrapper}>
          <Typography variant="h6" component="h3">
            Less Then 3 Years
          </Typography>
        </Button>
        <Button variant="outlined" size="large" className={styles.buttonWrapper}>
          <Typography variant="h6" component="h3">
            3-5 Years
          </Typography>
        </Button>
        <Button variant="outlined" size="large" className={styles.buttonWrapper}>
          <Typography variant="h6" component="h3">
            5-10 Years
          </Typography>
        </Button>
        <Button variant="outlined" size="large" className={styles.buttonWrapper}>
          <Typography variant="h6" component="h3">
            10+ Years
          </Typography>
        </Button>
      </div>
    </div>
  );
};

export default ExperienceLevel;
