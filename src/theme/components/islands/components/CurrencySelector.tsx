import React from 'react';
import styles from '../../../styles/advanced-calculator.module.css';

interface CurrencyOption {
  value: string;
  label: string;
}

interface CurrencySelectorProps {
  currencyOptions: CurrencyOption[];
  currencyFrom: string;
  currencyTo: string;
  onCurrencyFromChange: (currency: string) => void;
  onCurrencyToChange: (currency: string) => void;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  currencyOptions,
  currencyFrom,
  currencyTo,
  onCurrencyFromChange,
  onCurrencyToChange,
}) => {
  return (
    <div className={styles.advCalcCurrencySection}>
      <div className={styles.advCalcCurrencySelectors}>
        <select
          value={currencyFrom}
          onChange={(e) => onCurrencyFromChange(e.target.value)}
          className={styles.advCalcCurrencySelect}
        >
          {currencyOptions.map((currency) => (
            <option key={currency.value} value={currency.value}>
              {currency.label}
            </option>
          ))}
        </select>
        <span className={styles.advCalcCurrencyArrow}>→</span>
        <select
          value={currencyTo}
          onChange={(e) => onCurrencyToChange(e.target.value)}
          className={styles.advCalcCurrencySelect}
        >
          {currencyOptions.map((currency) => (
            <option key={currency.value} value={currency.value}>
              {currency.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CurrencySelector;
