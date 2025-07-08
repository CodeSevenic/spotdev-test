import { useState, useEffect } from 'react';
import styles from '../../styles/advanced-calculator.module.css';
import OperationSelector from './components/OperationSelector.tsx';
import CalculationDisplay from './components/CalculationDisplay.tsx';
import HistorySection from './components/HistorySection.tsx';
import CurrencySelector from './components/CurrencySelector.tsx';
import InfoIcon from '../icons/InfoIcon.tsx';

interface CalculationHistory {
  id: string;
  operation: string;
  firstNumber: number;
  secondNumber: number;
  operator: string;
  result: number;
  timestamp: string;
  currencyFrom?: string;
  currencyTo?: string;
  convertedAmount?: number;
  exchangeRate?: number;
}

interface ExchangeRateResponse {
  rates: { [key: string]: number };
  timestamp?: number;
  base: string;
  date: string;
}

interface AdvancedCalculatorProps {
  title: string;
  description: string;
  calculationTitle: string;
  firstNumberLabel: string;
  firstNumberPlaceholder: string;
  secondNumberLabel: string;
  secondNumberPlaceholder: string;
  conversionToggleLabel: string;
  calculateButtonText: string;
  resetButtonText: string;
  historyTitle: string;
  clearHistoryText: string;
  historyEmptyText: string;
  primaryColor: string;
  gradientColor1: string;
  gradientColor2: string;
}

const OPERATORS = {
  '+': (a: number, b: number) => a + b,
  '-': (a: number, b: number) => a - b,
  '*': (a: number, b: number) => a * b,
  '/': (a: number, b: number) => a / b,
};

const CURRENCY_OPTIONS = [
  { value: 'USD', label: 'USD' },
  { value: 'EUR', label: 'EUR' },
  { value: 'GBP', label: 'GBP' },
  { value: 'JPY', label: 'JPY' },
  { value: 'CAD', label: 'CAD' },
  { value: 'AUD', label: 'AUD' },
  { value: 'CHF', label: 'CHF' },
  { value: 'CNY', label: 'CNY' },
];

export default function AdvancedCalculatorIsland(
  props: AdvancedCalculatorProps,
) {
  const [firstNumber, setFirstNumber] = useState<string>('');
  const [secondNumber, setSecondNumber] = useState<string>('');
  const [operator, setOperator] = useState<string>('+');
  const [result, setResult] = useState<number | null>(null);
  const [addConversion, setAddConversion] = useState<boolean>(false);
  const [currencyFrom, setCurrencyFrom] = useState<string>('GBP');
  const [currencyTo, setCurrencyTo] = useState<string>('USD');
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [history, setHistory] = useState<CalculationHistory[]>([]);
  const [lastUpdate, setLastUpdate] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Load history from localStorage on component mount
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('advancedCalculatorHistory');
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch (error) {
      console.error('Error loading history from localStorage:', error);
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(
        'advancedCalculatorHistory',
        JSON.stringify(history),
      );
    } catch (error) {
      console.error('Error saving history to localStorage:', error);
    }
  }, [history]);

  // Calculate result in real-time
  useEffect(() => {
    if (firstNumber && secondNumber && operator) {
      const num1 = parseFloat(firstNumber);
      const num2 = parseFloat(secondNumber);

      if (!isNaN(num1) && !isNaN(num2)) {
        if (operator === '/' && num2 === 0) {
          setError('Division by zero is not allowed');
          setResult(null);
          return;
        }

        const calculation = OPERATORS[operator](num1, num2);
        setResult(calculation);
        setError('');
      } else {
        setResult(null);
      }
    } else {
      setResult(null);
    }
  }, [firstNumber, secondNumber, operator]);

  // Fetch exchange rates
  useEffect(() => {
    if (addConversion && result !== null) {
      fetchExchangeRate();
    }
  }, [addConversion, currencyFrom, currencyTo, result]);

  const fetchExchangeRate = async () => {
    if (!addConversion || result === null) return;

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${currencyFrom}`,
      );

      if (!response.ok) {
        throw new Error('Failed to fetch exchange rates');
      }

      const data: ExchangeRateResponse = await response.json();

      if (data.rates && data.rates[currencyTo]) {
        const rate = data.rates[currencyTo];
        setExchangeRate(rate);
        setConvertedAmount(result * rate);
        setLastUpdate(new Date().toLocaleString());
      } else {
        throw new Error('Invalid currency pair');
      }
    } catch (err) {
      console.error('Exchange rate fetch error:', err);
      setError('Failed to fetch exchange rates. Please try again later.');
      setExchangeRate(null);
      setConvertedAmount(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCalculate = () => {
    if (result === null) return;

    const calculation: CalculationHistory = {
      id: Date.now().toString(),
      operation: `${firstNumber} ${operator} ${secondNumber}`,
      firstNumber: parseFloat(firstNumber),
      secondNumber: parseFloat(secondNumber),
      operator,
      result,
      timestamp: new Date().toLocaleString(),
      ...(addConversion &&
        convertedAmount && {
          currencyFrom,
          currencyTo,
          convertedAmount,
          exchangeRate,
        }),
    };

    setHistory((prev) => [calculation, ...prev]);
  };

  const handleReset = () => {
    setFirstNumber('');
    setSecondNumber('');
    setOperator('+');
    setResult(null);
    setError('');
    setConvertedAmount(null);
    setAddConversion(false);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const deleteHistoryItem = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const copyHistoryItem = async (item: CalculationHistory) => {
    try {
      let textToCopy = `${item.firstNumber} ${item.operator} ${
        item.secondNumber
      } = ${item.result.toFixed(2)}`;

      if (item.convertedAmount) {
        textToCopy += `\n${item.result.toFixed(2)} ${
          item.currencyFrom
        } → ${item.convertedAmount.toFixed(2)} ${item.currencyTo}`;
      }

      await navigator.clipboard.writeText(textToCopy);

      // Optional: You could add a toast notification here
      console.log('Calculation copied to clipboard');
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = `${item.firstNumber} ${item.operator} ${
        item.secondNumber
      } = ${item.result.toFixed(2)}`;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
  };

  const validateInput = (value: string) => {
    return /^-?\d*\.?\d*$/.test(value);
  };

  const handleInputChange = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    if (validateInput(value)) {
      setter(value);
    }
  };

  return (
    <div
      className={styles.advCalcContainer}
      style={
        {
          '--primary-color': props.primaryColor,
          '--gradient-color-1': props.gradientColor1,
          '--gradient-color-2': props.gradientColor2,
        } as React.CSSProperties
      }
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%',
        }}
      >
        {/* Header section */}
        <header className={styles.advCalcHeader}>
          <div className={styles.advCalcTitleSection}>
            <h1 className={styles.advCalcMainTitle}>{props.title}</h1>
            <div
              className={styles.advCalcMainDescription}
              dangerouslySetInnerHTML={{ __html: props.description }}
            />
          </div>
        </header>

        {lastUpdate && (
          <div className={styles.advCalcLastUpdated}>
            Last Updated: {lastUpdate}
          </div>
        )}

        {/* Main content grid */}
        <main className={styles.advCalcMainGrid}>
          {/* Left side - Calculator card */}
          <div className={styles.advCalcCalculatorCard}>
            <div className={styles.advCalcCardHeader}>
              <h2 className={styles.advCalcCardTitle}>
                {props.calculationTitle}
              </h2>
            </div>

            {error && <div className={styles.advCalcError}>{error}</div>}

            <div className={styles.advCalcInputsContainer}>
              {/* First Number */}
              <div className={styles.advCalcInputField}>
                <label className={styles.advCalcInputLabel}>
                  {props.firstNumberLabel}
                  <span>
                    <InfoIcon tooltip="Enter the first number (e.g., 10, 2.5, -5)" />
                  </span>
                </label>
                <div className={styles.advCalcInputWrapper}>
                  <input
                    type="text"
                    placeholder={props.firstNumberPlaceholder}
                    className={styles.advCalcInput}
                    value={firstNumber}
                    onChange={(e) =>
                      handleInputChange(e.target.value, setFirstNumber)
                    }
                  />
                </div>
              </div>

              {/* Operation selector */}
              <div className={styles.advCalcOperationSelector}>
                <OperationSelector
                  operators={Object.keys(OPERATORS)}
                  selectedOperator={operator}
                  onOperatorChange={setOperator}
                  hasInput={Boolean(firstNumber && secondNumber)}
                />
              </div>

              {/* Second Number */}
              <div className={styles.advCalcInputField}>
                <label className={styles.advCalcInputLabel}>
                  {props.secondNumberLabel}
                  <span>
                    <InfoIcon tooltip="Enter the second number (e.g., 3, 1.5, -2)" />
                  </span>
                </label>
                <div className={styles.advCalcInputWrapper}>
                  <input
                    type="text"
                    placeholder={props.secondNumberPlaceholder}
                    className={styles.advCalcInput}
                    value={secondNumber}
                    onChange={(e) =>
                      handleInputChange(e.target.value, setSecondNumber)
                    }
                  />
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className={styles.advCalcDivider}></div>

            {/* Converter section */}
            <div className={styles.advCalcConverterSection}>
              <div className={styles.advCalcConverterHeader}>
                <h3 className={styles.advCalcConverterTitle}>
                  {props.conversionToggleLabel}
                </h3>
                <div
                  className={`${styles.advCalcToggleSwitch} ${
                    addConversion ? styles.advCalcToggleSwitchActive : ''
                  }`}
                  onClick={() => setAddConversion(!addConversion)}
                >
                  <div className={styles.advCalcToggleSlider}></div>
                </div>
              </div>

              {addConversion && (
                <CurrencySelector
                  currencyOptions={CURRENCY_OPTIONS}
                  currencyFrom={currencyFrom}
                  currencyTo={currencyTo}
                  onCurrencyFromChange={setCurrencyFrom}
                  onCurrencyToChange={setCurrencyTo}
                />
              )}
            </div>

            {/* Action buttons */}
            <div className={styles.advCalcActionButtons}>
              <button
                className={styles.advCalcBtnPrimary}
                onClick={handleCalculate}
                disabled={result === null || isLoading}
              >
                {isLoading ? 'Loading...' : props.calculateButtonText}
              </button>
              <button
                className={styles.advCalcBtnSecondary}
                onClick={handleReset}
              >
                {props.resetButtonText}
              </button>
            </div>
          </div>

          {/* Right side - Display and history */}
          <div className={styles.advCalcRightSection}>
            <CalculationDisplay
              firstNumber={firstNumber}
              secondNumber={secondNumber}
              operator={operator}
              result={result}
              addConversion={addConversion}
              currencyFrom={currencyFrom}
              currencyTo={currencyTo}
              convertedAmount={convertedAmount}
            />

            <HistorySection
              history={history}
              historyTitle={props.historyTitle}
              clearHistoryText={props.clearHistoryText}
              historyEmptyText={props.historyEmptyText}
              onClearHistory={clearHistory}
              onDeleteHistoryItem={deleteHistoryItem}
              onCopyHistoryItem={copyHistoryItem}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
