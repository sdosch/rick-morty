import React from "react";
import { useHistory } from "react-router-dom";
import { useInfiniteQuery } from "react-query";
import fetch from "./fetch";
import { Box, Heading, InfiniteScroll } from "grommet";
import { User, UserFemale, Test, Gremlin } from "grommet-icons";
import { PulseLoader } from "react-spinners";

export default function Characters() {
  const customPad = { horizontal: "10px", vertical: "5px" };
  const history = useHistory();
  const fetchCharacters = (
    key,
    group = "https://rickandmortyapi.com/api/character/?page=1"
  ) => fetch(group);

  const {
    status,
    data,
    isFetching,
    isFetchingMore,
    fetchMore,
    canFetchMore,
  } = useInfiniteQuery("characters", fetchCharacters, {
    getFetchMore: (lastGroup, allGroups) => lastGroup.info.next,
  });

  const renderGender = (gender) => {
    let icon, color;
    switch (gender) {
      case "Male":
        icon = <User />;
        color = "accent-1";
        break;
      case "Female":
        icon = <UserFemale />;
        color = "accent-2";
        break;
      case "unknown":
        icon = <Test />;
        color = "accent-3";
        break;
      default:
        icon = <Gremlin />;
        color = "accent-4";
    }
    return (
      <Box background={color} pad="xsmall" round>
        {icon}
      </Box>
    );
  };

  return status === "loading" ? (
    <PulseLoader size={10} color={"#dadada"} />
  ) : status === "error" ? (
    <p>Error :(</p>
  ) : (
    <>
      <Heading level="1">Characters</Heading>
      {data.map((group, i) => (
        <InfiniteScroll
          items={group.results}
          onMore={!canFetchMore || isFetchingMore ? null : fetchMore}
          step={20}
        >
          {(result, index) => (
            <Box
              hoverIndicator
              direction="row"
              key={index}
              align="center"
              justify="start"
              pad="small"
              border={{ side: "bottom" }}
              onClick={() => {
                history.push(`/characters/${result.id}`);
              }}
            >
              {renderGender(result.gender)}
              <Box pad={customPad}>
                <strong>{result.name}</strong>
              </Box>

              <Box
                background={{ color: "light-5" }}
                round="xsmall"
                pad={customPad}
                margin={{ horizontal: "10px" }}
              >
                {`${result.gender} ${result.species}`}
              </Box>
            </Box>
          )}
        </InfiniteScroll>
      ))}
      {isFetching ? (
        <PulseLoader size={10} color={"#dadada"} css={{ margin: 20 }} />
      ) : null}
    </>
  );
}
