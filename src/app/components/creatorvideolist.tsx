"use client";
import { ReactElement, useState } from "react";
import { CreatorSelect } from "./creatorselect";

export function CreatorVideoList(props: any): ReactElement {
  const [selectedCreator, setSelectedCreator] = useState("");
  const [isHidden, setIsHidden] = useState(true);


  return (
    <div>
    <div className="collapse collapse-arrow bg-base-200">
      <input type="checkbox"></input>
      <div className="collapse-title title-xl font-medium">{isHidden ? "Open Creator video search" : "Close creator video search"}</div>
        <div className="collapse-content">
        <CreatorSelect  data={props.data} onChange={setSelectedCreator} />
      <br />
      {selectedCreator != "" && renderVideos(props.data)}
      </div>
    </div>
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
        {videos.map((video, index) => (
          <div key={index}>{video["title"]}</div>
        ))}
      </div>
    );
  }

}
