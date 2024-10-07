import {createTranslation} from "@/utils/localization/server";
import {LocaleTypes} from "@/utils/localization/settings";
import NoticeList from "@/components/NoticeList";
import SNSPostPage from "@/components/SnsList";
import PreRegistrationForm from "@/components/PreRegistrationForm";

export default async function Home({params: {locale}}: {
  params: { locale: LocaleTypes }
}) {
  const {t} = await createTranslation(locale, 'home');

  console.log('[locale]:::::::::::::', locale);

  return (
      <>
        <div className="test-container">
          <h1>{t('greeting')}</h1>
        </div>
        <PreRegistrationForm />
        <NoticeList />
        <SNSPostPage snsType="X" />
      </>
  );
};
