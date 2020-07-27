import React from "react";
import { Box, Heading, InfiniteScroll } from "grommet";
import { useHistory } from "react-router-dom";
import { useInfiniteQuery } from "react-query";
import { PulseLoader } from "react-spinners";
import fetch from "./fetch";

export default function Episodes() {
  const customPad = { horizontal: "10px", vertical: "5px" };
  const history = useHistory();
  const fetchEpisodes = (key, cursor) =>
    fetch(cursor ? cursor : "https://rickandmortyapi.com/api/episode");

  const {
    status,
    data,
    isFetching,
    isFetchingMore,
    fetchMore,
    canFetchMore,
  } = useInfiniteQuery("episodes", fetchEpisodes, {
    getFetchMore: (lastGroup, allGroups) => lastGroup.info.next,
  });

  return status === "loading" ? (
    <PulseLoader size={10} color={"#dadada"} />
  ) : status === "error" ? (
    <p>Error :(</p>
  ) : (
    <>
      <Heading level="1">Episodes</Heading>
      {data.map((group, i) => (
        <InfiniteScroll
          items={group.results}
          onMore={!canFetchMore || isFetchingMore ? null : fetchMore}
          step="20"
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
                history.push(`/episodes/${result.id}`);
              }}
            >
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
        </InfiniteScroll>
      ))}
      {isFetching ? (
        <PulseLoader size={10} color={"#dadada"} css={{ margin: 20 }} />
      ) : null}
    </>
  );
}
