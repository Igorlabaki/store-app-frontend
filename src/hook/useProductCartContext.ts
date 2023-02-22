import { useContext } from "react";

import {ProductCartContext} from '../Context/ProductsCartContext'

const useProductCartContext = () => useContext(ProductCartContext)

export default useProductCartContext