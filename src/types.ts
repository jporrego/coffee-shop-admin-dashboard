export interface Category {
  _id: string;
  name: string;
}

export interface Brand {
  _id: string;
  name: string;
}

export interface Product {
  _id: string;
  name: string;
  category: Category;
  brand: Brand;
  description: string;
  price: number;
  stock: number;
  img: string;
}

export interface ProductPOST {
  name: string;
  category: Category;
  brand: Brand;
  description: string;
  price: number;
  stock: number;
  picture?: any;
}
