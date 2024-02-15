import { ReactElement } from "react";

export function CreatorSelect(props: any): ReactElement {
  return (
    <div>
      <select   className="select w-full max-w-xs" onChange={(event) => props.onChange(event.target.value)}>
        <option disabled selected>Choose creator</option>
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

    return creatorList.sort((creatorA, creatorB) =>  {
      let nameA = creatorA.toLowerCase(), nameB = creatorB.toLowerCase()
      if (nameA < nameB) 
        return -1;
      if (nameA > nameB)
          return 1;
      return 0;
    }).map((creator) => (
      <option key={creator} value={creator}>
        {creator}
      </option>
    ));
  }
}
