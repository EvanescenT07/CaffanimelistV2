export interface PostRequestBody {
  anime_mal_id: string;
  user_email: string;
  username: string;
  anime_image: string;
  anime_title: string;
}

export interface DeleteRequestBody {
  anime_mal_id: string;
  user_email: string;
}

export interface CommentRequestBody {
  anime_mal_id: string;
  user_email: string;
  comment: string;
  username: string;
  anime_title: string;
}

export interface FetchAPIProps {
  resource: string;
  query: string;
}

export interface FetchNestedResponseProps {
  resource: string;
  query: string;
  objectProps: string;
}

export interface ReproduceDataProps {
  data: any[];
  gapData: number;
}

export interface HeaderPageProps {
  title: string;
  linkHref: string;
  linkTitle: string;
}

export interface APIProps {
  api: {
    data: Array<{
      mal_id: number;

      images: {
        webp: {
          image_url: string;
        };
      };

      title: string;
    }>;
  };
}

export interface ParamsProps {
  params: {
    id: string;
  };
}

export interface CollectionProps {
  anime_mal_id: string;
  user_email: string;
  anime_image: string;
  anime_title: string;
  isInCollection: boolean;
}

export interface HandleCollectionEvent
  extends React.MouseEvent<HTMLButtonElement> {}

export interface InputCommentProps {
  anime_mal_id: string;
  user_email: string;
  username: string;
  anime_title: string;
}
