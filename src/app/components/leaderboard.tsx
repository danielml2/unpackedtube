"use client";
import { ReactElement } from "react";

export function Leaderboard(props: any): ReactElement {
  return <div>{render(props.data, props.year)}</div>;
}

function render(data: any[], year?: string) {
  let creatorMap = new Map();

  let videos = data;

  if (year != undefined && year.toUpperCase() != "ALL")
    videos = videos.filter((video: any) => {
      return video["time"].includes(year);
    });

  videos.forEach((video: any) => {
    if (!video["subtitles"]) return;

    let creatorName = video["subtitles"][0]["name"];
    creatorMap.set(
      creatorName,
      creatorMap.has(creatorName) ? creatorMap.get(creatorName) + 1 : 1
    );
  });

  return Array.from(creatorMap.entries())
    .sort((creator1: any, creator2: any) => {
      return creator2[1] - creator1[1];
    })
    .map((entry: any, index) => (
      <div key={index}>
        {index + 1}. {entry[0]}: {entry[1]} <br />
      </div>
    ));
}
