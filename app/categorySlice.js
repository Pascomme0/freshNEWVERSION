// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    categoriesVentes: [],
    activeCat: null,
    categoriesService: [],
    activeService: null,
    produits: [],
    produitsCategorie: [],
};

const categorySlice = createSlice({
    name: 'categorie',
    initialState,
    reducers: {
        setCategoriesVentes: (state, action) => {
            state.categoriesVentes = action.payload;
        },
        setCategoriesService: (state, action) => {
            state.token = action.payload;
        },
        setActiveCat: (state, action) => {
            state.activeCat = action.payload;
        },
        setActiveService: (state, action) => {
            state.activeService = action.payload;
        },
        setProduits: (state, action) => {
            state.produits = action.payload;
        },
        setProduitsCategorie: (state, action) => {
            state.produitsCategorie = action.payload;
        },
        setReset: (state) => {
            state.categoriesVentes = [];
            state.categoriesService = [];
            state.activeService = null;
            state.activeCat = null;
            state.produits = [];
            state.produitsCategorie = [];
        }
    },
});

export const { setCategoriesVentes, setCategoriesService, setActiveService, setActiveCat, setProduits, setProduitsCategorie, setReset } = categorySlice.actions;
export default categorySlice.reducer;