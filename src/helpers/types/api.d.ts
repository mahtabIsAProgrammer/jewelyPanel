interface Users {
  id?: string;
  firstName?: string | null;
  lastName: string | null;
  userName?: string | null;
  email?: string | null;
  gender?: number | null;
  imageUrl?: string | null;
}

interface Products {
  id?: string;
  name?: string | null;
  size?: string | null;
  price?: number | null;
  image?: string | null;
  color?: string | null;
  style?: string | null;
  brand?: string | null;
  detail?: string | null;
  length?: string | null;
  material?: string | null;
  isMaster?: boolean | null;
  categoryId?: string | null;
}

interface Faqs {
  title?: string | null;
  locale?: string | null;
  categoryId?: string | null;
  description?: string | null;
}

interface Comments {
  id?: string;
  userId?: string | null;
  rate?: number | null;
  type?: number | null;
  title?: string | null;
  blogId?: string | null;
  comment?: string | null;
  userEmial?: string | null;
  productId?: string | null;
  isAccepted?: boolean;
  createOn?: string | null;
  productName?: string | null;
}

interface Blogs {
  authorId?: string | null;
  authorName?: string | null;
  title?: string | null;
  thumbnail?: string | null;
  published?: string | null;
  detials?: string | null;
  commentsCount?: number | null;
}

interface Categories {
  name?: string | null;
  imageUrl?: string | null;
  description?: string | null;
  shortDescription?: string | null;
}
