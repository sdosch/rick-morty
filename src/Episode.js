import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { useQuery } from "react-query";
import fetch from "./fetch";
import { Heading, Button, Paragraph, Box } from "grommet";

function Episode() {
  const customPad = { horizontal: "10px", vertical: "5px" };
  const { episodeId } = useParams();
  const { data, status } = useQuery(`episode-${episodeId}`, () =>
    fetch(`https://rickandmortyapi.com/api/episode/${episodeId}`)
  );

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>Error :(</p>;

  return (
    <Box wrap>
      <Heading level="1">{data.name}</Heading>
      <Box
        background={{ color: "light-5" }}
        round="xsmall"
        pad={customPad}
        alignSelf="start"
      >
        {data.air_date}
      </Box>
      <Heading level="3">Characters</Heading>
      <Box direction="row" wrap>
        {data.characters.map((character) => {
          const characterUrlParts = character.split("/").filter(Boolean);
          const characterId = characterUrlParts[characterUrlParts.length - 1];
          return <Character id={characterId} key={characterId} />;
        })}
      </Box>
    </Box>
  );
}

function Character({ id }) {
  const { data, status } = useQuery(`character-${id}`, () =>
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
  );

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>Error :(</p>;

  return (
    <Link to={`/characters/${id}`}>
      <Button key={id} label={data.name} alignSelf="start" margin="xsmall" />
    </Link>
  );
}

export default Episode;
