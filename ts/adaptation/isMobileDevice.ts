export function isMobileDevice(): boolean {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
        return false;
    }

    // 用户代理检测
    const ua: string = navigator.userAgent;
    const mobileRegex: RegExp = /Mobi|Android|iPhone|iPad|iPod|Windows Phone|BlackBerry/i;
    const isMobileUA: boolean = mobileRegex.test(ua);

    // 屏幕尺寸检测
    const screenWidth: number = window.innerWidth || 0;
    const isMobileScreen: boolean = screenWidth <= 1024;  //适配平板

    // 触摸支持检测（兼容性处理）
    const hasTouch: boolean = (
        'ontouchstart' in window ||
        (navigator.maxTouchPoints !== undefined && navigator.maxTouchPoints > 0)
    );
    return isMobileUA || (isMobileScreen && hasTouch);
}
