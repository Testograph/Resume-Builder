'use client';

import Preview from '../preview/Preview';
import SectionEditor from '../sectionEditor/SectionEditor';
import './SideBySideEditor.module.scss';

type SideBySideEditorProps = {
  currentSection?: string;
  setCurrentSection: Function;
};

const SideBySideEditor: React.FC<SideBySideEditorProps> = ({ currentSection, setCurrentSection }) => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12 lg:col-span-4 xl:col-span-6">
        <SectionEditor currentSection={currentSection} setCurrentSection={setCurrentSection} />
      </div>
      <div className="col-span-12 lg:col-span-8 xl:col-span-6">
        <Preview />
      </div>
    </div>
  );
};

export default SideBySideEditor;
