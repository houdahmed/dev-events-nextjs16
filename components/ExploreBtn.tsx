"use client";

import Image from "next/image";
import posthog from "posthog-js";

const ExploreBtn = () => {
  const handleClick = () => {
    posthog.capture("explore_events_clicked");
  };

  return (
    <div className="flex justify-center">
      <a
        href="#events"
        id="explore-btn"
        className="mt-7 mx-auto inline-flex items-center gap-2"
        onClick={handleClick}
      >
        Explore Events
        <Image
          src="/icons/arrow-down.svg"
          alt="arrow-down"
          width={24}
          height={24}
        />
      </a>
    </div>
  );
};

export default ExploreBtn;
