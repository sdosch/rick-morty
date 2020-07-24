import React from "react";

import { Link } from "react-router-dom";
import { Heading, Paragraph } from "grommet";

export default function Home() {
  return (
    <div>
      <Heading level="1">React Query Demo</Heading>
      <Heading level="2">Using the Rick And Morty API</Heading>
      <section>
        <Heading level="3">Why React Query?</Heading>
        <Paragraph>
          In this demo you will be able to see how React Query is a significant
          improvement over <strong>redux</strong>, <strong>mobx</strong>, and
          any other general-purpose state container.
        </Paragraph>
        <Paragraph>
          No reducers, thunks, or sagas. No ES6 models to maintain in order to
          tag them as observable.
        </Paragraph>
        <Paragraph>
          Simply associate a key with your fetch call and let{" "}
          <strong>React Query</strong> handle the rest.
        </Paragraph>
        <Heading level="3">Ready to get started?</Heading>
        <Paragraph>
          Check out the <Link to="/episodes">Episodes</Link> and{" "}
          <Link to="/characters">Characters</Link>!
        </Paragraph>
      </section>
    </div>
  );
}
