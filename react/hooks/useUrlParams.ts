import useUrlState from '@ahooksjs/use-url-state';

export const useUrlParams = (init: any) => {
  const [state, setState] = useUrlState(init, {
    parseOptions: {
      arrayFormat: 'bracket',
    },
    stringifyOptions: {
      arrayFormat: 'bracket',
      skipNull: true,
      skipEmptyString: true,
    },
  });
  const setUrlParams = (obj: any) => {
    let result = { ...obj };
    for (const key in obj) {
      if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
        result = { ...result, [key]: JSON.stringify(obj[key]) };
      }
    }
    setState(result);
  };

  const urlParams = (function () {
    let result = { ...state };
    for (const key in state) {
      if (state[key] && state[key].includes('{') && state[key].includes('}')) {
        result = { ...result, [key]: JSON.parse(state[key]) };
      }
      if (state[key] === 'true') {
        result = { ...result, [key]: true };
      }
      if (state[key] === 'false') {
        result = { ...result, [key]: false };
      }
    }
    return result;
  })();

  /** 清除原有url参数并设置当前参数 */
  const setCleanUrlParams = (obj: any) => {
    const keys = Object.keys(urlParams);
    const currentObj: any = {};
    keys.forEach((key) => {
      currentObj[key] = undefined;
    });

    const params = { ...currentObj, ...obj };
    setUrlParams(params);
  };

  return [urlParams, setUrlParams, setCleanUrlParams] as [
    Record<string, any>,
    (obj: any) => void,
    (obj: any) => void,
  ];
};
