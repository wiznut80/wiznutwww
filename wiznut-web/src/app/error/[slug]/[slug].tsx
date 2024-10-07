import { NextPage } from 'next';
import Link from 'next/link';
import { GetServerSideProps } from 'next';

type Props = {
  slug?: string;
};

const ErrorPage: NextPage<Props> = ({ slug }) => {
  return (
      <div>
        <h1>Error Page</h1>
        {slug ? (
            <p>The slug is: {slug}</p>
        ) : (
            <p>No slug provided.</p>
        )}
        <Link href="/other-page">
          <a>Go to other page</a>
        </Link>
      </div>
  );
};

// 서버측에서 slug 값을 불러옴
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  return {
    props: {
      slug: params?.slug
    }
  };
};

export default ErrorPage;
