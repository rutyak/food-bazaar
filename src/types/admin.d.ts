type ImageType = File | string;

export interface DataType {
  id?: string | number | undefined;
  name?: string;
  description?: string;
  image?: ImageType | null;
  location?: string;
  categories?: string | string[];
  category?: string;
  restaurantId?: string;
  rating?: number;
  price?: string;
  category?: string;
  isVeg?: boolean;
}
