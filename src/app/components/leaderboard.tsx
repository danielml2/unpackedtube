"use client";
import { ReactElement } from "react";

export function Leaderboard(props: any): ReactElement {
  return <div>{render(props.data)}</div>;
}

function render(data: any[]) {
  let creatorMap = new Map();

  // for(let video of data) {
  //   if (!video["subtitles"]) return;
  //   console.log("video")

  //   let creatorName = video["subtitles"][0]["name"];
  //   creatorMap.set(
  //     creatorName,
  //     creatorMap.has(creatorName) ? creatorMap.get(creatorName) + 1 : 1
  //   );
  // }
  for(let video of data) {

    if (!video["subtitles"]) continue;
    console.log("video")

    let creatorName = video["subtitles"][0]["name"];
    creatorMap.set(
      creatorName,
      creatorMap.has(creatorName) ? creatorMap.get(creatorName) + 1 : 1
    );
  }

  // data.forEach((video) => {
  
  // })

  console.log(creatorMap.size)

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
