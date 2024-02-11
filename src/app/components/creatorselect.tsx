import { ReactElement } from "react";

export function CreatorSelect(props: any): ReactElement {
  return (
    <div>
      <select onChange={(event) => props.onChange(event.target.value)}>
        {render(props.data)}
      </select>
    </div>
  );

  function render(data: any[]) {
    let creatorList: any[] = [];
    data.forEach((video) => {
      if (video["subtitles"] == undefined) return;
      if (!creatorList.includes(video["subtitles"][0]["name"]))
        creatorList.push(video["subtitles"][0]["name"]);
    });

    return creatorList.map((creator) => (
      <option key={creator} value={creator}>
        {creator}
      </option>
    ));
  }
}
