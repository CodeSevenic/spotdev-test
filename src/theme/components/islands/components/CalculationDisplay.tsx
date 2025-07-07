import React from 'react';
import styles from '../../../styles/advanced-calculator.module.css';

interface CalculationDisplayProps {
  firstNumber: string;
  secondNumber: string;
  operator: string;
  result: number | null;
  addConversion: boolean;
  currencyFrom: string;
  currencyTo: string;
  convertedAmount: number | null;
}

const CalculationDisplay: React.FC<CalculationDisplayProps> = ({
  firstNumber,
  secondNumber,
  operator,
  result,
  addConversion,
  currencyFrom,
  currencyTo,
  convertedAmount,
}) => {
  const renderOperatorIcon = (operator: string) => {
    switch (operator) {
      case '+':
        return (
          <div className={styles.advCalcPlusSmall}>
            <div className={styles.advCalcPlusVerticalSmall}></div>
            <div className={styles.advCalcPlusHorizontalSmall}></div>
          </div>
        );
      case '-':
        return (
          <div className={styles.advCalcMinusSmall}>
            <div className={styles.advCalcMinusHorizontalSmall}></div>
          </div>
        );
      case '*':
        return <div className={styles.advCalcMultiplySmall}>×</div>;
      case '/':
        return <div className={styles.advCalcDivideSmall}>÷</div>;
      default:
        return operator;
    }
  };

  const CurrencyFlag = () => <div className={styles.advCalcCurrencyFlag}></div>;

  const formatNumber = (num: number) => {
    return num % 1 === 0 ? num.toString() : num.toFixed(2);
  };

  if (result === null) {
    return (
      <div className={styles.advCalcCalculationDisplay}>
        <div className={styles.advCalcCalcOperation}>
          <span className={styles.advCalcCalcNumber}>---</span>
          <div className={styles.advCalcPlusSmall}>
            <div className={styles.advCalcPlusVerticalSmall}></div>
            <div className={styles.advCalcPlusHorizontalSmall}></div>
          </div>
          <span className={styles.advCalcCalcNumber}>---</span>
        </div>
        <div className={styles.advCalcCalcResult}>
          <div className={styles.advCalcResultLeft}>
            <span className={styles.advCalcResultNumber}>---</span>
            <div className={styles.advCalcCurrencyTag}>
              <CurrencyFlag />
              <span className={styles.advCalcCurrencyCode}>---</span>
            </div>
          </div>
          <div className={styles.advCalcResultRight}>
            <span className={styles.advCalcResultNumberLarge}>---</span>
            <div className={styles.advCalcCurrencyTag}>
              <CurrencyFlag />
              <span className={styles.advCalcCurrencyCode}>---</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.advCalcCalculationDisplay}>
      <div className={styles.advCalcCalcOperation}>
        <span className={styles.advCalcCalcNumber}>{firstNumber || '0'}</span>
        {renderOperatorIcon(operator)}
        <span className={styles.advCalcCalcNumber}>{secondNumber || '0'}</span>
      </div>

      <div className={styles.advCalcCalcResult}>
        <div className={styles.advCalcResultLeft}>
          <span className={styles.advCalcResultNumber}>
            {formatNumber(result)}
          </span>
          <div className={styles.advCalcCurrencyTag}>
            <CurrencyFlag />
            <span className={styles.advCalcCurrencyCode}>
              {addConversion ? currencyFrom : '---'}
            </span>
          </div>
        </div>
        <div className={styles.advCalcResultRight}>
          <span className={styles.advCalcResultNumberLarge}>
            {addConversion && convertedAmount !== null
              ? formatNumber(convertedAmount)
              : formatNumber(result)}
          </span>
          <div className={styles.advCalcCurrencyTag}>
            <CurrencyFlag />
            <span className={styles.advCalcCurrencyCode}>
              {addConversion ? currencyTo : '---'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculationDisplay;
