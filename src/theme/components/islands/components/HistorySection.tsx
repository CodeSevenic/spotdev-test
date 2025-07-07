import React from 'react';
import styles from '../../../styles/advanced-calculator.module.css';
import CloseIcon from '../../icons/CloseIcon.tsx';
import CopyIcon from '../../icons/CopyIcon.tsx';
import ResetIcon from '../../icons/ResetIcon.tsx';

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

interface HistorySectionProps {
  history: CalculationHistory[];
  historyTitle: string;
  clearHistoryText: string;
  historyEmptyText: string;
  onClearHistory: () => void;
  onDeleteHistoryItem: (id: string) => void;
  onCopyHistoryItem: (item: CalculationHistory) => void;
}

const HistorySection: React.FC<HistorySectionProps> = ({
  history,
  historyTitle,
  clearHistoryText,
  historyEmptyText,
  onClearHistory,
  onDeleteHistoryItem,
  onCopyHistoryItem,
}) => {
  const renderOperatorIcon = (operator: string) => {
    switch (operator) {
      case '+':
        return (
          <div className={styles.advCalcPlusSmall}>
            <div
              className={styles.advCalcPlusVerticalSmall}
              style={{ background: '#8F8F8F' }}
            ></div>
            <div
              className={styles.advCalcPlusHorizontalSmall}
              style={{ background: '#8F8F8F' }}
            ></div>
          </div>
        );
      case '-':
        return (
          <div className={styles.advCalcMinusSmall}>
            <div
              className={styles.advCalcMinusHorizontalSmall}
              style={{ background: '#8F8F8F' }}
            ></div>
          </div>
        );
      case '*':
        return (
          <div
            className={styles.advCalcMultiplySmall}
            style={{ color: '#8F8F8F' }}
          >
            ×
          </div>
        );
      case '/':
        return (
          <div
            className={styles.advCalcDivideSmall}
            style={{ color: '#8F8F8F' }}
          >
            ÷
          </div>
        );
      default:
        return operator;
    }
  };

  const CurrencyFlag = () => <div className={styles.advCalcCurrencyFlag}></div>;

  const formatNumber = (num: number) => {
    return num % 1 === 0 ? num.toString() : num.toFixed(2);
  };

  return (
    <div className={styles.advCalcHistorySection}>
      <div className={styles.advCalcHistoryHeader}>
        <h3 className={styles.advCalcHistoryTitle}>{historyTitle} </h3>

        {history.length > 0 && (
          <button
            className={styles.advCalcClearHistoryBtn}
            onClick={onClearHistory}
          >
            <ResetIcon />
            <span>{clearHistoryText}</span>
          </button>
        )}
      </div>

      <div className={styles.advCalcHistoryContent}>
        {history.length === 0 ? (
          <p className={styles.advCalcHistoryMessage}>{historyEmptyText}</p>
        ) : (
          <div className={styles.advCalcHistoryList}>
            {history.map((item) => (
              <div key={item.id} className={styles.advCalcHistoryItem}>
                <div className={styles.advCalcHistoryItemActions}>
                  <button
                    className={styles.advCalcHistoryDeleteBtn}
                    onClick={() => onDeleteHistoryItem(item.id)}
                    title="Delete"
                  >
                    <CloseIcon />
                    <span>DELETE</span>
                  </button>
                  <button
                    className={styles.advCalcHistoryCopyBtn}
                    onClick={() => onCopyHistoryItem(item)}
                    title="Copy"
                  >
                    <CopyIcon />
                    <span>COPY</span>
                  </button>
                </div>
                <div className={styles.advCalcHistoryItemContent}>
                  <div className={styles.advCalcCalcOperation}>
                    <span
                      className={styles.advCalcCalcNumber}
                      style={{ color: '#8F8F8F' }}
                    >
                      {item.firstNumber}
                    </span>
                    {renderOperatorIcon(item.operator)}
                    <span
                      className={styles.advCalcCalcNumber}
                      style={{ color: '#8F8F8F' }}
                    >
                      {item.secondNumber}
                    </span>
                  </div>

                  {item.convertedAmount ? (
                    <div className={styles.advCalcCalcResult}>
                      <div className={styles.advCalcResultLeft}>
                        <span
                          className={styles.advCalcResultNumber}
                          style={{ color: '#545353' }}
                        >
                          {formatNumber(item.result)}
                        </span>
                        <div className={styles.advCalcCurrencyTag}>
                          <CurrencyFlag />
                          <span
                            className={styles.advCalcCurrencyCode}
                            style={{ color: '#545353' }}
                          >
                            {item.currencyFrom}
                          </span>
                        </div>
                      </div>
                      <div className={styles.advCalcResultRight}>
                        <span
                          className={styles.advCalcResultNumberLarge}
                          style={{ color: '#000000' }}
                        >
                          {formatNumber(item.convertedAmount)}
                        </span>
                        <div className={styles.advCalcCurrencyTag}>
                          <CurrencyFlag />
                          <span
                            className={styles.advCalcCurrencyCode}
                            style={{ color: '#545353' }}
                          >
                            {item.currencyTo}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <span
                      className={styles.advCalcResultNumberLarge}
                      style={{ color: '#000000' }}
                    >
                      {formatNumber(item.result)}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistorySection;
