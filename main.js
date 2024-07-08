let news = [];
const getLatestNews = async () => {
    const url = new URL(`https://eve-the-news-times.netlify.app/top-headlines`);
    url.searchParams.set('country', 'kr');

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        news = data.articles;
        console.log("Fetched news:", news);
    } catch (error) {
        console.error('Error fetching news:', error.message);
    }
};

getLatestNews();
