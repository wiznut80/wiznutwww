import App, {AppProps} from 'next/app';
import { useRouter } from 'next/router';

// function MyApp({ Component, pageProps }: AppProps) {
//
//   console.info("[page.tsx] started");
//
//   return <Component {...pageProps} />;
// }
//
// export default MyApp;


export default function Page() {
  console.info("[page.tsx] started");
  return <h1>Hello, Next.js!</h1>
}
