import { ButtonBase, Tooltip } from '@mui/material';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useTranslation } from 'next-i18next';
import { RedoOutlined, UndoOutlined } from '@mui/icons-material';
import { ActionCreators } from 'redux-undo';
import { cn } from '@/utils/styles';

const UndoRedoResumeButton = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { past, future } = useAppSelector((state) => state.resume);

  const handleUndo = () => dispatch(ActionCreators.undo());
  const handleRedo = () => dispatch(ActionCreators.redo());

  return (
    <>
      <Tooltip arrow placement="top" title={t('builder.controller.tooltip.undo')}>
        <ButtonBase onClick={handleUndo} className={cn({ 'pointer-events-none opacity-50': past.length < 2 })}>
          <UndoOutlined fontSize="medium" />
        </ButtonBase>
      </Tooltip>

      <Tooltip arrow placement="top" title={t('builder.controller.tooltip.redo')}>
        <ButtonBase onClick={handleRedo} className={cn({ 'pointer-events-none opacity-50': future.length === 0 })}>
          <RedoOutlined fontSize="medium" />
        </ButtonBase>
      </Tooltip>
    </>
  );
};

export default UndoRedoResumeButton;
