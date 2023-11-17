'use client';
import Preview from '../preview/Preview';
import SectionEditor from '../sectionEditor/SectionEditor';
import Header from './Header';
import './SideBySideEditor.module.scss';

type SideBySideEditorProps = {
  currentSection?: string;
  setCurrentSection: Function;
};

const SideBySideEditor: React.FC<SideBySideEditorProps> = ({ currentSection, setCurrentSection }) => {
  return (
    <>
      <Header />
      <div className="grid grid-cols-12 ">
        <div className="col-span-12 lg:col-span-4 xl:col-span-6">
          <SectionEditor currentSection={currentSection} setCurrentSection={setCurrentSection} />
        </div>
        <div className="col-span-12 lg:col-span-8 xl:col-span-6">
          <div className="h-full">
            <div className="flex h-[90vh] overflow-scroll p-2">
              <Preview />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBySideEditor;
