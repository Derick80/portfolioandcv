"use client";
import { lofSet } from "@/local_resources/swu";
import Image from "next/image";
import { useState } from "react";

// Create a hover zoom component
function HoverZoomImage({
  src,
  alt,
  width,
  height,
  className,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}) {
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  return (
    <div className="relative">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onMouseMove={handleMouseMove}
      />

      {/* Zoomed image that follows cursor */}
      {isHovering && (
        <div
          className="fixed z-50 pointer-events-none border-2 border-white shadow-lg rounded-lg overflow-hidden"
          style={{
            left: mousePosition.x + 20, // Offset from cursor
            top: mousePosition.y - 150, // Offset from cursor
            width: "300px", // Larger size
            height: "450px",
          }}
        >
          <Image src={src} alt={alt} fill className="object-cover" />
        </div>
      )}
    </div>
  );
}

export default function Page() {
  const lof = lofSet.data;
  console.log(lof.length);
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">SWU Page</h1>
      <p>Welcome to the SWU page!</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {lofGenerator(lof).map((card) => (
          <div
            key={card.Number}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition-shadow"
          >
            <HoverZoomImage
              src={card.FrontArt}
              alt={card.FrontText}
              width={200}
              height={300}
              className=""
            />
            <p className="text-gray-600">Card ID: {card.Number}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const lofGenerator = (lof: typeof lofSet.data) => {
  return lof.map((card) => ({
    ...card,
  }));
};
