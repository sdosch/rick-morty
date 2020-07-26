import React from "react";
import { Box, Heading, List } from "grommet";
import { useHistory } from "react-router-dom";
import { useQuery } from "react-query";
import fetch from "./fetch";

export default function Episodes() {
  const history = useHistory();
  const { data, status } = useQuery("episodes", () =>
    fetch("https://rickandmortyapi.com/api/episode")
  );
  const customPad = { horizontal: "10px", vertical: "5px" };

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  if (status === "error") {
    return <p>Error :(</p>;
  }

  return (
    <>
      <Heading level="1">Episodes</Heading>
      <List
        data={data.results}
        onClickItem={(event) => history.push(`/episodes/${event.item.id}`)}
      >
        {(result, index) => (
          <Box direction="row" key={index} align="center" justify="start">
            <Box
              background={{ color: "brand" }}
              round="xsmall"
              pad={customPad}
              margin={{ horizontal: "10px" }}
            >
              {result.episode}
            </Box>
            <Box pad={customPad}>
              <strong>{result.name}</strong>
            </Box>
            <Box
              background={{ color: "light-5" }}
              round="xsmall"
              pad={customPad}
              margin={{ horizontal: "10px" }}
            >
              {result.air_date}
            </Box>
          </Box>
        )}
      </List>
    </>
  );
}
