"use client";
import React from "react";
import Image from "next/image";
import useSwr from "swr";
import { fetchImages } from "@/lib";

type ImageType = {
  name: string;
  url: string;
};

function Images() {
  const { data, isLoading, isValidating, mutate } = useSwr(
    "/api/images",
    fetchImages,
    { revalidateOnFocus: false }
  );

  if (isLoading)
    return (
      <p className="animate-pulse text-center pb-7 font-extralight">
        Loading <span className="text-violet-400">AI</span> Generated Images...
      </p>
    );

  return (
    <div>
      <button
        className="fixed bottom-10 right-10 bg-violet-400/90 text-white px-5 py-3 rounded-md hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-400 font-bold z-20"
        onClick={() => mutate(data)}
      >
        {!isLoading && isValidating ? "Refreshing..." : "Refresh Images"}
      </button>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 px-0 md:px-10">
        {data?.imagesUrls?.map((image: ImageType, index: number) => (
          <div
            key={image.name}
            className={`relative cursor-help ${
              index === 0 && "md:col-span-2 row-span-2"
            } hover:scale-[103%] transition-transform duration-200 ease-in-out`}
          >
            <div className="absolute flex justify-center items-center w-full h-full bg-white opacity-0 hover:opacity-80 transition-opacity duration-200 z-10">
              <p className="text-center font-light text-lg p-5">
                {image.name.split("_").shift()?.toString().split(".").shift()}
              </p>
            </div>
            <Image
              src={image.url}
              alt={image.name}
              width={800}
              height={800}
              className="w-full rounded-sm shadow-2xl drop-shadow-lg -z-10"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Images;