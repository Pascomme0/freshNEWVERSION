// userSlice.js
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    adresse: null,
    detailPanier: [],
    totalHt: 0,
    totalRemise: 0,
    paiement: null,
    totalTTC: 0,
    activeCommand: null,
    activePayLink: null,
    service: null,
};
const priceUnite = (product, service) => {
    let prix = 0;
    let unite = 1;
    if (product === undefined) {
        prix = 0;
        unite = 1;
    } else {
        let tab = product?.priceProduits ?? [];
        for (const price of tab) {
            let id = price?.service?.['@id'] ?? 'nope'
            if (id === service) {
                prix = price?.prixUnitaire ?? 0;
                unite = price?.unite ?? 1;
                break;
            }
        }
    }
    return {prix, unite};
}
const price = (product, service) => {
    return priceUnite(product, service).prix;
}

const unite = (product, service) => {
    return priceUnite(product, service).unite;
}

const remise = (product, service, qte) => {
    let remise = 0;
    let priceProduct = {
        qteRemise: 0,
        remiseOverUnite: 0
    }
    if (product === undefined) {
        priceProduct = {
            qteRemise: 0,
            remiseOverUnite: 0
        }
    } else {
        let tab = product?.priceProduits ?? [];
        for (const price of tab) {
            let id = price?.service?.['@id'] ?? 'nope'
            if (id === service) {
                priceProduct = price;
                break;
            }
        }
    }
    const qteRemise = priceProduct?.qteRemise ?? 0;
    const remiseOverUnite = priceProduct?.remiseOverUnite ?? 0;
    if (qte >= qteRemise) {
        remise = qte * remiseOverUnite
    }
    return remise;
}

const panierServiceSlice = createSlice({
    name: 'panierService',
    initialState,
    reducers: {
        setDetailPanier: (state, action) => {
            state.detailPanier = action.payload;
            state.totalHt = state.detailPanier.reduce((total, item) => total + (+price(item.produit, state.service) * (Math.ceil(item.quantity / unite(item.produit, state.service)))), 0)
            state.totalRemise = state.detailPanier.reduce((total, item) => total + (+remise(item.produit, state.service, item.quantity)), 0)
            state.totalTTC = state.totalHt - state.totalRemise
        },
        pushDetailPanier: (state, action) => {
            state.detailPanier.push(action.payload);
            state.totalHt = state.detailPanier.reduce((total, item) => total + (+price(item.produit, state.service) * (Math.ceil(item.quantity / unite(item.produit, state.service)))), 0)
            state.totalRemise = state.detailPanier.reduce((total, item) => total + (+remise(item.produit, state.service, item.quantity)), 0)
            state.totalTTC = state.totalHt - state.totalRemise
        },
        removeDetailPanier: (state, action) => {
            state.detailPanier = state.detailPanier.filter((item) => item.produit.id !== action.payload);
            state.totalHt = state.detailPanier.reduce((total, item) => total + (+price(item.produit, state.service) * (Math.ceil(item.quantity / unite(item.produit, state.service)))), 0)
            state.totalRemise = state.detailPanier.reduce((total, item) => total + (+remise(item.produit, state.service, item.quantity)), 0)
            state.totalTTC = state.totalHt - state.totalRemise
        },
        updatedQuantity: (state, action) => {
            state.detailPanier = state.detailPanier.map((item) => {
                if (item.produit.id === action.payload.id) {
                    item.quantity = action.payload.quantity;
                }
                return item;
            });
            state.totalHt = state.detailPanier.reduce((total, item) => total + (+price(item.produit, state.service) * (Math.ceil(item.quantity / unite(item.produit, state.service)))), 0)
            state.totalRemise = state.detailPanier.reduce((total, item) => total + (+remise(item.produit, state.service, item.quantity)), 0)
            state.totalTTC = state.totalHt - state.totalRemise
        },
        setAdresse: (state, action) => {
            state.adresse = action.payload;
        },
        setPaiement: (state, action) => {
            state.paiement = action.payload;
        },
        setService: (state, action) => {
            state.service = action.payload;
        },
        setTotalRemise: (state, action) => {
            state.totalRemise = state.detailPanier.reduce((total, item) => total + (+remise(item.produit, state.service, item.quantity)), 0)
        },
        setActiveCommand: (state, action) => {
            state.activeCommand = action.payload;
        },
        setActivePayLink: (state, action) => {
            state.activePayLink = action.payload;
        },
        setClearPanier: (state) => {
            state.adresse = null
            state.detailPanier = []
            state.totalHt = 0
            state.totalRemise = 0
            state.paiement = null
            state.totalTTC = 0
            state.activeCommand = null
            state.activePayLink = null
            state.service = null
        },
    },
});

export const {
    setDetailPanier,
    pushDetailPanier,
    removeDetailPanier,
    updatedQuantity,
    setAdresse,
    setPaiement,
    setService,
    setTotalRemise,
    setActiveCommand,
    setActivePayLink,
    setClearPanier
} = panierServiceSlice.actions;
export default panierServiceSlice.reducer;