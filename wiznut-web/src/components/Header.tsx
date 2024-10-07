'use client';

import {useParams} from 'next/navigation';
import Link from 'next/link';
import ChangeLocale from './ChangeLocale';
import {useTranslation} from '@/utils/localization/client';
import type {LocaleTypes} from '@/utils/localization/settings';
import {useEffect, useState} from 'react';
import {I18N_NAMESPACE} from '@/constants/common';

const HASH_CHANGE_EVENT = 'hashchange';

export default function Header() {
  const [currentHash, setCurrentHash] = useState("");
  const locale = useParams()?.locale as LocaleTypes;
  const {t} = useTranslation(locale, I18N_NAMESPACE);

  const links = [
    {hash: '', label: t('home')},
    {hash: 'event', label: t('MD_gnb_preregist')},
    {hash: 'news', label: t('MD_gnb_news')},
    {hash: 'world', label: t('MD_gnb_world')},
    {hash: 'hero', label: t('MD_gnb_hero')}
  ];

  useEffect(() => {
    // Important: If setCurrentHash is not set to "default", setTimeout will not work,
    // and the menu will not be automatically selected when the page is refreshed.
    // Do not remove it.
    setCurrentHash("");

    const timeoutId = setTimeout(() => {
      setCurrentHash(window.location.hash);
      window.dispatchEvent(new Event(HASH_CHANGE_EVENT));
    }, 1);

    const handleHashChange = (event: HashChangeEvent) => {
      setCurrentHash(window.location.hash);
    };
    window.addEventListener(HASH_CHANGE_EVENT, handleHashChange);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener(HASH_CHANGE_EVENT, handleHashChange);
    };
  }, []);

  const handleLinkClick = (hash: string) => {
    window.location.hash = hash;
  };

  const getClassName = (targetHash: string) => {
    return currentHash === `#${targetHash}` ? 'selected' : '';
  };

  return (
      <header className="test-header">
        <nav className="test-nav">
          {links.map((link) => (
              <Link
                  key={link.hash}
                  href={`#${link.hash}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.hash);
                  }}
                  className={getClassName(link.hash)}
              >
                {link.label}
              </Link>
          ))}
        </nav>
        <ChangeLocale />
      </header>
  );
};
