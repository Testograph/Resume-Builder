import { ButtonBase, Tooltip, Typography } from '@mui/material';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useTranslation } from 'next-i18next';
import { DriveFileRenameOutline } from '@mui/icons-material';
import { EditorButtonProps } from '@/types/editor';
import { setModalState } from '@/store/modal/modalSlice';
import queryClient from '@/services/react-query';
import { RESUMES_QUERY } from '@/constants/index';
import { Resume } from 'schema';
import { useRouter } from 'next/router';

const RenameResumeButton: React.FC<EditorButtonProps> = ({ hideTitle = false, hideTooltip = false }) => {
  const { t } = useTranslation();
  const router = useRouter();

  const resume = useAppSelector((state) => state.resume.present);
  const dispatch = useAppDispatch();
  const handleRename = () => {
    dispatch(
      setModalState({
        modal: 'dashboard.rename-resume',
        state: {
          open: true,
          payload: {
            item: resume,
            onComplete: (newResume: Resume) => {
              queryClient.invalidateQueries(RESUMES_QUERY);

              router.push(`/${resume.user.username}/${newResume.slug}/builder`);
            },
          },
        },
      }),
    );
  };

  return (
    <Tooltip arrow placement="top" title={hideTooltip ? '' : t('builder.header.menu.rename')}>
      <ButtonBase onClick={handleRename}>
        <DriveFileRenameOutline className="scale-90" />
        {!hideTitle && <Typography sx={{ marginLeft: '10px' }}>{t('builder.header.menu.rename')}</Typography>}
      </ButtonBase>
    </Tooltip>
  );
};

export default RenameResumeButton;
