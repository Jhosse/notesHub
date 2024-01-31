import Head from "next/head";
import { useRouter } from "next/router";
import Button, { ButtonVariation } from "../components/button/Button";
import Paths from "../utils/paths";

const Home = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>NotesHub App</title>
        <meta name="description" content="This is a notes hub app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        role="main"
        className="w-full h-screen flex justify-center items-center"
      >
        <section className="text-center">
          <h1 className="page-title custom-underline">NotesHub</h1>
          <Button
            className="mt-10"
            variation={ButtonVariation.Secondary}
            cb={() => router.push(Paths.Admin)}
          >
            Sign in
          </Button>
        </section>
      </main>
    </>
  );
};

export default Home;
