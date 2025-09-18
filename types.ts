
export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Review {
  author: string;
  rating: number; // 1-5 stars
  comment: string;
}
