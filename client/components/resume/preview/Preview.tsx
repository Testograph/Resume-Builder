'use client';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

import Page from '@/components/build/Center/Page';
import { useAppSelector } from '@/store/hooks';

import styles from './Preview.module.scss';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import ArtboardController from './ArtboardController';
import { cn } from '@/utils/styles';

const Preview = () => {
  const resume = useAppSelector((state) => state.resume.present);
  const orientation = useAppSelector((state) => state.build.page.orientation);

  if (isEmpty(resume)) return null;

  const layout: string[][][] = get(resume, 'metadata.layout', []);

  return (
    <TransformWrapper
      centerOnInit
      initialPositionX={0}
      initialPositionY={0}
      minScale={0.5}
      maxScale={1}
      initialScale={0.8}
      // limitToBounds={false}
      pinch={{ step: 1 }}
      wheel={{ disabled: true }}
    >
      {(controllerProps) => (
        <>
          <TransformComponent wrapperClass={styles.wrapper}>
            <div
              className={cn({
                [styles.artboard]: true,
                'flex-col': orientation === 'vertical',
              })}
            >
              {layout.map((_, pageIndex) => (
                <Page key={pageIndex} page={pageIndex} showPageNumbers />
              ))}
            </div>
          </TransformComponent>

          <ArtboardController {...controllerProps} />
        </>
      )}
    </TransformWrapper>
  );
};

export default Preview;
