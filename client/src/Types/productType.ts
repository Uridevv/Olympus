
// const offeredProductModel = new mongoose.Schema({
//     isOffered: {
//         type: Boolean,
//         require: true,
//         trim: true,
//         default: false
//     },
//     offers: {
//         type: [mongoose.Schema.Types.ObjectId],
//         ref: 'Offer',
//         require: true,
//         trim: true,
//     },
// },
//     { _id: false } // 
// )

interface Offered {
  isOffered :boolean;
  offers:string[]
}
// Type para el producto en general.
export interface Product {
  _id:string;
  name: string;
  description: string;
  price: number;
  stock:number;
  category: string;
  colors:string[];
  size:string[];
  active:boolean;
  offered: Offered,
  previewImage:string;
}
// Typo para la imagen del producto que ya se subio a cloudinary y esta en la base de datos.
export interface ProductImage {
  _id:string;
  url: string;
  color:string;
  public_id: string;
  productId: string; //Id del producto vinculado con la imagen.
}

// Typo que tiene que tener el objeto que devuelve la subida de cloudinary.
export interface ImageFile {
  file: string; // aqui ponemos la url de la imagen subida a cloudinary.
  public_id: string;
  productId: string;
  color:string;
}

// Typo para la imagen cuando se selecciona en el formulario (aun como un FIlE).
export interface ProductImageForm {
  _id?: string;
  url: string;
  color: string;
  file?: File;
  objectUrl?:string;
}

// Typo para el formulario del producto.
export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  colors: string[];
  size: string[];
  active:boolean;
}

export interface ProductImageSelec {
  color:string;
  file?:File;
  url?:string;
  objectUrl?:string;
}