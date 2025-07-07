import { Island } from '@hubspot/cms-components';
import AdvancedCalculatorIsland from '../../islands/AdvancedCalculatorIsland.tsx?island';
import {
  ModuleFields,
  TextField,
  RichTextField,
  ColorField,
} from '@hubspot/cms-components/fields';
import { RichText } from '@hubspot/cms-components';
import styles from '../../../styles/advanced-calculator.module.css';

export function Component({ fieldValues, hublParameters }) {
  const { brandColors } = hublParameters;
  const primaryColor =
    fieldValues.primaryColor?.color || brandColors?.color || '#6366f1';
  const gradientColor1 = fieldValues.gradientColor1?.color || '#544db4';
  const gradientColor2 = fieldValues.gradientColor2?.color || '#dedcff';

  return (
    <Island
      module={AdvancedCalculatorIsland}
      title={fieldValues.title}
      description={fieldValues.description}
      calculationTitle={fieldValues.calculationTitle}
      firstNumberLabel={fieldValues.firstNumberLabel}
      firstNumberPlaceholder={fieldValues.firstNumberPlaceholder}
      secondNumberLabel={fieldValues.secondNumberLabel}
      secondNumberPlaceholder={fieldValues.secondNumberPlaceholder}
      conversionToggleLabel={fieldValues.conversionToggleLabel}
      calculateButtonText={fieldValues.calculateButtonText}
      resetButtonText={fieldValues.resetButtonText}
      historyTitle={fieldValues.historyTitle}
      clearHistoryText={fieldValues.clearHistoryText}
      historyEmptyText={fieldValues.historyEmptyText}
      primaryColor={primaryColor}
      gradientColor1={gradientColor1}
      gradientColor2={gradientColor2}
    />
  );
}

export const fields = (
  <ModuleFields>
    <TextField
      name="title"
      label="Calculator Title"
      default="Advanced Calculator"
    />
    <RichTextField
      name="description"
      label="Description"
      default="<p>Lorem ipsum sit dolor amet nunquam consequitur azarat mithrion zinthos raxacorico</p>"
    />
    <TextField
      name="calculationTitle"
      label="Calculation Section Title"
      default="Calculation title"
    />
    <TextField
      name="firstNumberLabel"
      label="First Number Label"
      default="First Number"
    />
    <TextField
      name="firstNumberPlaceholder"
      label="First Number Placeholder"
      default="First number..."
    />
    <TextField
      name="secondNumberLabel"
      label="Second Number Label"
      default="Second Number"
    />
    <TextField
      name="secondNumberPlaceholder"
      label="Second Number Placeholder"
      default="Second number..."
    />
    <TextField
      name="conversionToggleLabel"
      label="Conversion Toggle Label"
      default="Add conversion?"
    />
    <TextField
      name="calculateButtonText"
      label="Calculate Button Text"
      default="CALCULATE"
    />
    <TextField
      name="resetButtonText"
      label="Reset Button Text"
      default="RESET VALUES"
    />
    <TextField
      name="historyTitle"
      label="History Title"
      default="Calculation History"
    />
    <TextField
      name="clearHistoryText"
      label="Clear History Button Text"
      default="CLEAR HISTORY"
    />
    <TextField
      name="historyEmptyText"
      label="History Empty Text"
      default="Press CALCULATE to start saving your results"
    />
    <ColorField
      name="primaryColor"
      label="Primary Color"
      default={{ color: '#6366f1', opacity: 100 }}
    />
    <ColorField
      name="gradientColor1"
      label="Background Gradient Color 1 (Top)"
      default={{ color: '#544db4', opacity: 100 }}
    />
    <ColorField
      name="gradientColor2"
      label="Background Gradient Color 2 (Bottom)"
      default={{ color: '#dedcff', opacity: 100 }}
    />
  </ModuleFields>
);

export const meta = {
  label: 'Advanced Calculator with Currency Conversion',
};
