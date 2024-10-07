import React from 'react';
import useConsentStore from '@/store/useConsentStore';

interface CookieConsentProps {
  onAccept?: () => void;
  onDecline?: () => void;
}

const CookieConsent: React.FC<CookieConsentProps> = (
    {
      onAccept = () => {
      },
      onDecline = () => {
      }
    }) => {
  const {consentGiven, setConsent} = useConsentStore();

  const handleAccept = () => {
    setConsent(true);
    onAccept();
  };

  const handleDecline = () => {
    setConsent(false);
    onDecline();
  };

  if (consentGiven !== null) {
    return null;
  }

  return (
      <div className="cookie-consent">
        <p>We use cookies to improve your experience. Do you accept?</p>
        <button onClick={handleAccept}>Accept</button>
        <button onClick={handleDecline}>Decline</button>
        <style jsx>{`
          .cookie-consent {
            position: fixed;
            bottom: 0;
            width: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          button {
            margin-left: 1rem;
            padding: 0.5rem 1rem;
            border: none;
            cursor: pointer;
          }
        `}</style>
      </div>
  );
};

export default CookieConsent;
