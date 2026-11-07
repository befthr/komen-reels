import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Komen } from "./types";

const AVATAR_COLORS = [
  "#E1306C",
  "#833AB4",
  "#F77737",
  "#405DE6",
  "#2BB673",
  "#C13584",
];

const colorFor = (username: string) => {
  let hash = 0;
  for (const ch of username) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
};

export const CommentBubble: React.FC<{
  komen: Komen;
  accentColor: string;
  /** true for the newest comment, which gets highlighted */
  active: boolean;
}> = ({ komen, accentColor, active }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({ frame, fps, config: { damping: 14, stiffness: 120 } });
  const translateY = interpolate(enter, [0, 1], [80, 0]);
  const scale = interpolate(enter, [0, 1], [0.9, 1]);

  // Like counter ticks up after the bubble lands
  const likes = Math.round(
    interpolate(frame, [fps * 0.4, fps * 1.2], [0, komen.likes ?? 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );

  return (
    <div
      style={{
        display: "flex",
        gap: 28,
        alignItems: "flex-start",
        padding: "32px 36px",
        borderRadius: 36,
        background: "rgba(255,255,255,0.96)",
        boxShadow: active
          ? `0 0 0 6px ${accentColor}, 0 24px 60px rgba(0,0,0,0.35)`
          : "0 16px 40px rgba(0,0,0,0.25)",
        opacity: enter,
        transform: `translateY(${translateY}px) scale(${scale})`,
      }}
    >
      <div
        style={{
          flexShrink: 0,
          width: 96,
          height: 96,
          borderRadius: "50%",
          background: colorFor(komen.username),
          color: "white",
          fontSize: 48,
          fontWeight: 800,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {komen.username.charAt(0).toUpperCase()}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          minWidth: 0,
        }}
      >
        <div style={{ fontSize: 38, fontWeight: 800, color: "#111" }}>
          @{komen.username}
        </div>
        <div style={{ fontSize: 46, lineHeight: 1.25, color: "#222" }}>
          {komen.text}
        </div>
        {komen.likes !== undefined ? (
          <div style={{ fontSize: 32, color: "#777", marginTop: 6 }}>
            ♥ {likes} suka
          </div>
        ) : null}
      </div>
    </div>
  );
};
