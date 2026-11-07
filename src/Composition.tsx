import { CalculateMetadataFunction, Composition } from "remotion";
import { KomenReel } from "./KomenReel";
import { KomenReelProps } from "./types";
import sample from "./data/sample-comments.json";

const FPS = 30;
const INTRO_SECONDS = 1;
const OUTRO_SECONDS = 1.5;

// Video length follows the number of comments
const calculateMetadata: CalculateMetadataFunction<KomenReelProps> = ({
  props,
}) => {
  const seconds =
    INTRO_SECONDS +
    props.comments.length * props.secondsPerComment +
    OUTRO_SECONDS;
  return { durationInFrames: Math.max(1, Math.round(seconds * FPS)) };
};

export const MyComposition = () => {
  return (
    <Composition
      id="KomenReel"
      component={KomenReel}
      durationInFrames={300}
      fps={FPS}
      width={1080}
      height={1920}
      defaultProps={sample as KomenReelProps}
      calculateMetadata={calculateMetadata}
    />
  );
};
