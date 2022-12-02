import { setLocale } from './utilities/language/language';
document.addEventListener('DOMContentLoaded', function () {
    console.log('v:__buildVersion__ at: __buildDate__ ');
});
setTimeout(function () {
    console.log('language change');
    setLocale('de-CH-1901');
}, 5000);
