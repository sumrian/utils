const targetList = ['_blank', '_self', '_parent', '_top'] as const;
type TargetType = typeof targetList[number];

export function openExternalUrl(url: string, target?: TargetType) {
    const targetUrl = (!url.startsWith('http://') && !url.startsWith('https://')) ? `https://${url}` : url;
    const linkTarget = target ?? '_blank';
    const link = document.createElement('a');
    link.href = targetUrl;
    link.target = linkTarget;
    link.rel = 'noopener noreferrer';
    link.click();
}
