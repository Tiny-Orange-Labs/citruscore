export default function () {
    return before(() => {
        cy.viewport('iphone-8');
        cy.visit('http://localhost:3000/prod/', {
            onBeforeLoad: (win) => {
                win.ontouchstart = true
                
                Object.defineProperty(win.navigator, 'userAgent', {
                    value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
                });    
            }, 
        });
    });
}
