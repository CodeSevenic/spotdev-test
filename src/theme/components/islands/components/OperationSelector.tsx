import React, { useState } from 'react';
import styles from '../../../styles/advanced-calculator.module.css';

interface OperationSelectorProps {
  operators: string[];
  selectedOperator: string;
  onOperatorChange: (operator: string) => void;
  hasInput: boolean;
}

const OperationSelector: React.FC<OperationSelectorProps> = ({
  operators,
  selectedOperator,
  onOperatorChange,
  hasInput,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleOperatorClick = (operator: string) => {
    if (operator === selectedOperator) {
      // If clicking the same operator, toggle expansion
      setIsExpanded(!isExpanded);
    } else {
      // If selecting a different operator, change it and collapse
      onOperatorChange(operator);
      setIsExpanded(false);
    }
  };

  const handleSelectedOperatorClick = () => {
    setIsExpanded(!isExpanded);
  };

  const renderOperatorIcon = (operator: string) => {
    switch (operator) {
      case '+':
        return (
          <div className={styles.advCalcPlusIcon}>
            <div className={styles.advCalcPlusVertical}></div>
            <div className={styles.advCalcPlusHorizontal}></div>
          </div>
        );
      case '-':
        return (
          <div className={styles.advCalcMinusIcon}>
            <div className={styles.advCalcMinusHorizontal}></div>
          </div>
        );
      case '*':
        return <div className={styles.advCalcMultiplyIcon}>×</div>;
      case '/':
        return <div className={styles.advCalcDivideIcon}>÷</div>;
      default:
        return operator;
    }
  };

  return (
    <div
      className={`${styles.advCalcOperationButtons} ${
        isExpanded ? styles.advCalcOperationButtonsExpanded : ''
      }`}
    >
      {/* Show selected operator if there's input, otherwise show outline */}
      <button
        key={selectedOperator}
        className={`${styles.advCalcOperationBtn} ${
          hasInput
            ? styles.advCalcOperationBtnActive
            : styles.advCalcOperationBtnOutline
        }`}
        onClick={handleSelectedOperatorClick}
      >
        {renderOperatorIcon(selectedOperator)}
      </button>

      {/* Show other operators only when expanded */}
      {isExpanded &&
        operators
          .filter((op) => op !== selectedOperator)
          .map((op) => (
            <button
              key={op}
              className={`${styles.advCalcOperationBtn} ${styles.advCalcOperationBtnExpanding}`}
              onClick={() => handleOperatorClick(op)}
            >
              {renderOperatorIcon(op)}
            </button>
          ))}
    </div>
  );
};

export default OperationSelector;
