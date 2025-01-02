import {
  FetchAPIProps,
  FetchNestedResponseProps,
  ReproduceDataProps,
} from "@/types";

export const FetchAPI = async ({ resource, query }: FetchAPIProps) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ANIME_BASE_URL}/${resource}?${query ?? ""}`
    );
    const getResponse = await response.json();
    if (!response.ok) {
      throw new Error(`API Error: ${getResponse.message || "Unknown error"}`);
    }

    if (!getResponse || !getResponse.data) {
      return { data: [] };
    }
    return getResponse;
  } catch {
    console.error("Failed to fetch data");
    return { data: [] };
  }
};

export const FetchNestedResponse = async ({
  resource,
  query,
  objectProps,
}: FetchNestedResponseProps) => {
  const response = await FetchAPI({ resource, query });
  return response.data.flatMap(
    (data: { [key: string]: any }) => data[objectProps]
  );
};

export const ReproduceData = ({ data, gapData }: ReproduceDataProps) => {
  const firstData = ~~(Math.random() * (data.length - gapData) + 1);
  const lastData = firstData + gapData;

  const response = {
    data: data.slice(firstData, lastData),
  };

  return response;
};
