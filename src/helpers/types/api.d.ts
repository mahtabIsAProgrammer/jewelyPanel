interface Users {
  email: string;
  gender: string;
  password: string;
  lastName: string;
  userName: string[];
  imageUrl: string[];
  firstName: string[];
}

interface Products {
  name: string;
  size: string;
  price: string;
  image: string;
  color: string;
  style: string;
  brand: string;
  detail: string;
  length: string;
  material: string;
  isMaster: string;
  categoryId: string;
}

interface Faqs {
  title: string;
  locale: string;
  categoryId: string;
  description: string;
}

interface Comments {
  rate: string;
  type: string;
  title: string;
  userId: string;
  blogId: string;
  comment: string;
  userEmial: string;
  productId: string;
  isAccepted: string;
  createOn: string;
  productName: string;
}

interface Blogs {
  authorId: string;
  authorName: string;
  title: string;
  thumbnail: string;
  published: string;
  commentsCount: string;
}

interface Categories {
  name: string;
}
