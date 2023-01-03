const browserName = (function (agent) {
    switch (true) {
        case agent.indexOf('edge') > -1:
            return 'MS Edge';
        case agent.indexOf('edg/') > -1:
            return 'Edge ( chromium based)';
        case agent.indexOf('opr') > -1 && !!window?.opr:
            return 'Opera';
        case agent.indexOf('chrome') > -1 && !!window?.chrome:
            return 'Chrome';
        case agent.indexOf('trident') > -1:
            return 'MS IE';
        case agent.indexOf('firefox') > -1:
            return 'Mozilla Firefox';
        case agent.indexOf('safari') > -1:
            return 'Safari';
        default:
            return 'other';
    }
})(window.navigator.userAgent.toLowerCase());
export const isPhone: boolean = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
);
export const isIOS: boolean =
    /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
export const isFirefox: boolean = navigator.userAgent.indexOf('Firefox') !== -1;
export const isDesktop: boolean = !isPhone;
export const client = {
    ua: navigator.userAgent,
    timezone: new Date().getTimezoneOffset() / 60,
    screen: {
        width: screen.width,
        height: screen.height,
    },
    browser: {
        name: browserName,
    },
    user: {
        language: localStorage.getItem('language') || navigator.language,
    },
    system: {
        language: navigator.language,
        platform: navigator.platform,
        isDesktop,
        isIOS,
        isPhone,
    },
};

declare global {
    interface Window {
        chrome: Object;
        opr: Object;
    }
}
