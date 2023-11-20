import { Download } from '@mui/icons-material';
import { ButtonBase, Tooltip } from '@mui/material';
import dayjs from 'dayjs';
import get from 'lodash/get';
import { useMutation } from 'react-query';

import { ServerError } from '@/services/axios';
import { printResumeAsPdf, PrintResumeAsPdfParams } from '@/services/printer';
import { useAppSelector } from '@/store/hooks';
import { useTranslation } from 'next-i18next';

const ExportResumeButton = () => {
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
    <Tooltip arrow placement="top" title={t('builder.controller.tooltip.export-pdf')}>
      <ButtonBase onClick={handleExportPDF} disabled={isLoading}>
        <Download fontSize="medium" />
      </ButtonBase>
    </Tooltip>
  );
};

export default ExportResumeButton;
