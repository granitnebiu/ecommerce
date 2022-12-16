export interface ProductsData {
    _id: string;
    name: string;
    price: number;
    details: string; 
 }

export interface heroBannerData {
  buttonText: string;
  description: string;
  discount: string;
  largeText1: string;
  largeText2: string;
  midText: string;
  product: string;
  saleTime: string;
  smallText: string;
  image: {
    asset: {
      _ref: string
    }
}
 }
