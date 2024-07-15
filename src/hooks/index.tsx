// Product id, name, price
// Category id, name

import { useState } from "react";

export function useList<T>(contentType: string) {
    const [loading, setLoading] = useState<boolean>(false)
    const [list, setList] = useState<T[]>([])

    const getList = async () => {
        setLoading(true)
        fetch(`https://json.com/${contentType}`)
        .then(res => res.json())
        .then(res => setList(res))
        .finally(() => {
            setLoading(false)
        })
    }

    return { loading, getList, list }
}

type Product = {
    id: string
    name: string;
    price: number
}

export const useProducts = () =>  useList<Product>("products")

type Category = {
    id: string
    name: string;
}
export const useCategories = () =>  useList<Category>("categories")


