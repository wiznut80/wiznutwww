"use client";

import React, {useEffect, useState} from 'react';
import axios from "axios";

interface SNSPostResponse {
  data: Tweet[];
  meta: Meta;
}

interface Tweet {
  editHistoryTweetIds: string[];
  id: string;
  text: string;
}

interface Meta {
  resultCount: number;
  newestId: string;
  oldestId: string;
}

const fetchSNSPosts = async (snsType: String): Promise<SNSPostResponse> => {
  const response = await axios.get(`/api/v1/sns/${snsType}/posts/latest`); // 실제 API 엔드포인트로 변경하세요
  if (response.status !== 200) {
    throw new Error('Failed to fetch SNS posts');
  }
  return response.data;
};

interface SNSPostPageProps {
  snsType: string;
}

const SNSPostPage: React.FC<SNSPostPageProps> = ({snsType}) => {
  const [snsPostResponse, setSnsPostResponse] = useState<SNSPostResponse | null>(null);
  const [snsLoading, setSnsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        console.info("[SNSPostPage] started");

        const data = await fetchSNSPosts(snsType);

        console.info("[SNSPostPage] fetched data", data);

        setSnsPostResponse(data);
      } catch (err) {
        setError(`Failed to fetch ${snsType} posts`);
      } finally {
        setSnsLoading(false);
      }
    })();
  }, []);

  if (snsLoading) {
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
      <div className="sns-post-container">
        <p>---------------------------------------------</p>
        <h1>SNS Post List</h1>
        <ul>
          {snsPostResponse?.data.map((post) => (
              <li key={post.id}>
                <p>{post.text}</p>
              </li>
          ))}
        </ul>

        <style jsx>{`
          .sns-post-container {
            text-align: left;
            padding: 20px;
            font-color: #333;
          }
        `}</style>
      </div>
  );
};

export default SNSPostPage;
