'use client';
import isEmpty from 'lodash/isEmpty';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Resume } from 'schema';

import { fetchResumeByIdentifier } from '@/services/resume';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setResume } from '@/store/resume/resumeSlice';
import styles from '@/styles/pages/Stepper.module.scss';
import BuilderContext from '@/wrappers/BuilderContext';
import { left } from '@/config/sections';
import SideBySideEditor from '@/components/resume/editor/sideBySideEditor';

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'modals', 'builder'])),
  },
});

const StepperBuilder = () => {
  const { currentResume } = useAppSelector((state) => state.editor);
  const { username, slug } = currentResume;
  const [currentSection, setCurrentSection] = useState<string | undefined>(() => left.find((x) => x.order === 1)?.id);
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const { data: resume } = useQuery<Resume>(
    `resume/${username}/${slug}`,
    () => fetchResumeByIdentifier({ username, slug }),
    {
      onSuccess: (resume) => {
        dispatch(setResume(resume));
      },
    },
  );

  useEffect(() => {
    if (resume) dispatch(setResume(resume));
  }, [resume, dispatch]);

  if (!resume || isEmpty(resume)) return null;

  return (
    <BuilderContext highlight={{ enable: true, currentSection: currentSection, setCurrentSection: setCurrentSection }}>
      <div className={styles.container}>
        <Head>
          <title>
            {resume.name} | {t('common.title')}
          </title>
        </Head>

        <SideBySideEditor currentSection={currentSection} setCurrentSection={setCurrentSection} />
      </div>
    </BuilderContext>
  );
};

export default StepperBuilder;
