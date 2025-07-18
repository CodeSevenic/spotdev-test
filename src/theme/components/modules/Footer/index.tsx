import React from 'react';
import {
  ModuleFields,
  TextField,
  RichTextField,
  ColorField,
  BooleanField,
} from '@hubspot/cms-components/fields';
import styles from '../../../styles/footer.module.css';

export function Component({ fieldValues, hublParameters }: any) {
  const { brandColors } = hublParameters;
  const backgroundColor =
    fieldValues.backgroundColor?.color || brandColors?.color || '#1f2937';
  const textColor = fieldValues.textColor?.color || '#ffffff';

  return (
    <footer
      className={styles.footer}
      style={
        {
          '--footer-bg': backgroundColor,
          '--footer-text': textColor,
        } as React.CSSProperties
      }
    >
      <div className={styles.footerContent}>
        <div className={styles.footerMain}>
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>{fieldValues.companyName}</h3>
            <div
              className={styles.footerDescription}
              dangerouslySetInnerHTML={{ __html: fieldValues.description }}
            />
          </div>

          {fieldValues.showLinks && (
            <div className={styles.footerSection}>
              <h4 className={styles.footerSubtitle}>Quick Links</h4>
              <ul className={styles.footerLinks}>
                <li>
                  <a href="#hero">Home</a>
                </li>
                <li>
                  <a href="#calculator">Calculator</a>
                </li>
                <li>
                  <a href="#about">About</a>
                </li>
                <li>
                  <a href="#contact">Contact</a>
                </li>
              </ul>
            </div>
          )}

          {fieldValues.showSocial && (
            <div className={styles.footerSection}>
              <h4 className={styles.footerSubtitle}>Follow Us</h4>
              <div className={styles.socialLinks}>
                {fieldValues.twitterUrl && (
                  <a
                    href={fieldValues.twitterUrl}
                    className={styles.socialLink}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </a>
                )}
                {fieldValues.linkedinUrl && (
                  <a
                    href={fieldValues.linkedinUrl}
                    className={styles.socialLink}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                )}
                {fieldValues.githubUrl && (
                  <a href={fieldValues.githubUrl} className={styles.socialLink}>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        <div className={styles.footerBottom}>
          <p className={styles.footerText}>{fieldValues.copyrightText}</p>
          {fieldValues.showBackToTop && (
            <button
              className={styles.backToTop}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2l3.09 3.09L9 11.17V22H7V11.17L0.91 5.09 4 2z" />
              </svg>
              Back to Top
            </button>
          )}
        </div>
      </div>
    </footer>
  );
}

export const fields = (
  <ModuleFields>
    <TextField name="companyName" label="Company Name" default="DevinSibs" />
    <RichTextField
      name="description"
      label="Company Description"
      default="<p>Your trusted partner for advanced calculations and currency conversions. Built with modern technology for seamless user experience.</p>"
    />
    <TextField
      name="copyrightText"
      label="Copyright Text"
      default="© 2024 DevinSibs. All rights reserved."
    />
    <BooleanField name="showLinks" label="Show Quick Links" default={true} />
    <BooleanField name="showSocial" label="Show Social Links" default={true} />
    <BooleanField
      name="showBackToTop"
      label="Show Back to Top Button"
      default={true}
    />
    <TextField
      name="twitterUrl"
      label="Twitter URL"
      default="https://twitter.com/spotdevac"
    />
    <TextField
      name="linkedinUrl"
      label="LinkedIn URL"
      default="https://linkedin.com/company/spotdevac"
    />
    <TextField
      name="githubUrl"
      label="GitHub URL"
      default="https://github.com/spotdevac"
    />
    <ColorField
      name="backgroundColor"
      label="Background Color"
      default={{ color: '#1f2937', opacity: 100 }}
    />
    <ColorField
      name="textColor"
      label="Text Color"
      default={{ color: '#ffffff', opacity: 100 }}
    />
  </ModuleFields>
);

export const meta = {
  label: 'Footer Section',
};
