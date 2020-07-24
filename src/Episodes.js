import React from "react";
import { Heading, Paragraph } from "grommet";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import fetch from "./fetch";

export default function Episodes() {
  const { data, status } = useQuery("episodes", () =>
    fetch("https://rickandmortyapi.com/api/episode")
  );

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  if (status === "error") {
    return <p>Error :(</p>;
  }

  return (
    <>
      <Heading level="1">Episodes</Heading>
      {data.results.map((episode) => (
        <article key={episode.id}>
          <Link to={`/episodes/${episode.id}`}>
            <Paragraph>
              {episode.episode} - {episode.name} <em>{episode.airDate}</em>
            </Paragraph>
          </Link>
        </article>
      ))}
    </>
  );
}
