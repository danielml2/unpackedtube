"use client";
import { ReactElement, useState } from "react";
import { CreatorSelect } from "./creatorselect";

export function CreatorVideoList(props: any): ReactElement {
  const [selectedCreator, setSelectedCreator] = useState("");
  const [isHidden, setIsHidden] = useState(true);


  return (
    <div>
      <button onClick={() => {
        if(props.data.length > 0)
          setIsHidden(!isHidden)
      }}>{isHidden ? "Open Creator video search" : "Close creator video search"}</button>
      <div hidden={isHidden}>
        <CreatorSelect  data={props.data} onChange={setSelectedCreator} />
      <br />
      {selectedCreator != "" && renderVideos(props.data)}
      </div>
    </div>
  );

  function renderVideos(data: any[]) {
    if(isHidden)
      return <div></div>
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
        {videos.map((video, index) => (
          <div key={index}>{video["title"]}</div>
        ))}
      </div>
    );
  }

}
