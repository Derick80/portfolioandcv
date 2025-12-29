"use client";

import { useState } from "react";

interface Image {
    url: string;
    alt?: string | null;
}

export function ImageCarousel({ images }: { images: Image[] }) {
    const [index, setIndex] = useState(0);

    if (images.length === 0) return null;

    const prev = () =>
        setIndex((i) => (i - 1 + images.length) % images.length);

    const next = () =>
        setIndex((i) => (i + 1) % images.length);

    return (
        <div className="relative w-full overflow-hidden rounded-lg">
            <img
                src={images[index].url}
                alt={images[index].alt ?? ""}
                className="w-full h-64 object-cover"
            />

            {images.length > 1 && (
                <>
                    <button
                        onClick={prev}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-2 py-1 rounded"
                    >
                        ‹
                    </button>

                    <button
                        onClick={next}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-2 py-1 rounded"
                    >
                        ›
                    </button>
                </>
            )}
        </div>
    );
}
