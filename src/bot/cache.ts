import { Item } from "ytsr";

export const loop = new Map<number, boolean>();
export const admins = new Map<number, number[]>();
export const searches = new Map<number, (Item & { type: "video" })[]>();
