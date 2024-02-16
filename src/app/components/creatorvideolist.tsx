"use client";
import { ReactElement, useEffect, useState } from "react";
import { CreatorSelect } from "./creatorselect";

export function CreatorVideoList(props: any): ReactElement {
  const [selectedCreator, setSelectedCreator] = useState("");
  const [currentPage, setCurrentPage] = useState(-1);
  const [pages, setPages] = useState<any[]>([]);
  const [pageElements, setPageElements] = useState<JSX.Element[]>([]);

  useEffect(() => {
    loadVideos(props);
  }, [selectedCreator]);

  useEffect(() => {
    let blank = [];
    if (currentPage != -1 && pages && pages.length > 0) {
      for (var i = 0; i < pages[currentPage].length; i++)
        blank.push(<div>Loading..</div>);

      setPageElements(blank);

      pages[currentPage].forEach((video: any, index: number) => {
        fetch(`https://noembed.com/embed?url=${video.titleUrl}`).then(
          (response) => {
            response.json().then((json) => {
              console.log("rewatch: " + video.rewatch);
              let embed = (
                <div key={index} className="py-6">
                  <div className="card image-full w-256 bg-base-100 shadow-xl">
                    <figure>
                      <img src={`${json.thumbnail_url}`}></img>
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">
                        <a href={video.titleUrl} target="_blank">
                          {json.title}
                        </a>
                      </h2>
                      {video.rewatch && (
                        <div className="badge badge-primary">
                          Watch #{video.rewatch_count + 1}
                        </div>
                      )}
                      Watched at {new Date(video.time).toLocaleString("en-UK")}
                      <p></p>
                    </div>
                  </div>
                </div>
              );

              setPageElements((pageElements) => {
                let newPageElements = pageElements.concat(embed);
                newPageElements.pop();
                newPageElements.splice(index, 1, embed);
                return newPageElements;
              });
            });
          }
        );
      });
    }
  }, [currentPage, pages]);

  return (
    <div>
      <div className="collapse collapse-arrow bg-base-200">
        <input type="checkbox"></input>
        <div className="collapse-title title-xl font-medium">
          Creator Video Search
        </div>
        <div className="collapse-content">
          <CreatorSelect
            data={props.data}
            onChange={(selectedCreator: any) => {
              setSelectedCreator(selectedCreator);
              setCurrentPage(0);
            }}
          />
          <br />
          {selectedCreator != "" && pageElements}
          <br />
          {selectedCreator != "" && (
            <div className="join">
              <button
                className="join-item btn"
                onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                disabled={currentPage == 0}
              >
                «
              </button>
              <button className="join-item btn">Page {currentPage + 1} of {pages.length}</button>
              <button
                className="join-item btn"
                onClick={() =>
                  setCurrentPage(Math.min(currentPage + 1, pages.length - 1))
                }
                disabled={currentPage == pages.length - 1}
              >
                »
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  function loadVideos(props: any) {
    let videos: any[] = props.data;
    if (!videos) return;

    let uniqueVideos: any[] = [];

    videos = videos.filter(
      (video: any) =>
        video["subtitles"] && video["subtitles"][0]["name"] == selectedCreator
    );

    let rewatchMap = new Map();

    videos.sort((video1: any, video2: any) => {
      return (
        new Date(video1["time"]).getTime() - new Date(video2["time"]).getTime()
      );
    });

    for(let video of videos) {
      if (!uniqueVideos.includes(video["title"])) {
        uniqueVideos.push(video["title"]);
      } else {
        rewatchMap.set(
          video.titleUrl,
          rewatchMap.has(video.titleUrl) ? rewatchMap.get(video.titleUrl) + 1 : 1
        );
        video.rewatch = true;
        video.rewatch_count = rewatchMap.get(video.titleUrl);
        console.log(video)
      }
    }


    console.log(rewatchMap);

    videos.sort((video1: any, video2: any) => {
      return (
        new Date(video2["time"]).getTime() - new Date(video1["time"]).getTime()
      );
    });

    let pages: any[] = [];
    for (var i = 0; i < videos.length; i += 10) {
      pages.push(videos.slice(i, i + 10));
    }
    setPages(pages);
  }
}
