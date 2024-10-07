'use client';

import React, {useState} from 'react';
import axios, {AxiosError} from 'axios';
import {useParams} from "next/navigation";
import {z} from "zod";
import type {LocaleTypes} from "@/utils/localization/settings";
import {useTranslation} from "@/utils/localization/client";
import {I18N_NAMESPACE} from '@/constants/common';

const PreRegistrationPage: React.FC = () => {
  const locale = useParams()?.locale as LocaleTypes;
  const {t} = useTranslation(locale, I18N_NAMESPACE);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);
        setSuccess(null);

        const emailSchema = z.string().email();
        try {
          emailSchema.parse(email);
        } catch (err) {
          setError('Invalid email address');
          setIsLoading(false);
          return;
        }

        try {
          const response = await axios.post('/api/v1/pre-registrations/email', {email});
          console.info("[handleSubmit.response]:::::::OK:::::::", response.status, response.data);
          setSuccess("Pre-registration successful. Thank you!");
          setEmail("");
        } catch (err) {
          const axiosError = err as AxiosError;
          if (axiosError.status === 409) {
            setError('The email is already registered.');
          } else {
            setError('Failed to pre-register. Please try again.');
          }
        } finally {
          setIsLoading(false);
        }
      }
  ;

  return (
      <div className="pre-registration-container">
        <p>---------------------------------------------</p>
        <h1>사전예약에 참여하세요!</h1>
        <p>사전예약 하신후 게임에 필요한 필수 아이템을 드립니다!<br />2024.10.10 ~ 정식 오픈까지</p>
        <form onSubmit={handleSubmit}>
          <div className="email-input-container">
            <input
                name="email"
                type="email"
                placeholder="이메일 주소를 입력 해주세요."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                minLength={6}
                className="email-input"
            />
            <button type="submit" className="submit-button"
                    disabled={isLoading}>{isLoading ? '처리중...' : '예약하기'}</button>
          </div>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <div>
            <label>
              <input type="checkbox" required />
              개인정보 수집 및 이용 등 모든 내용에 동의합니다.
            </label>
          </div>
        </form>
        <style jsx>{`
          .pre-registration-container {
            text-align: left;
            padding: 20px;
            font-color: #333;
          }

          .email-input-container {
            display: flex;
            align-items: center;
          }

          form {
            display: flex;
            flex-direction: column;
          }

          input[type="email"] {
            padding: 10px;
            margin: 10px 0;
            width: 300px;
          }

          input[type="email"].email-input {
            padding: 10px;
            margin: 10px 0;
            width: 300px;
            color: black;
          }

          button[type="submit"].submit-button {
            padding: 10px 20px;
            background-color: #ffcc00;
            border: none;
            cursor: pointer;
          }

          button[type="submit"] {
            padding: 10px 20px;
            background-color: #ffcc00;
            border: none;
            cursor: pointer;
          }

          .error-message {
            color: red;
          }

          .success-message {
            color: green;
          }
        `}</style>
      </div>
  );
};

export default PreRegistrationPage;
