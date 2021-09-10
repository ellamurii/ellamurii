import Link from "next/link";
import Main from "../components/layouts/Main";

const AboutPage = () => (
  <Main title="About | Next.js + TypeScript Example">
    <h1>About</h1>
    <p>This is the about page</p>
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </Main>
);

export default AboutPage;
