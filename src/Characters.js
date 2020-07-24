import React from "react";

import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import fetch from "./fetch";
import { Heading, Paragraph } from "grommet";

export default function Characters() {
  const { status, data } = useQuery("characters", () =>
    fetch("https://rickandmortyapi.com/api/character/")
  );

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>Error :(</p>;

  console.info(data);

  return (
    <>
      <Heading level="1">Characters</Heading>
      {data.results.map((person) => {
        return (
          <article key={person.id} style={{ margin: "16px 0 0" }}>
            <Link to={`/characters/${person.id}`}>
              <Paragraph>
                {person.name} - {person.gender}: {person.species}
              </Paragraph>
            </Link>
          </article>
        );
      })}
    </>
  );
}
