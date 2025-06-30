// 定义sleep函数
export const sleep = (time: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, time));
};

