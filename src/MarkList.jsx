import { useEffect, useMemo } from "react";
import { useBookmarks , addHits } from "./useBookmarks";

export default function MarkList() {
    const { bookmarks, selectTag, initTags } = useBookmarks();
    useEffect(() => {
        initTags()
        // initSelectTag('mostHits')
        // initBookmarks()
        // console.log('bookmarks init!')


    }, [selectTag]);

    const handleClick =async (url,id) => {
        await addHits(id)
        window.open(url)

    }

    const list = bookmarks.map((item) => {
        // console.log(item)
        return (
            <div key={item.id} className=" justify-between items-center border border-gray-200/30 p-2 my-2 rounded-md overflow-clip text-nowrap  
            h-32 w-full relative text-black  mt-4 grid grid-cols-8 gap-x-2  select-none cursor-pointer hover:bg-gray-200/30"
                onClick={() => handleClick(item.url,item.id)}
            >
            
            
                <div className="  h-full col-span-5 truncate  ">
                       <div className=" h-[20%] truncate text-xl mb-2">
                        {item.title}
                       </div>
                       <div  className=" h-[55%] text-wrap truncate text-sm text-gray-500">
                        {item.description}
                       </div>
                       <div className=" h-[20%] truncate">
                        {item.url}
                       </div>
                </div>
                <div className="  h-full col-span-3 overflow-hidden rounded-md ">
                    {item.image ? <img src={item.image} alt="" className="h-full w-full object-cover" /> : ''}  
                </div>
            </div>
        )
    })

    const titleConvert = {
        mostHits: "Most Hits!",
        latest: "Latest",
    }

    const selectTagTitle = useMemo(() => {
        console.log(selectTag)
        if (titleConvert[selectTag] === undefined) {
            return selectTag
        } else {
            return titleConvert[selectTag]

        }

    }, [selectTag])


    return (
        <>
            <div className="mt-2">
                <h2 className="
                text-xl text-red-400 font-bold  bg-blue-200  px-2 py-1 rounded-md select-none
                
                ">

                    {selectTagTitle}</h2>
                {list}

            </div>
        </>

    )
}