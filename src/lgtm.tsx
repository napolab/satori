import type { FC } from "react";

type Props = {
  src: string;
  color?: string;
  shadow?: string;
  width: number;
  height: number;
};

export const LGTM: FC<Props> = ({ src, color = "white", shadow = "#ccc", width, height }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        width,
        height,
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <img src={src} alt="background thumbnail" style={{ objectFit: "cover" }} />
      </div>

      <p
        style={{
          color,
          textTransform: "uppercase",
          fontSize: 48,
          fontFamily: "'Fredoka One', cursive",
          letterSpacing: 10,
          textShadow: `${shadow} 1px 0 10px`,
        }}
      >
        LGTM
      </p>
    </div>
  );
};
