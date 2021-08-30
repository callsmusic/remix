import { Item } from "ytsr";

export const loop = new Map<number, number>();
export const searches = new Map<number, (Item & { type: "video" })[]>();
