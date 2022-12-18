export interface ProductsData {
    _id: string;
    name: string;
    price: number;
    details: string; 
    slug: {
      current: string;
    }
    image: {
      _key: number,
      _type: string,
      asset: {
        _ref: string
      }
    }
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

 export interface FooterBannerData{
  discount: string;
  largeText1: string;
  largeText2: string; 
  saleTime: string;
  smallText: string, 
  midText: string, 
  description: string,
  product: string, 
  buttonText: string, 
  image: {
    asset: {
      _ref: string
    }
  }
 }