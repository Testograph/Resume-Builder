import { ButtonBase, Tooltip, Typography } from '@mui/material';

import { useAppSelector } from '@/store/hooks';
import { useTranslation } from 'next-i18next';
import { CopyAll } from '@mui/icons-material';
import { EditorButtonProps } from '@/types/editor';
import queryClient from '@/services/react-query';
import { RESUMES_QUERY } from '@/constants/index';
import { Resume } from 'schema';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { ServerError } from '@/services/axios';
import { DuplicateResumeParams, duplicateResume } from '@/services/resume';

const DuplicateResumeButton: React.FC<EditorButtonProps> = ({ hideTitle = false, hideTooltip = false }) => {
  const { t } = useTranslation();
  const router = useRouter();

  const resume = useAppSelector((state) => state.resume.present);
  const { mutateAsync: duplicateMutation } = useMutation<Resume, ServerError, DuplicateResumeParams>(duplicateResume);

  const handleDuplicate = async () => {
    const newResume = await duplicateMutation({ id: resume.id });

    queryClient.invalidateQueries(RESUMES_QUERY);

    router.push(`/${resume.user.username}/${newResume.slug}/builder`);
  };

  return (
    <Tooltip arrow placement="top" title={hideTooltip ? '' : t('builder.header.menu.duplicate')}>
      <ButtonBase onClick={handleDuplicate}>
        <CopyAll className="scale-90" />
        {!hideTitle && <Typography sx={{ marginLeft: '10px' }}>{t('builder.header.menu.duplicate')}</Typography>}
      </ButtonBase>
    </Tooltip>
  );
};

export default DuplicateResumeButton;
