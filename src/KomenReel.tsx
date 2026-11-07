import React from "react";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { CommentBubble } from "./CommentBubble";
import { KomenReelProps } from "./types";

/** Comments visible on screen at once; older ones scroll away */
const MAX_VISIBLE = 4;
const INTRO_SECONDS = 1;

export const KomenReel: React.FC<KomenReelProps> = ({
  title,
  subtitle,
  accentColor,
  secondsPerComment,
  comments,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const intro = Math.round(INTRO_SECONDS * fps);
  const perComment = Math.round(secondsPerComment * fps);

  const titleIn = spring({ frame, fps, config: { damping: 200 } });
  const shown = Math.max(
    0,
    Math.min(comments.length, Math.floor((frame - intro) / perComment) + 1),
  );

  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(160deg, #1B1B3A 0%, #3A1C71 55%, #D76D77 100%)",
        fontFamily: "Inter, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        padding: "220px 72px 260px",
      }}
    >
      <div
        style={{
          opacity: titleIn,
          transform: `translateY(${interpolate(titleIn, [0, 1], [-40, 0])}px)`,
          marginBottom: 72,
        }}
      >
        <div
          style={{
            fontSize: 110,
            fontWeight: 900,
            color: "white",
            lineHeight: 1,
          }}
        >
          {title}
        </div>
        {subtitle ? (
          <div
            style={{
              fontSize: 52,
              fontWeight: 700,
              color: accentColor,
              marginTop: 20,
            }}
          >
            {subtitle}
          </div>
        ) : null}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
        {comments.map((komen, i) => {
          // keep only the latest MAX_VISIBLE comments in the stack
          if (i >= shown || i < shown - MAX_VISIBLE) return null;
          return (
            <Sequence
              key={`${komen.username}-${i}`}
              from={intro + i * perComment}
              layout="none"
              name={`@${komen.username}`}
            >
              <CommentBubble
                komen={komen}
                accentColor={accentColor}
                active={i === shown - 1}
              />
            </Sequence>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
