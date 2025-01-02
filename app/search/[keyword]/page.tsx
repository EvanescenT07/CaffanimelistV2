import { FetchAPI } from "@/libs/api";
import TitleSection from "@/components/homepage/Header";
import AnimeList from "@/components/homepage/TopAnime";

const Page = async ({ params }: { params: { keyword: string } }) => {
  const { keyword } = params;
  const decodeKeyword = decodeURI(keyword);
  const searchResponse = await FetchAPI({
    resource: "anime",
    query: `q=${decodeKeyword}`,
  });

  return (
    <section className="mt-4">
      <TitleSection title={`Search result for ${decodeKeyword}`} />
      <AnimeList api={searchResponse} />
    </section>
  );
};

export default Page;
