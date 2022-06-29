describe('Visiting app', () => {
    it('should visit', () => {
        const text = 'welcome to the lit template'; 

        cy.visit('http://localhost:3000/prod/');
        cy.get('modal-window').shadow().find('.modal-content').should('have.text', text);
    });
});
