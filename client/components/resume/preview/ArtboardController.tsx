import {
  AlignHorizontalCenter,
  AlignVerticalCenter,
  FilterCenterFocus,
  InsertPageBreak,
  ZoomIn,
  ZoomOut,
} from '@mui/icons-material';
import { ButtonBase, Divider, Tooltip, useMediaQuery, useTheme } from '@mui/material';
import get from 'lodash/get';
import { useTranslation } from 'next-i18next';
import { ReactZoomPanPinchHandlers } from 'react-zoom-pan-pinch';

import { togglePageBreakLine, togglePageOrientation } from '@/store/build/buildSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { cn } from '@/utils/styles';

import styles from './ArtboardController.module.scss';

const ArtboardController: React.FC<ReactZoomPanPinchHandlers> = ({ zoomIn, zoomOut, centerView, resetTransform }) => {
  const { t } = useTranslation();

  const theme = useTheme();
  const dispatch = useAppDispatch();

  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  const { present: resume } = useAppSelector((state) => state.resume);
  const pages = get(resume, 'metadata.layout');
  const orientation = useAppSelector((state) => state.build.page.orientation);

  const handleTogglePageBreakLine = () => dispatch(togglePageBreakLine());

  const handleTogglePageOrientation = () => dispatch(togglePageOrientation());

  return (
    <div className={styles.container}>
      <div className={styles.controller}>
        <Tooltip arrow placement="top" title={t('builder.controller.tooltip.zoom-in')}>
          <ButtonBase onClick={() => zoomIn(0.25)}>
            <ZoomIn fontSize="medium" />
          </ButtonBase>
        </Tooltip>

        <Tooltip arrow placement="top" title={t('builder.controller.tooltip.zoom-out')}>
          <ButtonBase onClick={() => zoomOut(0.25)}>
            <ZoomOut fontSize="medium" />
          </ButtonBase>
        </Tooltip>

        <Tooltip arrow placement="top" title={t('builder.controller.tooltip.center-artboard')}>
          <ButtonBase
            onClick={() => {
              centerView(1);
              resetTransform();
            }}
          >
            <FilterCenterFocus fontSize="medium" />
          </ButtonBase>
        </Tooltip>

        <Divider />

        {isDesktop && (
          <>
            <Tooltip arrow placement="top" title={t('builder.controller.tooltip.toggle-orientation')}>
              <ButtonBase
                onClick={handleTogglePageOrientation}
                className={cn({ 'pointer-events-none opacity-50': pages.length === 1 })}
              >
                {orientation === 'vertical' ? (
                  <AlignHorizontalCenter fontSize="medium" />
                ) : (
                  <AlignVerticalCenter fontSize="medium" />
                )}
              </ButtonBase>
            </Tooltip>

            <Tooltip arrow placement="top" title={t('builder.controller.tooltip.toggle-page-break-line')}>
              <ButtonBase onClick={handleTogglePageBreakLine}>
                <InsertPageBreak fontSize="medium" />
              </ButtonBase>
            </Tooltip>
          </>
        )}
      </div>
    </div>
  );
};

export default ArtboardController;
