import NewsList from "../components/List"; 
import { NEWS } from "../data/dummy_data";

function WorldNewsScreen() {
  const category = "World";
  const displayedNews = NEWS.filter((newsItem) => {
    return newsItem.category === category;
  });

  return <NewsList items={displayedNews} />; 
}

export default WorldNewsScreen;

