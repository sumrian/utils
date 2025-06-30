// react节点中提取文本

import React, {isValidElement} from "react";

export const getTextFromReactNode = (node: React.ReactNode): string => {
    console.log('node', node);
    if (typeof node === 'string' || typeof node === 'number') {
        return String(node);
    }
    if (Array.isArray(node)) {
        return node.map(getTextFromReactNode).join('');
    }
    if (isValidElement(node)) {
        const { children } = node.props;
        return getTextFromReactNode(children);
    }
    return '';
};