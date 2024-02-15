"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Leaderboard } from "./components/leaderboard";
import { CreatorVideoList } from "./components/creatorvideolist";
import './globals.css'

export default function Home() {
  const [data, setData] = useState([]);
  const [filter, setFilterYear] = useState("");
  let fileReader: FileReader;

  return (
    <div>
      <input
        type="file"
        onChange={(event) => {
          if (!event.target.files) return;

          fileReader = new FileReader();
          fileReader.onloadend = () => {
            if (!fileReader.result) return;
            let fileData = fileReader.result.toString();
            setData(JSON.parse(fileData));
          };

          fileReader.readAsText(event.target.files[0], "utf-8");
        }}
        id="watchHistoryUpload"
      ></input>
      <br />
      <select
        onChange={(event) => {
          setFilterYear(event.target.value);
        }}
      >
        <option value={"ALL"}>All</option>
        <option value={"2024"}>2024</option>
        <option value={"2023"}>2023</option>
        <option value={"2022"}>2022</option>
        <option value={"2021"}>2021</option>
        <option value={"2020"}>2020</option>
      </select>
      <br />
      <CreatorVideoList data={data} />
      <br />
      <Leaderboard data={data} year={filter} />
    </div>
  );
}
