import React from "react";
import { useParams, useHistory } from "react-router";
import { useQuery } from "react-query";
import fetch from "./fetch";
import {
  Box,
  Heading,
  List,
  Table,
  TableRow,
  TableCell,
  TableHeader,
  TableBody,
} from "grommet";
import { PulseLoader } from "react-spinners";

function Character() {
  const history = useHistory();

  const { characterId } = useParams();
  const { status, data } = useQuery(`character-${characterId}`, () =>
    fetch(`https://rickandmortyapi.com/api/character/${characterId}`)
  );

  if (status === "loading") return <PulseLoader size={10} color={"#dadada"} />;
  if (status === "error") return <p>Error :(</p>;

  const locationUrlPars = data.location.url.split("/").filter(Boolean);
  const locationId = locationUrlPars[locationUrlPars.length - 1];

  const getEpisodeIdfromUrl = (url) => {
    const episodeUrlParts = url.split("/").filter(Boolean);
    return episodeUrlParts[episodeUrlParts.length - 1];
  };

  return (
    <Box>
      <Heading level="1">{data.name}</Heading>
      <Box direction="row">
        <img src={data.image} alt={data.name} />
        <Table size="medium" aria-label="simple table" margin="medium">
          <TableHeader>
            <TableRow>
              <TableCell>
                <strong>Feature</strong>
              </TableCell>
              <TableCell>
                <strong>Value</strong>
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Gender</TableCell>
              <TableCell>{data.gender}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Status</TableCell>
              <TableCell>{data.status}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Species</TableCell>
              <TableCell>{data.species}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Origin</TableCell>
              <TableCell>{data.origin.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Location</TableCell>
              <TableCell>
                <Location id={locationId} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
      <Heading level="3">Episodes</Heading>

      <List
        data={data.episode}
        onClickItem={(event) => {
          const episodeId = getEpisodeIdfromUrl(event.item);
          history.push(`/episodes/${episodeId}`);
        }}
      >
        {(result) => {
          const episodeId = getEpisodeIdfromUrl(result);

          return <Episode id={episodeId} key={`episode-${episodeId}`} />;
        }}
      </List>
    </Box>
  );
}

function Episode({ id }) {
  const customPad = { horizontal: "10px", vertical: "5px" };

  const { data, status } = useQuery(`episode-${id}`, () =>
    fetch(`https://rickandmortyapi.com/api/episode/${id}`)
  );

  if (status === "loading") return <PulseLoader size={10} color={"#dadada"} />;
  if (status === "error") return <p>Error :(</p>;

  return (
    <Box direction="row" key={id} align="center" justify="start">
      <Box
        background={{ color: "brand" }}
        round="xsmall"
        pad={customPad}
        margin={{ horizontal: "10px" }}
      >
        {data.episode}
      </Box>
      <Box pad={customPad}>
        <strong>{data.name}</strong>
      </Box>
      <Box
        background={{ color: "light-5" }}
        round="xsmall"
        pad={customPad}
        margin={{ horizontal: "10px" }}
      >
        {data.air_date}
      </Box>
    </Box>
  );
}

function Location({ id }) {
  const { data, status } = useQuery(`location-${id}`, () =>
    fetch(`https://rickandmortyapi.com/api/location/${id}`)
  );

  if (status === "loading") return <PulseLoader size={10} color={"#dadada"} />;
  if (status === "error") return <p>Error :(</p>;

  return (
    <>
      {data.name} - {data.type}
    </>
  );
}

export default Character;
