export interface userType {
    _id: string
    firstName: string
    lastName: string
    username: string
    phoneNumber: string
    email: string
    address: string
    city: string
    state: string
    country: string
    pincode: string | number
}


export interface responseType {
    statusCode: number;
    data: any;
    message: string;
    success: boolean
}

export interface ErrorType {
    name: string
    message: string
    stack: string
}

export interface ResponseProductType {
    products: ProductType[]
    totalProducts: number
}

export interface ProductType {
    _id: string
    name: string
    description: string
    price: number
    image: string
    stock: number
    category: string
    subCategory: string
    sizes: string[]
    colors: string[]
    material: string
    style: string
    tags: string[]
    rating: number
    reviews: string[]
}

type filterSubCategory = {
    name: string
    _id: string
}
type filterCategory = {
    name: string
    _id: string
    subcategories: filterSubCategory[]
}


export interface ResponsefiltersType {
    categories: filterCategory[],
    sizes: string[],
    colors: string[],
}


interface OptionType {
    value: string;
    label: string;
    checked: boolean;
}

interface FilterGroup {
    id: string;
    name: string;
    options: OptionType[];
}

export interface FiltersType {
    categoryOptions: FilterGroup[];
    sizeOptions: FilterGroup[];
    colorOptions: FilterGroup[];
}

export interface WishlistItemType {
    _id: string
    product: ProductType
}

export interface WishlistType {
    _id: string
    user: string
    items: WishlistItemType[]
}

export interface CartItemProps {
    _id: string,
    quantity: number
    product: ProductType
}

export interface CartItemsProps {
    _id: string,
    user: string,
    items: CartItemProps[]
}

export interface ResponseCartType {
    cartItems: CartItemsProps
    cartTotal: number

}

export type AddressType = Omit<userType, '_id'>

export interface CheckoutDetailsType {
    shippingAddress: AddressType
    billingAddress: AddressType
    cartItems: CartItemProps[]
    orderNote: string
    totalAmount: number
}

export interface orderItemProps {
    productId: string,
    quantity: number,
    price: number
}

export interface paymentDetailProps {
    order: string,
    amount: number,
    paymentMethod: string,
    paymentToken: string,
}

export interface OrderType {
    user: string,
    totalAmount: number,
    items: CartItemProps[],
    shippingAddress: AddressType
    billingAddress: AddressType
    paymentDetails: paymentDetailProps
}

export interface UserOrdersType {
    _id: string;
    user: {
        _id: string;
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string;
    };
    items: {
        _id: string;
        quantity: number;
        price: number;
        product: {
            _id: string;
            name: string;
            category: string;
            subCategory: string;
        };
    }[];
    shippingAddress: {
        street: string;
        city: string;
        postalCode: string;
        country: string;
    };
    status: string;
    paymentDetails: {
        _id: string;
        amount: number;
        method: string;
        status: string;
    };
    createdAt: Date
};

export interface OrderObjType {
    orderDetails: OrderDetailsType | null;
    paymentDetails: PaymentDetailsType | null;
}

export interface OrderDetailsType {
    _id: string;
    user: {
        _id: string;
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string;
    };
    items: {
        _id: string;
        quantity: number;
        price: number;
        product: {
            _id: string;
            name: string;
            category: string;
            subCategory: string;
            image: string;
        };
    }[];
    shippingAddress: AddressType;
    billingAddress: AddressType;
    status: string;
    createdAt: string;
}


export interface PaymentDetailsType {
    order: string;
    amount: number;
    paymentMethod: string;
    paymentToken: string;
}


export interface GuestCartType {
    product: ProductType
    quantity: number
    _id?: string; 
}
