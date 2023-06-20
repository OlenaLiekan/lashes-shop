import { makeAutoObservable } from 'mobx';

export default class ProductStore {
    constructor() {
        this._types = []
        this._brands = [
                        {
                id: 1,
                name: "Maximova"
            },
            {
                id: 2,
                name: "Sculptor Lash"
            }
        ]
        this._products = [
            {
                id: 1,
                name: "Cola BEST 0.5-1 seg",
                price: 23,
                rating: 5,
                img: "965cea72-f756-4624-8878-58d79aa9891c.jpg"
            },
            {
                id: 2,
                name: "Cola BLACK 0.5-1 seg",
                price: 23, 
                rating: 5,
                img: "2faf5a7c-0aa1-42f4-9b1b-e1362414b688.jpg"
            }
        ]
        makeAutoObservable(this)
    }
    
    setTypes(types) {
        this._types = types
    }

    setBrands(brands) {
        this._brands = brands
    }

    setProducts(products) {
        this._products = products
    }

    get types() {
        return this._types
    }

    get brands() {
        return this._brands
    }

    get products() {
        return this._products
    }
}

