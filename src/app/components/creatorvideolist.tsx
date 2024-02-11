"use client";
import { ReactElement, useState } from "react";
import { CreatorSelect } from "./creatorselect";

export function CreatorVideoList(props: any): ReactElement {
  const [selectedCreator, setSelectedCreator] = useState("");

  return (
    <div>
      <CreatorSelect data={props.data} onChange={setSelectedCreator} />
      <br />
      {selectedCreator != "" && renderVideos(props.data)}
    </div>
  );

  function renderVideos(data: any[]) {
    let videos = data;
    let uniqueVideos: any[] = [];

    videos = videos.filter(
      (video) =>
        video["subtitles"] && video["subtitles"][0]["name"] == selectedCreator
    );
    videos.forEach((video) => {
      if (!uniqueVideos.includes(video["title"]))
        uniqueVideos.push(video["title"]);
    });

    return (
      <div>
        Count: {videos.length} Unique Videos: {uniqueVideos.length}
        <br />
        {videos.map((video) => (
          <div>{video["title"]}</div>
        ))}
      </div>
    );
  }

  function setNewSelectedCreator(selectedCreator: string) {}
}
