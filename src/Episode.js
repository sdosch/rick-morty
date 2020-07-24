import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { useQuery } from "react-query";
import fetch from "./fetch";
import { Heading, Paragraph } from "grommet";

function Episode() {
  const { episodeId } = useParams();
  const { data, status } = useQuery(`episode-${episodeId}`, () =>
    fetch(`https://rickandmortyapi.com/api/episode/${episodeId}`)
  );

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>Error :(</p>;

  return (
    <div>
      <Heading level="1">{data.name}</Heading>
      <Paragraph>{data.air_date}</Paragraph>
      <br />
      <Heading level="3">Characters</Heading>
      {data.characters.map((character) => {
        const characterUrlParts = character.split("/").filter(Boolean);
        const characterId = characterUrlParts[characterUrlParts.length - 1];
        return <Character id={characterId} key={characterId} />;
      })}
    </div>
  );
}

function Character({ id }) {
  const { data, status } = useQuery(`character-${id}`, () =>
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
  );

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>Error :(</p>;

  return (
    <article key={id}>
      <Link to={`/characters/${id}`}>
        <Paragraph>{data.name}</Paragraph>
      </Link>
    </article>
  );
}

export default Episode;
