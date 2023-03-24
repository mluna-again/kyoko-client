export const SHIRT_SIZES = [
  {
    label: "XS",
    value: 1,
  },
  {
    label: "S",
    value: 3,
  },
  {
    label: "M",
    value: 5,
  },
  {
    label: "L",
    value: 7,
  },
  {
    label: "XL",
    value: 9,
  },
  {
    label: "XLL",
    value: 11,
  },
];

export const getShirtMedian = (selections: any[]) => {
  const usersThatSelected = selections.filter((user) =>
    Boolean(user.selection)
  ).length;
  const sum = selections.reduce((acc, user) => acc + (user.selection || 0), 0);
  const average = Math.round(sum / usersThatSelected);

  if (average < 3) return SHIRT_SIZES[0].label;
  if (average < 5) return SHIRT_SIZES[1].label;
  if (average < 7) return SHIRT_SIZES[2].label;
  if (average < 9) return SHIRT_SIZES[3].label;
  if (average < 11) return SHIRT_SIZES[4].label;
  return SHIRT_SIZES[5].label;
};
