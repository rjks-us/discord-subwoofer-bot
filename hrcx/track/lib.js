const yts = require( 'yt-search' )

/**
 * 
 * @description Returns the best result for your search query from youtube
 * @param {String} query 
 * @returns Video element
 */
const search = async (query) => {
    return await new Promise(async (resolve, rejects) => {
        //catch youtube summon from search, prevent invalid searches, do not change
        const result = await yts(query.replace('https://youtube.com/watch?v=', ''));
        if(result.videos === null || result.videos.length == 0) return rejects('Invalid query search');
        resolve(result.videos[0]);
    });
}

/**
 * 
 * @description Returns the amount of aviable elements returned by the youtube api
 * @param {String} query 
 * @param {Int} amount
 * @returns Array of video elements
 */
const searchArray = async (query, amount) => {
    return await new Promise(async (resolve, rejects) => {
        const result = await yts(query);
        if(result.videos === null || result.videos.length == 0) return rejects('Invalid query search');
        if(result.videos.length >= amount) return resolve(result.videos.slice(0, amount));
        resolve(result.videos.slice(0, result.videos.length));
    });
}

module.exports = {
    search: search,
    searchArray: searchArray
}