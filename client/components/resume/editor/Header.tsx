import { Home as HomeIcon, KeyboardArrowDown as KeyboardArrowDownIcon, Preview } from '@mui/icons-material';
import { AppBar, IconButton, Menu, MenuItem, styled, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import get from 'lodash/get';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setModalState } from '@/store/modal/modalSlice';

import styles from './Header.module.scss';
import RenameResumeButton from '../common/RenameResumeButton';
import DeleteResumeButton from '../common/DeleteResumeButton';
import ShareResumeButton from '../common/ShareResumeButton';
import DuplicateResumeButton from '../common/DuplicateResumeButton';
import { RedoResumeButton, UndoResumeButton } from '../common/UndoRedoResumeButton';

const Header = () => {
  const theme = useTheme();

  const router = useRouter();

  const dispatch = useAppDispatch();

  const isLaptop = useMediaQuery(theme.breakpoints.up('laptop'));

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const resume = useAppSelector((state) => state.resume.present);

  const name = useMemo(() => get(resume, 'name'), [resume]);

  const goBack = () => router.push('/dashboard');

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePreview = () => {
    dispatch(setModalState({ modal: 'resume.preview', state: { open: true } }));
  };

  const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

  return (
    <>
      <AppBar elevation={0} position="fixed">
        <Toolbar variant="regular" className={styles.header}>
          <div>
            <UndoResumeButton hideTooltip />
            <RedoResumeButton hideTooltip />
          </div>
          <div className={styles.title}>
            <IconButton className="opacity-50 hover:opacity-100" onClick={goBack}>
              <HomeIcon />
            </IconButton>

            <span className="opacity-50">{'/'}</span>

            <h1>{name}</h1>

            <IconButton onClick={handleClick}>
              <KeyboardArrowDownIcon />
            </IconButton>

            <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleClose}>
              <MenuItem>
                <RenameResumeButton />
              </MenuItem>

              <MenuItem>
                <DuplicateResumeButton />
              </MenuItem>

              <MenuItem>
                <ShareResumeButton />
              </MenuItem>

              <MenuItem>
                <DeleteResumeButton />
              </MenuItem>
            </Menu>
          </div>

          <div>
            {isLaptop && (
              <IconButton className="opacity-50 hover:opacity-100" onClick={handlePreview}>
                <Preview />
              </IconButton>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default Header;
