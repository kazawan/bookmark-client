import { useEffect } from "react";
import { useBookmarks ,getBookmarks} from "./useBookmarks";


export default function TagBar() {
    const { bookmarks,setBookmarks, tags, initTags,selectTag,initBookmarks,initSelectTag } = useBookmarks();
    useEffect(() => {
        initTags()
        
    }, []);

    const handleClick = async(tag) => {
        initSelectTag(tag)
        const bookmarks = await getBookmarks(tag);
        setBookmarks([...bookmarks])
        // setBookmarks([...bookmarks])
       

    }

    const tagsList = tags.map((tag) => {
        return (
            <span
                className=" buttonspan mainColor"
                key={tag.id}
                onClick={() => handleClick(tag.name)}
            >
                {tag.name}
            </span>
        );
    })
    return (
        <>
            <div
                className=" flex flex-wrap gap-2  select-none cursor-pointer"
            >
                <span className="  buttonspan warningColor "
                    onClick={() => handleClick('mostHits')}
                >
                    常用
                </span>
                {tagsList}

            </div>

        </>

    );
}