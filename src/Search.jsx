import { useState } from "react";
import { useBookmarks } from "./useBookmarks";


export default function Search() {
    const { bookmarks, selectTag, initTags,initSelectTag,initBookmarks } = useBookmarks();
    const [search, setSearch] = useState('');
    const updataSearch = (e) =>{
        setSearch(e.target.value)
        if(e.keyup){
            setTimeout(() => {
                console.log('keyup')
            }, 500);
        }
        if(search.length > 0){
            initSelectTag('##!Search')
            initBookmarks({
                keyword: search
            })
        }else if(search.length === ""){
            console.log('search is null')
            initSelectTag('mostHits')
            initBookmarks()

        }
    }




    return (
        <>
          
            <div>
              <input 
                className="
                    text-black
                    px-2
                    my-2
                    w-full
                    rounded-md
                    border
                "
              type="text"
              value={search}
              placeholder="filter..."
              onChange={updataSearch}
              />
            </div>
            
        </>

    );
}