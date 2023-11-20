'use client';
import { Add, ArrowBack, ArrowForward, Star } from '@mui/icons-material';
import { Button, IconButton, Tooltip, useMediaQuery, useTheme } from '@mui/material';
import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';
import { useTranslation } from 'next-i18next';
import React, { ReactComponentElement, useEffect, useMemo, useState } from 'react';
import { Section as SectionRecord } from 'schema';
import { SidebarSection } from '@/types/app';
import Section from '@/components/build/LeftSidebar/sections/Section';
import { getCustomSections, getSectionsByType, left } from '@/config/sections';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addSection } from '@/store/resume/resumeSlice';
import { resumePreviewScrollIntoView, sectionScrollIntoView } from '@/utils/editor';
import { v4 as uuidv4 } from 'uuid';

import styles from './SectionEditor.module.scss';
import { concat } from 'lodash';
type SectionEditorProps = {
  currentSection?: string;
  setCurrentSection: Function;
};
const SectionEditor: React.FC<SectionEditorProps> = ({ currentSection, setCurrentSection }) => {
  const theme = useTheme();

  const [sideMenu, setSideMenu] = useState<SidebarSection[]>([]);

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  const sections = useAppSelector((state) => state.resume.present.sections);

  const metadata = useAppSelector((state) => state.resume.present.metadata);

  const customSections = useMemo(() => getCustomSections(sections), [sections]);

  const nextSection = useMemo(
    () => sideMenu?.[sideMenu?.findIndex(({ id }) => id === currentSection) + 1]?.id,
    [sideMenu, currentSection],
  );
  const previousSection = useMemo(
    () => sideMenu?.[sideMenu?.findIndex(({ id }) => id === currentSection) - 1]?.id,
    [sideMenu, currentSection],
  );

  const handleAddSection = () => {
    const id = uuidv4();
    const newSection: SectionRecord = {
      name: 'Custom Section',
      type: 'custom',
      visible: true,
      columns: 2,
      items: [],
    };

    dispatch(addSection({ id, value: newSection, type: 'custom' }));
    setTimeout(() => {
      onMenuClick(id);
    }, 400);
  };

  const getCurrentSection = () => {
    let sectionsComponent: ReactComponentElement<any> = <></>;

    const item = left.find((x) => x.id === currentSection);
    if (item) {
      const id = (item as any).id;
      const component = (item as any).component;
      const type = component.props.type;
      const addMore = !!component.props.addMore;

      sectionsComponent = (
        <section key={id} id={id}>
          {component}
        </section>
      );

      if (addMore) {
        const additionalSections = getSectionsByType(sections, type);
        const elements = [];
        for (const element of additionalSections) {
          const newId = element.id;

          const props = cloneDeep(component.props);
          props.path = 'sections.' + newId;
          props.name = element.name;
          props.isDeletable = true;
          props.addMore = false;
          props.isDuplicated = true;
          const newComponent = React.cloneElement(component, props);

          elements.push(
            <section key={newId} id={`section-${newId}`}>
              {newComponent}
            </section>,
          );
        }
      }
    } else {
      const customItem = customSections.find((x) => x.id === currentSection);
      if (customItem) {
        sectionsComponent = (
          <section key={customItem.id} id={`section-${customItem.id}`}>
            <Section path={`sections.${customItem.id}`} type="custom" isEditable isHideable isDeletable />
          </section>
        );
      }
    }

    return sectionsComponent;
  };

  const onMenuClick = (id?: string) => {
    if (id) {
      sectionScrollIntoView(id);
      setCurrentSection(id);
      if (isDesktop && metadata.template) {
        resumePreviewScrollIntoView(metadata.template, id);
      }
    }
  };

  useEffect(() => {
    const sidebarSection = left.map(({ id, icon }) => ({ id, icon }) as SidebarSection);
    setSideMenu(
      concat(
        sidebarSection,
        customSections.map(({ id }) => ({ id, icon: <Star /> }) as SidebarSection),
      ),
    );
  }, [left, customSections]);

  return (
    <div className={styles.container}>
      <nav className="overflow-y-auto">
        <div className={styles.sections}>
          {sideMenu.map(({ id, icon }) => (
            <Tooltip
              arrow
              key={id}
              placement="right"
              title={t(`builder.leftSidebar.sections.${id}.heading`, get(sections, `${id}.name`))}
            >
              <IconButton onClick={() => onMenuClick(id)} color={id === currentSection ? 'secondary' : 'primary'}>
                {icon}
              </IconButton>
            </Tooltip>
          ))}
        </div>
      </nav>

      <main>
        {getCurrentSection()}

        <div className="py-6 text-right">
          <Button fullWidth variant="outlined" startIcon={<Add />} onClick={handleAddSection}>
            {t('builder.common.actions.add', {
              token: t('builder.leftSidebar.sections.section.heading'),
            })}
          </Button>
        </div>

        <div className="">
          <div className="float-left">
            {previousSection && (
              <Button
                fullWidth
                variant="outlined"
                startIcon={<ArrowBack />}
                onClick={() => onMenuClick(previousSection)}
              >
                {t(`builder.leftSidebar.sections.${previousSection}.heading`, get(sections, `${previousSection}.name`))}
              </Button>
            )}
          </div>
          <div className="float-right">
            {nextSection && (
              <Button fullWidth variant="outlined" endIcon={<ArrowForward />} onClick={() => onMenuClick(nextSection)}>
                {t(`builder.leftSidebar.sections.${nextSection}.heading`, get(sections, `${nextSection}.name`))}
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SectionEditor;
