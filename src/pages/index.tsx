import { GetStaticProps } from "next";
import Head from "next/head";
import { getSocialEntries } from "../services/content-service";
import MainLayout from "../components/layouts/mainLayout/MainLayout";
import { ISocialIconEntryFields } from "../@types/generated/contentful";

interface IHomeProps {
  socialIcons: ISocialIconEntryFields[];
}

const Home = ({ socialIcons }: IHomeProps) => {
  return (
    <>
      <Head>
        <title>Jose Terrones Portfolio</title>
        <meta name="description" content="This is Jose Terrones' Portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout socialIcons={socialIcons}>
        <main role="main"></main>
      </MainLayout>
    </>
  );
};

export default Home;

export const getStaticProps = (async () => {
  const socialIcons = await getSocialEntries();

  return {
    props: {
      socialIcons,
    },
  };
}) satisfies GetStaticProps<IHomeProps>;
