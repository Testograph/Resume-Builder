import { DriveFileRenameOutline } from '@mui/icons-material';
import { useTranslation } from 'next-i18next';

import BaseModal from '@/components/shared/BaseModal';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { ModalState, setModalState } from '@/store/modal/modalSlice';
import Preview from '@/components/resume/preview/Preview';

const ResumePreview: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const { open: isOpen } = useAppSelector((state) => state.modal['resume.preview']) as ModalState;

  const handleClose = () => {
    dispatch(setModalState({ modal: 'resume.preview', state: { open: false } }));
  };

  return (
    <BaseModal
      icon={<DriveFileRenameOutline />}
      isOpen={isOpen}
      heading={t('modals.resume.preview.heading')}
      handleClose={handleClose}
    >
      <Preview />
    </BaseModal>
  );
};

export default ResumePreview;
