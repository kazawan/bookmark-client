import { useState } from "react";
import { useBookmarks ,createBookmark} from "./src/useBookmarks";


export default function AddMark() {

    const [input, setInput] = useState('')
    const [tags, setTags] = useState('#默认')
    const { bookmarks, initBookmarks ,initTags} = useBookmarks();
    function handleInput(e) {
        setInput(e.target.value)
    }   

    function handleTag(e){
        setTags(e.target.value)
    }

    async function handleCreate(){
        
        const res = await createBookmark(input, tags)
        if(res){
            if(res.code === 200){
                setInput('')
                setTags('#默认')
                initTags()
                initBookmarks()
            }else{
                console.log(res)
            }
        }
    }

    return (
        <div className=" my-2 w-full">
            <input type="text" 
                className=" w-full border-2 border-gray-300 px-2 py-1 rounded-md text-sm h-fit  text-black"
                placeholder="Add a bookmark"
                value={input}
                onChange={handleInput}
                onKeyUp={(e) => {
                    if(e.key === 'Enter'){
                        handleCreate()
                }}}
            />
             <input type="text" 
                className=" w-full border-2 px-2 py-1 rounded-md text-sm h-fit  text-black my-2  border-gray-300"
                placeholder="set a tag! default is 'general'"
                value={tags}
                onChange={handleTag}
                onKeyUp={(e) => {
                    if(e.key === 'Enter'){
                        handleCreate()
                }}}
            />
        </div>
    );

}