import React from 'react';
import { useTranslation } from 'react-i18next';

const goBack = e => {
  e.preventDefault();
  window.history.back();
};

export default function BackButton() {
  const { t } = useTranslation();

  console.log(t('Go back'));

  return (
    <a href="#" onClick={goBack}>
      ← {t('Go back')}
    </a>
  );
}
