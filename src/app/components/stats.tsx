import { ReactElement } from "react";

export function StatsSummary(props: any): ReactElement {
  return render(props);
}

function render(props: any) {
  let videos: any[] = props.data;
  let uniqueVideos: any[] = [];
  let uniqueChannels: any[] = [];
  let filter = props.year;

  if(filter != undefined && filter != "ALL")
    videos = videos.filter((video) => video["time"].includes(filter))

  videos.forEach((video) => {
    if (!video["subtitles"]) return;
    let channelName = video["subtitles"][0]["name"];
    if (!uniqueChannels.includes(channelName)) uniqueChannels.push(channelName);
  });

  videos.forEach((video) => {
    if (!uniqueVideos.includes(video["title"]))
      uniqueVideos.push(video["title"]);
  });

  return (
    <div className="flex justify-center">
      <div className="stat">
        <div className="stat-figure text-secondary"></div>
        <div className="stat-title">Channels Watched</div>
        <div className="stat-value">{uniqueChannels.length}</div>
      </div>
      <div className="stat">
        <div className="stat-figure text-secondary"></div>
        <div className="stat-title">Total Videos (including rewatches)</div>
        <div className="stat-value">{videos.length}</div>
      </div>
      <div className="stat">
        <div className="stat-figure text-secondary"></div>
        <div className="stat-title">Unique Videos Watched</div>
        <div className="stat-value">{uniqueVideos.length}</div>
      </div>
    </div>
  );
}
