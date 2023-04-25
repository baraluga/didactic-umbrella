export type Tweet = Readonly<{
  id: string;
  message: string;
}>;

export type Tweets = Record<string, Tweet>;
