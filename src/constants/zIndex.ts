export const Z_INDEX = {
  grain: 1,
  base: 10,
  header: 20,
  customCursor: 50,
  overlay: 100,
  menu: 120,
  modal: 150,
  transition: 200,
  toast: 9999,
} as const;

export type ZIndexKey = keyof typeof Z_INDEX;
