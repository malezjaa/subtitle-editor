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

export type FontType = {
  Name: string;
  Fontname: string;
  Fontsize: string;
  PrimaryColour: string;
  SecondaryColour: string;
  OutlineColour: string;
  BackColour: string;
  Bold: string;
  Italic: string;
  Underline: string;
  StrikeOut: string;
  ScaleX: string;
  ScaleY: string;
  Spacing: string;
  Angle: string;
  BorderStyle: string;
  Outline: string;
  Shadow: string;
  Alignment: string;
  MarginL: string;
  MarginR: string;
  MarginV: string;
  Encoding: string;
};
