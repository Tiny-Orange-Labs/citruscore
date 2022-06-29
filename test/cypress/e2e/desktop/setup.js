export default function () {
    return before(() => {
        cy.viewport(1200, 800);
        cy.visit('http://localhost:3000/prod/');
    });
}
