import axios, {AxiosError} from 'axios';
import {HttpStatusCodes} from '@/constants/HttpStatusCodes';
import type {NextRequest} from "next/server";

export async function POST(
    request: NextRequest
) {
  const {email} = await request.json();
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  if (!email || typeof email !== 'string' || !isValidEmail(email)) {
    return new Response(
        JSON.stringify({
          responseCode: {code: HttpStatusCodes.BAD_REQUEST},
          errorMessage: 'Invalid email address'
        }),
        {status: HttpStatusCodes.BAD_REQUEST}
    );
  }

  try {
    const apiUrl = `${process.env.WIZNUT_API_BASE_URL}/v1/pre-registrations/email`;
    const response = await axios.post(apiUrl, {email});
    console.info("[response]:::::::OK:::::::", response.status, response.data);
    return new Response(JSON.stringify(response.data), {status: HttpStatusCodes.OK});
  } catch (error) {
    const axiosError = error as AxiosError;
    console.info("[response]:::::::error:::::::", axiosError.response?.data);
    return new Response(
        JSON.stringify(axiosError.response?.data),
        {status: axiosError.status}
    );
  }
}
