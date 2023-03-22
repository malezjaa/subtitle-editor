export type Subtitle = {
  Start: string;
  End: string;
  Text: Text;
  Style: string;
  Name: string;
  index: number;
};

export type Text = {
  combined: string;
  raw: string;
  parsed: any[];
};
