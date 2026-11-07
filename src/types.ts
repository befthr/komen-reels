export type Komen = {
  /** Instagram username, without the leading @ */
  username: string;
  /** Comment text (emoji supported) */
  text: string;
  /** Optional like count shown under the comment */
  likes?: number;
};

export type KomenReelProps = {
  title: string;
  subtitle?: string;
  /** Hex color used for highlights */
  accentColor: string;
  /** How long each comment gets on screen before the next one appears */
  secondsPerComment: number;
  comments: Komen[];
};
