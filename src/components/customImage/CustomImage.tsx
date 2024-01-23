import React from "react";

export interface ICustomImageProps {
  src: string;
  alt?: string;
  caption: string | null;
  title: string | null;
  width?: string;
  height?: string;
}

const CustomImage = ({
  src,
  alt,
  caption,
  title,
  width,
  height,
}: ICustomImageProps) => {
  return (
    <div className="p-2 shadow">
      {title && (
        <span className="text-xs font-bold" id="image-title">
          {title}
        </span>
      )}
      <figure role="group" aria-labelledby="image-caption">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt || "image"}
          role="img"
          style={{
            width: width || "100%",
            maxWidth: "100%",
            height: height || "auto",
          }}
        />
        {caption && (
          <figcaption id="image-caption" className="text-xs text-gray mt-2">
            {caption}
          </figcaption>
        )}
      </figure>
    </div>
  );
};

export default CustomImage;
