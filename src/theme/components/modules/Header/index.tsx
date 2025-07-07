import React from 'react';
import { Menu } from '@hubspot/cms-components';
import {
  MenuField,
  ModuleFields,
  TextField,
  ColorField,
  BooleanField,
} from '@hubspot/cms-components/fields';
import styles from '../../../styles/header.module.css';

export function Component({ fieldValues, hublParameters }: any) {
  const { brandColors } = hublParameters;
  const backgroundColor =
    fieldValues.backgroundColor?.color || brandColors?.color || '#ffffff';
  const textColor = fieldValues.textColor?.color || '#333333';

  return (
    <header
      className={styles.wrapper}
      style={
        {
          '--header-bg': backgroundColor,
          '--header-text': textColor,
        } as React.CSSProperties
      }
    >
      <nav className={styles.nav}>
        <div className={styles.logoContainer}>
          <span className={styles.brandName}>{fieldValues.brandName}</span>
        </div>

        {fieldValues.showMenu && (
          <Menu fieldPath="menu" className={styles.menu} />
        )}

        {fieldValues.showCta && (
          <a href={fieldValues.ctaUrl} className={styles.ctaButton}>
            {fieldValues.ctaText}
          </a>
        )}
      </nav>
    </header>
  );
}

export const fields = (
  <ModuleFields>
    <TextField name="brandName" label="Brand Name" default="DevinSibs" />
    <MenuField name="menu" label="Navigation Menu" />
    <BooleanField name="showMenu" label="Show Navigation Menu" default={true} />
    <BooleanField name="showCta" label="Show CTA Button" default={true} />
    <TextField name="ctaText" label="CTA Button Text" default="Get Started" />
    <TextField name="ctaUrl" label="CTA Button URL" default="#calculator" />
    <ColorField
      name="backgroundColor"
      label="Background Color"
      default={{ color: '#ffffff', opacity: 95 }}
    />
    <ColorField
      name="textColor"
      label="Text Color"
      default={{ color: '#333333', opacity: 100 }}
    />
  </ModuleFields>
);

export const meta = {
  label: 'Header Navigation',
};
