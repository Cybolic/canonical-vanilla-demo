/// <reference types="cypress" />
import data from '../../fixtures/posts.json'

describe('canonical demo blog articles', () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: 'GET',
        pathname: '/posts.json'
      },
      (req) => req.reply({ fixture: 'posts.json' })
    ).as('getData');
    cy.visit('http://localhost:1234');
    cy.wait('@getData');
  })

  it('displays the correct amount of posts and properly', () => {
    cy.get('#posts section.card').should('have.length', 3);

    // the fixture data is purposefully out of order, so check that
    // the titles are now ordered by date DESC + title ASC
    cy.get('#posts section.card h2').first().should('have.text', data[1].title.rendered);
    cy.get('#posts section.card h2').eq(1).should('have.text', data[2].title.rendered);
    cy.get('#posts section.card h2').last().should('have.text', data[0].title.rendered);

    cy.get('#posts section.card .card__image').first().should('have.prop', 'src', data[1].featured_media);
    cy.get('#posts section.card .card__header').first().should('have.text', data[1]._embedded['wp:term'][2][0].name);
    cy.get('#posts section.card .card__author > a').first().should('have.text', data[1]._embedded.author[0].name);
    cy.get('#posts section.card .card__author > time').first().should('have.prop', 'datetime', (new Date(data[1].date)).toISOString());
  });
});
