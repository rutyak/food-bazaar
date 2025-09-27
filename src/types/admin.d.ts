type ImageType = File | string;

export interface DataType {
  name?: string;
  description?: string;
  image?: ImageType | null;
  location?: string;
  categories?: string;
  restaurantId?: string;
  rating?: number;
  price?: string;
  category?: string;
  isVeg?: boolean;
}
