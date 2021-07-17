import clsx from "clsx";

import { Image } from "..";
import { getSiteMetaData } from "@utils/helpers";

export function Bio({ className }) {
  const { author, social } = getSiteMetaData();

  return (
    <div className={clsx(`flex items-center`, className)}>
      <Image
        className="flex-shrink-0 mb-0 mr-3 rounded-full w-14 h-14 select-none cursor-pointer hvr-float-shadow"
        src={require("../../../content/assets/profile.png")}
        webpSrc={require("../../../content/assets/profile.png?webp")}
        previewSrc={require("../../../content/assets/profile.png?lqip")}
        alt="Profile"
      />

      <p className="text-base leading-7 font-semibold">
        不正经的人机交互工程师
        {/* Written by <b className="font-semibold">{author.name}</b>{" "}
        {author.summary}{" "}
        <a href={`https://twitter.com/${social.twitter}`}>
          Follow him on twitter
        </a> */}
      </p>
    </div>
  );
}
