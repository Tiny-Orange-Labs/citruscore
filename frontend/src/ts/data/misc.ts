export const isPhone: boolean = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
);
export const isIOS: boolean =
    /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
export const isFirefox: boolean = navigator.userAgent.indexOf('Firefox') !== -1;
export const isDesktop: boolean = !isPhone;
