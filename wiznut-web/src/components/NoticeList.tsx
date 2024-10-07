'use client';

import React, {useEffect, useState} from 'react';
import {useParams} from 'next/navigation';
import axios from 'axios';

const NoticesPage = () => {
  const params = useParams();
  const locale = Array.isArray(params.locale) ? params.locale[0] : params.locale;
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    (async () => {
      try {
        const supportedLocales = ['en', 'ko', 'ja'];
        const currentLocale = supportedLocales.includes(locale) ? locale : 'en';
        const response = await axios.get(`lan/v1/wiznut/web/document/notice?lang=${currentLocale}`);
        console.info("[Notice]", response.data.result.documents);

        setNotices(response.data.result.documents);
      } catch (err) {
        setError('Failed to fetch notices');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
        <>
          <p>---------------------------------------------</p>
          <p>Loading...</p>
        </>
    );
  }

  if (error) {
    return (
        <>
          <p>---------------------------------------------</p>
          <p>{error}</p>
        </>
    );
  }

  return (
      <div className="notice-container">
        <p>---------------------------------------------</p>
        <h1>Notices</h1>
        <ul>
          {notices.map((notice) => (
              <li key={notice.id}>
                <h2>{notice.title}</h2>
                <p>Registered: {notice.fmtRegistered}</p>
                <p>Open: {new Date(notice.open).toLocaleString()}</p>
                <p>Close: {new Date(notice.close).toLocaleString()}</p>
              </li>
          ))}
        </ul>
        <style jsx>{`
          .notice-container {
            text-align: left;
            padding: 20px;
            font-color: #333;
          }
        `}</style>
      </div>
  );
};

export default NoticesPage;

interface Notice {
  fmtRegistered: string;
  newBadge: boolean;
  open: number;
  close: number;
  title: string;
  sortOrder: number;
  revision: number;
  registered: number;
  id: number;
  updated: number;
}
