import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

const BookmarksContext = createContext();

export const useBookmarks = () => {
    return useContext(BookmarksContext);
}


let  BASEURL = "http://114.132.41.210:3000"

/**
 * 
 * @description 后端获取标签
 */
export const getTags = async () => {
    const response = await axios.get(`${BASEURL}/getTags`);
    const tags = []

    response.data.data.forEach((tag, index) => {
        tags.push({
            id: index,
            name: tag
        })
    })

    return tags;
}

// 获取点击次数最多的书签
async function getMostHitsBookmarks() {
    const response = await axios.get(`${BASEURL}/mostHits`);
    const bookmarks = []

    // console.log(response.data.data)

    return response.data.data;
}

// 获取标签书签
const getTaglistUrl = `${BASEURL}/tagList`
async function getBookmarksTaglist(tag){
    console.log(tag)
    const response = await axios.post(getTaglistUrl, {
        tag: tag
    });
    // console.log(response.data.data)
    return response.data.data;
}

/**
 * 
 * @description 后端获取书签
 */
export const getBookmarks = async (tag,option) => {
    // console.log(tag)
    switch (tag) {
        case 'mostHits':
            return getMostHitsBookmarks()
        case '##!Search':
            const {keyword} = option
            return searchBookmarks(keyword)
        default:
            // console.log('tag finding')
            return getBookmarksTaglist(tag)
    }
    
}

// 创建书签
const createUrl = `${BASEURL}/create`
export const createBookmark = async (url, tags) => {
    const response = await axios.post(createUrl, {
        url: url,
        tags: tags
    });
    return response.data;
}


// 增加点击次数
const hits = `${BASEURL}/hits`
export const addHits = async (id) => {
    const response = await axios.post(hits, {
        id: id
    });
    return response.data;
}


// 搜索书签
const SearchUrl = `${BASEURL}/search`
export const searchBookmarks = async (keyword) => {
    const response = await axios.post(SearchUrl, {
        keyword: keyword
    });
    return response.data.data;
}

export const BookmarksProvider = ({ children }) => {
    const [bookmarks, setBookmarks] = useState([]);
    const [tags, setTags] = useState([]);
    const [selectTag, setSelectTag] = useState('mostHits');
    

    async function initTags() {
        const tags = await getTags();
        setTags(tags);
    }

    function initSelectTag(tag) {
        setSelectTag(tag);
    }

    async function initBookmarks(option) {
        const bookmarks = await getBookmarks(selectTag,option);
        // console.log(bookmarks)
        setBookmarks([...bookmarks]);
    }

    useEffect(() => {
        initTags()

        initBookmarks()
    }, []);

    return (
        <BookmarksContext.Provider value={{
            bookmarks,
            tags, 
            initTags,
            selectTag,
            initSelectTag,
            initBookmarks,
            setBookmarks
        }}>
            {children}
        </BookmarksContext.Provider>
    );
}