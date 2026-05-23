import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";

export const alt = "Troy Karnes: Book Coach and Ghostwriter";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const photoBuffer = fs.readFileSync(
    path.join(process.cwd(), "public/images/troy-mtn.jpg")
  );
  const photoDataUrl = `data:image/jpeg;base64,${photoBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#fefdf8",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "72px 80px",
            flex: 1,
          }}
        >
          <div
            style={{
              color: "#dc602e",
              fontSize: 20,
              letterSpacing: "4px",
              fontWeight: 600,
              textTransform: "uppercase",
              marginBottom: 32,
            }}
          >
            Book Coaching &amp; Ghostwriting
          </div>
          <div
            style={{
              color: "#000000",
              fontSize: 88,
              fontWeight: 700,
              lineHeight: 1.05,
              marginBottom: 32,
              display: "flex",
            }}
          >
            Troy Karnes
          </div>
          <div
            style={{
              color: "#69995d",
              fontSize: 30,
              lineHeight: 1.35,
              display: "flex",
            }}
          >
            Helping leaders write the books they&apos;ve been carrying.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            width: 504,
            height: "100%",
          }}
        >
          <img
            src={photoDataUrl}
            width={504}
            height={630}
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
            }}
          />
        </div>
      </div>
    ),
    size
  );
}
