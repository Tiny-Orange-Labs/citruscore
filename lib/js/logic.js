document.addEventListener('DOMContentLoaded', function bootStrapApp () { 
    const app = document.querySelector('app-layout');
    const modal = document.querySelector('modal-window');

    modal.setAndOpen({
        HTML: 'welcome to the lit template'
    });
});

export default function () {}