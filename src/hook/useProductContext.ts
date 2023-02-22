import { useContext } from "react";

import {ProductContext} from '../Context/ProductsContext'

const useProductContext = () => useContext(ProductContext)

export default useProductContext