import React from 'react';
import { Island } from '@hubspot/cms-components';
import HeroIsland from '../../islands/HeroIsland.tsx?island';
import {
  ModuleFields,
  TextField,
  RichTextField,
  ColorField,
  ImageField,
  BooleanField,
  NumberField,
} from '@hubspot/cms-components/fields';
import styles from '../../../styles/hero.module.css';

export function Component({ fieldValues, hublParameters }) {
  const { brandColors } = hublParameters;
  const primaryColor =
    fieldValues.primaryColor?.color || brandColors?.color || '#6366f1';
  const secondaryColor =
    fieldValues.secondaryColor?.color || brandColors?.color || '#8b5cf6';

  return (
    <Island
      module={HeroIsland}
      title={fieldValues.title}
      subtitle={fieldValues.subtitle}
      description={fieldValues.description}
      ctaText={fieldValues.ctaText}
      ctaUrl={fieldValues.ctaUrl}
      backgroundImage={fieldValues.backgroundImage}
      primaryColor={primaryColor}
      secondaryColor={secondaryColor}
      showAnimatedArrow={fieldValues.showAnimatedArrow}
      typingMessage1={fieldValues.typingMessage1}
      typingMessage2={fieldValues.typingMessage2}
      typingMessage3={fieldValues.typingMessage3}
      typingSpeed={fieldValues.typingSpeed}
      deletingSpeed={fieldValues.deletingSpeed}
      pauseAfterTyping={fieldValues.pauseAfterTyping}
      pauseAfterDeleting={fieldValues.pauseAfterDeleting}
    />
  );
}

export const fields = (
  <ModuleFields>
    <TextField name="title" label="Hero Title" default="DevinSibs" />
    <TextField
      name="subtitle"
      label="Hero Subtitle"
      default="Advanced Calculator with Currency Conversion"
    />
    <RichTextField
      name="description"
      label="Hero Description"
      default="<p>Experience the future of calculations with our advanced calculator featuring real-time currency conversion, calculation history, and beautiful animations.</p>"
    />
    <TextField
      name="ctaText"
      label="CTA Button Text"
      default="Start Calculating"
    />
    <TextField name="ctaUrl" label="CTA Button URL" default="#calculator" />
    <ImageField
      name="backgroundImage"
      label="Background Image (Optional)"
      default={{ src: '', alt: 'Hero background' }}
      resizable={true}
    />
    <ColorField
      name="primaryColor"
      label="Primary Color"
      default={{ color: '#6366f1', opacity: 100 }}
    />
    <ColorField
      name="secondaryColor"
      label="Secondary Color"
      default={{ color: '#8b5cf6', opacity: 100 }}
    />
    <BooleanField
      name="showAnimatedArrow"
      label="Show Animated Arrow"
      default={true}
    />

    {/* Typing Animation Settings */}
    <TextField
      name="typingMessage1"
      label="Typing Message 1 (First Message)"
      default="Hi, I'm Sibs"
    />
    <TextField
      name="typingMessage2"
      label="Typing Message 2 (Second Message)"
      default="Scroll down to see"
    />
    <TextField
      name="typingMessage3"
      label="Typing Message 3 (Third Message)"
      default="The Advanced Calculator"
    />

    {/* Typing Animation Timing */}
    <NumberField
      name="typingSpeed"
      label="Typing Speed (ms - lower = faster)"
      default={100}
      min={10}
      max={500}
    />
    <NumberField
      name="deletingSpeed"
      label="Deleting Speed (ms - lower = faster)"
      default={50}
      min={10}
      max={500}
    />
    <NumberField
      name="pauseAfterTyping"
      label="Pause After Typing (ms)"
      default={2000}
      min={500}
      max={10000}
    />
    <NumberField
      name="pauseAfterDeleting"
      label="Pause After Deleting (ms)"
      default={1000}
      min={200}
      max={5000}
    />
  </ModuleFields>
);

export const meta = {
  label: 'Hero Section with Typing Animation',
};
