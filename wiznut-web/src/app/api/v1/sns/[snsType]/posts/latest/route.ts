import { type NextRequest } from 'next/server'
import axios from 'axios';
import {validSnsTypes} from '@/constants/snsTypes';
import {HttpStatusCodes} from '@/constants/HttpStatusCodes';

export async function GET(
    request: NextRequest,
    {params}: { params: { snsType: string } }
) {
  const snsType = params.snsType;

  console.info("[snsType]:::::::::::::", snsType);

  try {
    if (!validSnsTypes.includes(snsType as string)) {
      return new Response(
          JSON.stringify({error: 'Invalid snsType parameter'}),
          {status: HttpStatusCodes.BAD_REQUEST}
      );
    }
    const count = request.nextUrl.searchParams.get('count') || null;
    const countValue = count ? parseInt(count as string, 10) : 3;
    const apiUrl = `${process.env.WIZNUT_API_BASE_URL}/v1/sns/${snsType}/posts/latest?count=${countValue}`;
    const response = await axios.get(apiUrl);

    return new Response(JSON.stringify(response.data), {status: HttpStatusCodes.OK});
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return new Response(
          JSON.stringify(error.response.data),
          {status: error.response.status}
      );
    } else {
      return new Response(
          JSON.stringify({error: 'Internal server error'}),
          {status: HttpStatusCodes.INTERNAL_SERVER_ERROR}
      );
    }
  }

}
