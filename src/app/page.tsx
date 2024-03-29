"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Leaderboard } from "./components/leaderboard";
import { CreatorVideoList } from "./components/creatorvideolist";
import "./globals.css";
import { StatsSummary } from "./components/stats";

export default function Home() {
  const [data, setData] = useState([]);
  const [filter, setFilterYear] = useState("");
  const [filteredData, setFilteredData] = useState<any[]>([])
  let fileReader: FileReader;

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">UnpackedTube</h1>
          <div className="py-6"></div>
          <input
            type="file"
            className="file-input"
            onChange={loadHistory}
            id="watchHistoryUpload"
          ></input>
          <br />
          <div hidden={data.length <= 0} className="py-5 ">
            <h3 className="text-2xl font-bold">Choose year</h3>
            <select className="select max-w-xs"
              onChange={(event) => {
                setFilterYear(event.target.value);
                let newFilteredData = filterData(event.target.value);
                setFilteredData(newFilteredData)
              }}
            >
              <option value={"ALL"}>All Time</option>
              <option value={"2024"}>2024</option>
              <option value={"2023"}>2023</option>
              <option value={"2022"}>2022</option>
              <option value={"2021"}>2021</option>
              <option value={"2020"}>2020</option>
            </select>
            <br />
            <StatsSummary data={filteredData} year={filter}/>
            <Leaderboard data={filteredData} year={filter} />
            <br />
            <CreatorVideoList data={data} />
          </div>
        </div>
      </div>
    </div>
  );

  function filterData(year: any): any[] {
    return (year == undefined || year == "ALL") ? data : data.filter((video: any) => video["time"].includes(year)) 
  }

  function loadHistory(fileInputEvent: any) {
    if (!fileInputEvent.target.files) return;

    fileReader = new FileReader();
    fileReader.onloadend = () => {
      if (!fileReader.result) return;
      let fileData = fileReader.result.toString();
      let videosJSON = JSON.parse(fileData);

      setData(videosJSON)
      setFilteredData(videosJSON)
    };

    fileReader.readAsText(fileInputEvent.target.files[0], "utf-8");
  }
}
