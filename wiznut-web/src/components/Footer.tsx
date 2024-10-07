'use client';

import {usePathname, useParams} from 'next/navigation';
import Link from 'next/link';
import ChangeLocale from './ChangeLocale';
import {useTranslation} from '@/utils/localization/client';
import type {LocaleTypes} from '@/utils/localization/settings';

export default function Header() {
    const pathName = usePathname();
    const locale = useParams()?.locale as LocaleTypes;
    const {t} = useTranslation(locale, 'common');
    return (
        <footer className="test-footer">
            <nav className="test-nav-footer">
              <Link href={`#`}>
                Terms of Service
              </Link>
              <Link href={`#`}>
                Privacy policy
              </Link>
              <Link href={`#`}>
                Marketing policy
              </Link>
              <Link href={`#`}>
                Inquiry
              </Link>
            </nav>
            <ChangeLocale />
        </footer>
    );
};
