import { ButtonBase, Tooltip, Typography } from '@mui/material';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useTranslation } from 'next-i18next';
import { RedoOutlined, UndoOutlined } from '@mui/icons-material';
import { ActionCreators } from 'redux-undo';
import { cn } from '@/utils/styles';
import { EditorButtonProps } from '@/types/editor';

const UndoResumeButton: React.FC<EditorButtonProps> = ({ hideTitle = false, hideTooltip = false }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { past } = useAppSelector((state) => state.resume);

  const handleUndo = () => dispatch(ActionCreators.undo());

  return (
    <Tooltip arrow placement="top" title={hideTooltip ? '' : t('builder.controller.tooltip.undo')}>
      <ButtonBase onClick={handleUndo} className={cn({ 'pointer-events-none opacity-50': past.length < 2 })}>
        <UndoOutlined fontSize="medium" />
        {!hideTitle && <Typography sx={{ marginLeft: '10px' }}>{t('builder.controller.tooltip.undo')}</Typography>}
      </ButtonBase>
    </Tooltip>
  );
};

const RedoResumeButton: React.FC<EditorButtonProps> = ({ hideTitle = false, hideTooltip = false }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { future } = useAppSelector((state) => state.resume);

  const handleRedo = () => dispatch(ActionCreators.redo());

  return (
    <Tooltip arrow placement="top" title={hideTooltip ? '' : t('builder.controller.tooltip.redo')}>
      <ButtonBase onClick={handleRedo} className={cn({ 'pointer-events-none opacity-50': future.length === 0 })}>
        <RedoOutlined fontSize="medium" />
        {!hideTitle && <Typography sx={{ marginLeft: '10px' }}>{t('builder.controller.tooltip.redo')}</Typography>}
      </ButtonBase>
    </Tooltip>
  );
};

export { UndoResumeButton, RedoResumeButton };
