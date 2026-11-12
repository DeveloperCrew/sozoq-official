/*
  CAT SPRITE SHEET – Figma "cat animation" (node 4348:7208, 860 x 995)
  4 columns x 6 rows, one pose per cell. Measured from the Figma frame.
  If a frame looks cropped/shifted, open the home page with  ?catdebug=1
  to see the cell grid over the sheet and tweak the numbers below.
*/
export const CAT_SHEET = {
  src: "/assets/images/cat-sprite.png",
  width: 860, // natural size of the exported sheet (any @2x export works too)
  height: 995,
  cellW: 160,
  cellH: 164,
  colX0: 107, // left edge of column 0
  rowY0: [14, 184, 346, 506, 673, 833], // top edge of each row
  /* distance (sheet px) from the cell bottom to the bottom of the cat's
     shadow, per row – used so the shadow sits exactly on the platform line */
  rowFoot: [38, 43, 38, 40, 42, 47],
  pad: 28,
  gap: 8,
} as const;

export type CatClip = {
  row: number; // 0-5
  frames: readonly number[]; // columns 0-3, in play order
  fps: number;
};

/* every move on the sheet */
export const CAT_CLIPS = {
  walkR: { row: 0, frames: [0, 1, 2, 3], fps: 6 }, // walk right
  walkL: { row: 1, frames: [0, 1, 2, 3], fps: 6 }, // walk left
  sitDown: { row: 2, frames: [0, 1], fps: 2 }, // turn front + sit
  sit: { row: 2, frames: [1, 2, 3, 2], fps: 1.5 }, // sit, blink, tongue
  groom: { row: 3, frames: [0, 1, 2, 3], fps: 5 }, // lick paw
  lieDown: { row: 4, frames: [0, 1, 2, 3], fps: 2.5 }, // crouch -> lie flat
  getUp: { row: 4, frames: [3, 2, 1, 0], fps: 5 },
  settle: { row: 5, frames: [2, 3], fps: 3 }, // lying, head up
  sleep: { row: 5, frames: [0, 1], fps: 1.1 }, // curled up, breathing
} as const satisfies Record<string, CatClip>;

export type ClipName = keyof typeof CAT_CLIPS;

export type CatStep =
  | { do: "walk"; dir: 1 | -1; to: number } // to = fraction (0-1) of free track
  | { do: "play"; clip: ClipName; loops?: number; seconds?: number };

/* the loop: wander right, sit, wash, nap, wake, wander back */
export const CAT_SCRIPT: CatStep[] = [
  { do: "walk", dir: 1, to: 0.42 },
  { do: "play", clip: "sitDown", loops: 1 },
  { do: "play", clip: "sit", seconds: 2.6 },
  { do: "play", clip: "groom", loops: 4 },
  { do: "play", clip: "sit", seconds: 1.2 },
  { do: "walk", dir: 1, to: 1 },
  { do: "play", clip: "lieDown", loops: 1 },
  { do: "play", clip: "settle", seconds: 1.4 },
  { do: "play", clip: "sleep", seconds: 6 },
  { do: "play", clip: "settle", seconds: 1.2 },
  { do: "play", clip: "getUp", loops: 1 },
  { do: "play", clip: "sit", seconds: 1.4 },
  { do: "walk", dir: -1, to: 0.2 },
  { do: "play", clip: "sit", seconds: 2 },
  { do: "play", clip: "groom", loops: 2 },
  { do: "walk", dir: -1, to: 0 },
];

/* sheet px the cat travels per 4-frame walk cycle (keeps feet from sliding) */
export const CAT_STRIDE = 46;
