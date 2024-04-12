import { useEffect } from "react";
import { useBookmarks, getTags } from "./useBookmarks";
import TagBar from "./TagBar";
import MarkList from "./MarkList";
import AddMark from "../AddMark";
import Search from "./Search";


export default function App() {


  return (
    <>
      <div>
        <div>
          <h1 className="text-3xl  px-0    underline-offset-2">Bookmarks</h1>
        </div>
        <Search />
        <TagBar />
        <MarkList />
      </div>
    </>

  );
}

