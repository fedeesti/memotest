const URL = 'http://127.0.0.1:5500/';

context('Memotest', () => {
    before(() => {
        cy.visit(URL)
    });

    describe('Carga del memotest', () => {

        const NUMERO_CUADROS = 16;

        it('Verifica el tablero', () => {
            cy.get('.memotest').find('.cards').should('have.length', NUMERO_CUADROS)
        });

        it('Verifica que las cartas sean aleatorias', () => {
            let cartasOriginales = [];
            cy.get('.memotest #dorso').then((cartas) => {
                cartas.each(function(i, carta) {
                    cartasOriginales.push(carta.name);
                });
            });

            cy.visit(URL);

            let cartasNuevas = [];
            cy.get('.memotest #dorso').then((nuevasCartas) => {
                nuevasCartas.each(function(i, nuevaCarta) {
                    cartasNuevas.push(nuevaCarta.name);
                });
            });
            cy.wrap(cartasOriginales).should('not.deep.equal', cartasNuevas);
        });
    })

    describe('Resolver juego', () => {

        const NUMERO_CUADROS = 16;
        let mapaDePares, listaDePares;
        it('Elige una combinación errónea', () => {
            cy.get('.memotest #dorso').then(cartas => {
                mapaDePares = obtenerPares(cartas);
                listaDePares = Object.values(mapaDePares);

                cy.get(listaDePares[0][0]).click({force: true});
                cy.get(listaDePares[1][0]).click({force: true});
                cy.wait(1000);
                cy.get('.memotest').find('.cards').should('have.length', NUMERO_CUADROS);
            });
        });

        it('Resuelve el juego', () => {
            listaDePares.forEach((par) => {
                cy.get(par[0]).click({force: true});
                cy.get(par[1]).click({force: true});
                cy.wait(500);
            });

            cy.get('.memotest').find('.cards').should('have.css', 'opacity', '0');
            cy.get('.tablero').should('not.be.visible');
            cy.get('.juegoCompleto').should('be.visible');
        });

    });
});

function obtenerPares(cartas) {
    let pares = {};

    cartas.each((i, carta) => {
        if (pares[carta.name]) {
            pares[carta.name].push(carta);
        } else {
            pares[carta.name] = [carta];
        }
    });

    return pares;
}