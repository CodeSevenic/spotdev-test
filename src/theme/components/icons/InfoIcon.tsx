import React, { useState } from 'react';

interface InfoIconProps {
  tooltip?: string;
}

const InfoIcon: React.FC<InfoIconProps> = ({
  tooltip = 'Enter a number (e.g., 10, 2.5, -5)',
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onTouchStart={() => setShowTooltip(true)}
      onTouchEnd={() => setTimeout(() => setShowTooltip(false), 2000)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="19"
        height="20"
        viewBox="0 0 19 20"
        fill="none"
        style={{ cursor: 'help' }}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 9.89154C0 4.70474 4.20474 0.5 9.39154 0.5C14.5783 0.5 18.7831 4.70474 18.7831 9.89154C18.7831 15.0783 14.5783 19.2831 9.39154 19.2831C4.20474 19.2831 0 15.0783 0 9.89154ZM9.39638 13.4764C8.99882 13.4764 8.67654 13.1541 8.67654 12.7566V9.78121C8.67654 9.38365 8.99882 9.06137 9.39638 9.06137C9.79394 9.06137 10.1162 9.38365 10.1162 9.78121V12.7758C10.1009 13.1636 9.78453 13.4716 9.39638 13.4764ZM8.67654 7.45845C8.67654 7.85601 8.99882 8.17829 9.39638 8.17829C9.78453 8.17349 10.1009 7.86553 10.1162 7.47765V7.12252C10.1162 6.72497 9.79394 6.40268 9.39638 6.40268C8.99882 6.40268 8.67654 6.72497 8.67654 7.12252V7.45845Z"
          fill="#DEDCFF"
        />
      </svg>

      {showTooltip && (
        <div
          style={{
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginBottom: '8px',
            padding: '8px 12px',
            backgroundColor: '#333',
            color: '#fff',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: '400',
            whiteSpace: 'nowrap',
            zIndex: 1000,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          }}
        >
          {tooltip}
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '5px solid transparent',
              borderRight: '5px solid transparent',
              borderTop: '5px solid #333',
            }}
          />
        </div>
      )}
    </div>
  );
};

export default InfoIcon;
