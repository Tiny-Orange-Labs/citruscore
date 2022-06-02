document.addEventListener('DOMContentLoaded', function () { 
    const modal = document.querySelector('modal-window');

    modal.setAndOpen({
        HTML: 'welcome to the lit template'
    });
});

export default function () {}