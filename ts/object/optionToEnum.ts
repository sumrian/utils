// options to enum

type Option = {
  label: string;
  value: any;
};

export const optionsToEnum = (options?: Option[]) => {
  if (!options) {
    return {};
  }
  return options.reduce(
    (acc, cur) => {
      acc[cur.value] = cur.label;
      return acc;
    },
    {} as Record<string, string>,
  );
};

export default optionsToEnum;
