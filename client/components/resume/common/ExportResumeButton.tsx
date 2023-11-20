import { Download } from '@mui/icons-material';
import { ButtonBase, Tooltip, Typography } from '@mui/material';
import dayjs from 'dayjs';
import get from 'lodash/get';
import { useMutation } from 'react-query';

import { ServerError } from '@/services/axios';
import { printResumeAsPdf, PrintResumeAsPdfParams } from '@/services/printer';
import { useAppSelector } from '@/store/hooks';
import { useTranslation } from 'next-i18next';
import { EditorButtonProps } from '@/types/editor';

const ExportResumeButton: React.FC<EditorButtonProps> = ({ hideTitle = false, hideTooltip = false }) => {
  const { t } = useTranslation();
  const { mutateAsync, isLoading } = useMutation<string, ServerError, PrintResumeAsPdfParams>(printResumeAsPdf);
  const resume = useAppSelector((state) => state.resume.present);

  const handleExportPDF = async () => {
    const download = (await import('downloadjs')).default;
    const slug = get(resume, 'slug');
    const username = get(resume, 'user.username');
    const updatedAt = get(resume, 'updatedAt');
    const url = await mutateAsync({ username, slug, lastUpdated: dayjs(updatedAt).unix().toString() });
    download(url);
  };

  return (
    <Tooltip arrow placement="top" title={hideTooltip ? '' : t('builder.controller.tooltip.export-pdf')}>
      <ButtonBase onClick={handleExportPDF} disabled={isLoading}>
        <Download fontSize="medium" />
        {!hideTitle && <Typography sx={{ marginLeft: '10px' }}>{t('builder.controller.tooltip.copy-link')}</Typography>}
      </ButtonBase>
    </Tooltip>
  );
};

export default ExportResumeButton;
