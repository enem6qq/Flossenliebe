"use client";

import dynamic from "next/dynamic";

export const AquariumScene = dynamic(() => import("./AquariumScene"), { ssr: false });
export const ConfiguratorScene = dynamic(() => import("./ConfiguratorScene"), { ssr: false });
export const ShowroomScene = dynamic(() => import("./ShowroomScene"), { ssr: false });
