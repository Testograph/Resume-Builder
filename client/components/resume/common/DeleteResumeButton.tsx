import { ButtonBase, Tooltip, Typography } from '@mui/material';

import { useAppSelector } from '@/store/hooks';
import { useTranslation } from 'next-i18next';
import { Delete } from '@mui/icons-material';
import { EditorButtonProps } from '@/types/editor';
import queryClient from '@/services/react-query';
import { RESUMES_QUERY } from '@/constants/index';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { ServerError } from '@/services/axios';
import { DeleteResumeParams, deleteResume } from '@/services/resume';

const DeleteResumeButton: React.FC<EditorButtonProps> = ({ hideTitle = false, hideTooltip = false }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { mutateAsync: deleteMutation } = useMutation<void, ServerError, DeleteResumeParams>(deleteResume);
  const goBack = () => router.push('/dashboard');

  const resume = useAppSelector((state) => state.resume.present);
  const handleDelete = async () => {
    await deleteMutation({ id: resume.id });

    queryClient.invalidateQueries(RESUMES_QUERY);

    goBack();
  };

  return (
    <Tooltip arrow placement="top" title={hideTooltip ? '' : t('builder.header.menu.tooltips.delete')}>
      <ButtonBase onClick={handleDelete}>
        <Delete className="scale-90" />
        {!hideTitle && <Typography sx={{ marginLeft: '10px' }}>{t('builder.header.menu.delete')}</Typography>}
      </ButtonBase>
    </Tooltip>
  );
};

export default DeleteResumeButton;
