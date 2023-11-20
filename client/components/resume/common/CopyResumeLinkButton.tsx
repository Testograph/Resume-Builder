import { ButtonBase, Tooltip } from '@mui/material';

import { useAppSelector } from '@/store/hooks';
import { useTranslation } from 'next-i18next';
import getResumeUrl from '@/utils/getResumeUrl';
import toast from 'react-hot-toast';
import { Link } from '@mui/icons-material';

const CopyResumeLinkButton = () => {
  const { t } = useTranslation();
  const resume = useAppSelector((state) => state.resume.present);

  const handleCopyLink = async () => {
    const url = getResumeUrl(resume, { withHost: true });
    await navigator.clipboard.writeText(url);

    toast.success(t('common.toast.success.resume-link-copied'));
  };

  return (
    <Tooltip arrow placement="top" title={t('builder.controller.tooltip.copy-link')}>
      <ButtonBase onClick={handleCopyLink}>
        <Link fontSize="medium" />
      </ButtonBase>
    </Tooltip>
  );
};

export default CopyResumeLinkButton;
