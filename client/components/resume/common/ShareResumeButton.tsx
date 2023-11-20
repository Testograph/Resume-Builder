import { ButtonBase, Tooltip, Typography } from '@mui/material';

import { useAppSelector } from '@/store/hooks';
import { useTranslation } from 'next-i18next';
import { Link } from '@mui/icons-material';
import { EditorButtonProps } from '@/types/editor';
import getResumeUrl from '@/utils/getResumeUrl';
import toast from 'react-hot-toast';

const ShareResumeButton: React.FC<EditorButtonProps> = ({ hideTitle = false, hideTooltip = false }) => {
  const { t } = useTranslation();

  const resume = useAppSelector((state) => state.resume.present);

  const handleShareLink = async () => {
    const url = getResumeUrl(resume, { withHost: true });
    await navigator.clipboard.writeText(url);

    toast.success(t('common.toast.success.resume-link-copied'));
  };

  return (
    <Tooltip
      arrow
      placement="top"
      title={
        hideTooltip
          ? ''
          : resume.public
          ? t('builder.header.menu.share-link')
          : t('builder.header.menu.tooltips.share-link')
      }
    >
      <ButtonBase onClick={() => resume.public && handleShareLink()}>
        <Link className="scale-90" />
        {!hideTitle && <Typography sx={{ marginLeft: '10px' }}>{t('builder.header.menu.share-link')}</Typography>}
      </ButtonBase>
    </Tooltip>
  );
};

export default ShareResumeButton;
