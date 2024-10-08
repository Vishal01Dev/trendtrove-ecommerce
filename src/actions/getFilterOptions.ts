import { ResponsefiltersType } from "../utils/types"

export const getFilterOptions = (filters: ResponsefiltersType) => {

    const categoryOptions = filters.categories.map((category => {
        return {
            id: category._id,
            name: category.name,
            options: category.subcategories?.map((subcategory => {
                return {
                    value: subcategory._id,
                    label: subcategory.name,
                    checked: false
                }
            }))
        }
    }))

    const sizeOptions = {
        id: "size",
        name: "Size",
        options: filters.sizes?.map((size) => {
            return { value: size, label: size, checked: false }
        })
    }

    const colorOptions = {
        id: "color",
        name: "Color",
        options: filters.colors?.map((color) => {
            return { value: color, label: color, checked: false }
        })
    }

    // const categoryOptions = [
    //     {
    //         id: "Men",
    //         name: "Men",
    //         options: [
    //             {
    //                 value: 'id',
    //                 label: "Jackets",
    //                 checked: false
    //             },
    //             {
    //                 value: 'id',
    //                 label: "Jeans",
    //                 checked: false
    //             },
    //             {
    //                 value: 'id',
    //                 label: "Shirts",
    //                 checked: false
    //             },
    //         ]
    //     },
    //     {
    //         id: "Women",
    //         name: "Women",
    //         options: [
    //             {
    //                 value: 'id',
    //                 label: "Jackets",
    //                 checked: false
    //             },
    //             {
    //                 value: 'id',
    //                 label: "Jeans",
    //                 checked: false
    //             },
    //             {
    //                 value: 'id',
    //                 label: "Shirts",
    //                 checked: false
    //             },
    //         ]
    //     },
    //     {
    //         id: "Kids",
    //         name: "Kids",
    //         options: [
    //             {
    //                 value: 'id',
    //                 label: "Jackets",
    //                 checked: false
    //             },
    //             {
    //                 value: 'id',
    //                 label: "Jeans",
    //                 checked: false
    //             },
    //             {
    //                 value: 'id',
    //                 label: "Shirts",
    //                 checked: false
    //             },
    //         ]
    //     },
    // ]

    // const sizeOptions = [
    //     {
    //         id: "size",
    //         name: "Size",
    //         options: [
    //             { value: '2l', label: '2L', checked: false },
    //             { value: '6l', label: '6L', checked: false },
    //             { value: '12l', label: '12L', checked: false },
    //             { value: '18l', label: '18L', checked: false },
    //             { value: '20l', label: '20L', checked: false },
    //             { value: '40l', label: '40L', checked: true },
    //         ]
    //     }
    // ]

    // const colorOptions = [
    //     {
    //         id: 'color',
    //         name: 'Color',
    //         options: [
    //             { value: 'red', label: 'Red', checked: false },
    //             { value: 'green', label: 'Green', checked: false },
    //             { value: 'blue', label: 'Blue', checked: false },
    //         ]
    //     }

    // ]

    return {
        categoryOptions, sizeOptions, colorOptions
    }

}