// userSlice.js
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    adresse: null,
    detailPanier: [],
    totalHt: 0,
    paiement: null,
    totalLivraison: 0,
    activeCommand: null,
    activePayLink: null
    // service: {},
};

const panierSlice = createSlice({
    name: 'panier',
    initialState,
    reducers: {
        setDetailPanier: (state, action) => {
            state.detailPanier = action.payload;
            state.totalHt = state.detailPanier.reduce((total, item) => total + (+item.produit.priceProduits[0].prixUnitaire * item.quantity), 0)
            const totQte = state.detailPanier.reduce((total, item) => total + (+item.quantity), 0);
            if (totQte >= 5) {
                state.totalLivraison = 0;
            }
        },
        pushDetailPanier: (state, action) => {
            state.detailPanier.push(action.payload);
            state.totalHt = state.detailPanier.reduce((total, item) => total + (+item.produit.priceProduits[0].prixUnitaire * item.quantity), 0)
            const totQte = state.detailPanier.reduce((total, item) => total + (+item.quantity), 0);
            if (totQte >= 5) {
                state.totalLivraison = 0;
            }
        },
        removeDetailPanier: (state, action) => {
            state.detailPanier = state.detailPanier.filter((item) => item.produit.id !== action.payload);
            state.totalHt = state.detailPanier.reduce((total, item) => total + (+item.produit.priceProduits[0].prixUnitaire * item.quantity), 0)
            const totQte = state.detailPanier.reduce((total, item) => total + (+item.quantity), 0);
            if (totQte >= 5) {
                state.totalLivraison = 0;
            }
        },
        updatedQuantity: (state, action) => {
            state.detailPanier = state.detailPanier.map((item) => {
                if (item.produit.id === action.payload.id) {
                    item.quantity = action.payload.quantity;
                }
                return item;
            });
            state.totalHt = state.detailPanier.reduce((total, item) => total + (+item.produit.priceProduits[0].prixUnitaire * item.quantity), 0)
            const totQte = state.detailPanier.reduce((total, item) => total + (+item.quantity), 0);
            if (totQte >= 5) {
                state.totalLivraison = 0;
            }
        },
        setAdresse: (state, action) => {
            state.adresse = action.payload;
        },
        setPaiement: (state, action) => {
            state.paiement = action.payload;
        },
        setTotalLivraison: (state, action) => {
            const totQte = state.detailPanier.reduce((total, item) => total + (+item.quantity), 0);
            if (totQte >= 5) {
                state.totalLivraison = 0;
            } else {
                state.totalLivraison = +action.payload;
            }
        },
        setActiveCommand: (state, action) => {
            state.activeCommand = action.payload;
        },
        setActivePayLink: (state, action) => {
            state.activePayLink = action.payload;
        },
        setClearPanier: (state) => {
            state.detailPanier = [];
            state.totalHt = 0;
            state.totalLivraison = 0;
            state.adresse = null;
            state.paiement = null;
            state.activeCommand = null;
        },
        // reset: () => initialState,
    },
});

export const {
    setDetailPanier,
    pushDetailPanier,
    removeDetailPanier,
    updatedQuantity,
    setAdresse,
    setPaiement,
    setTotalLivraison,
    setActiveCommand,
    setActivePayLink,
    setClearPanier
} = panierSlice.actions;
export default panierSlice.reducer;