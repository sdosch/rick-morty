import React from "react";
import { useHistory } from "react-router-dom";
import { useQuery } from "react-query";
import fetch from "./fetch";
import { Box, Heading, List } from "grommet";
import { User, UserFemale, Gremlin } from "grommet-icons";
import { PulseLoader } from "react-spinners";

export default function Characters() {
  const history = useHistory();
  const { status, data } = useQuery("characters", () =>
    fetch("https://rickandmortyapi.com/api/character/")
  );
  const customPad = { horizontal: "10px", vertical: "5px" };

  if (status === "loading") return <PulseLoader size={10} color={"#dadada"} />;
  if (status === "error") return <p>Error :(</p>;

  const renderGender = (gender) => {
    switch (gender) {
      case "Male":
        return <User />;
      case "Female":
        return <UserFemale />;
      case "unknown":
        return <Gremlin />;
      default:
        return <User />;
    }
  };

  console.info(data);

  return (
    <>
      <Heading level="1">Characters</Heading>
      <List
        data={data.results}
        onClickItem={(event) => history.push(`/characters/${event.item.id}`)}
      >
        {(result, index) => (
          <Box direction="row" key={index} align="center" justify="start">
            <Box background="brand" pad="xsmall" round>
              {renderGender(result.gender)}
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
              {result.species}
            </Box>
          </Box>
        )}
      </List>
    </>
  );
}
