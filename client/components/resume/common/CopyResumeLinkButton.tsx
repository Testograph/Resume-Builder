import { ButtonBase, Tooltip, Typography } from '@mui/material';

import { useAppSelector } from '@/store/hooks';
import { useTranslation } from 'next-i18next';
import getResumeUrl from '@/utils/getResumeUrl';
import toast from 'react-hot-toast';
import { Link } from '@mui/icons-material';
import { EditorButtonProps } from '@/types/editor';

const CopyResumeLinkButton: React.FC<EditorButtonProps> = ({ hideTitle = false, hideTooltip = false }) => {
  const { t } = useTranslation();
  const resume = useAppSelector((state) => state.resume.present);

  const handleCopyLink = async () => {
    const url = getResumeUrl(resume, { withHost: true });
    await navigator.clipboard.writeText(url);

    toast.success(t('common.toast.success.resume-link-copied'));
  };

  return (
    <Tooltip arrow placement="top" title={hideTooltip ? '' : t('builder.controller.tooltip.copy-link')}>
      <ButtonBase onClick={handleCopyLink}>
        <Link fontSize="medium" />
        {!hideTitle && <Typography sx={{ marginLeft: '10px' }}>{t('builder.controller.tooltip.copy-link')}</Typography>}
      </ButtonBase>
    </Tooltip>
  );
};

export default CopyResumeLinkButton;
