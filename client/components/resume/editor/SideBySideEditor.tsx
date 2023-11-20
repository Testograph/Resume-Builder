'use client';
import { useMediaQuery, useTheme } from '@mui/material';
import Preview from '../preview/Preview';
import SectionEditor from '../sectionEditor/SectionEditor';
import Header from './Header';
import './SideBySideEditor.module.scss';

type SideBySideEditorProps = {
  currentSection?: string;
  setCurrentSection: Function;
};

const SideBySideEditor: React.FC<SideBySideEditorProps> = ({ currentSection, setCurrentSection }) => {
  const theme = useTheme();
  const enablePreview = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <>
      <Header />
      <div className="grid grid-cols-12 ">
        <div className="col-span-12 lg:col-span-6">
          <SectionEditor currentSection={currentSection} setCurrentSection={setCurrentSection} />
        </div>
        {enablePreview && (
          <div className="lg:col-span-6">
            <div className="h-0 lg:h-full">
              <div className="flex h-[90vh] overflow-scroll p-2">
                <Preview />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SideBySideEditor;
