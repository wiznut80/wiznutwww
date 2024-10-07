'use client';

import React from 'react';
import {useParams, useRouter, useSelectedLayoutSegments} from 'next/navigation';

const ChangeLocale = () => {
    const router = useRouter();
    const params = useParams();
    const urlSegments = useSelectedLayoutSegments();

    const handleLocaleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newLocale = event.target.value;
        const currentHash = window.location.hash;
        router.push(`/${newLocale}/${urlSegments!.join('/')}${currentHash}`);
    };

    return (
        <div className="test-change-locale">
            <select onChange={handleLocaleChange} value={params!.locale}>
                <option value="en">🇺🇸 English</option>
                <option value="ko">🇰🇷 한국어</option>
                <option value="ja">🇯🇵 日本語</option>
            </select>
        </div>
    );
};

export default ChangeLocale;
