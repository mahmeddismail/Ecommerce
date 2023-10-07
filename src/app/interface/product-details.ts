export interface ProductDetails {
    images:string ,
    imageCover:string ,
    title:string ,
    description:string ,
    id:string
    quantity:number ,
    price:number ,
    sold:number ,
    ratingsAverage:number ,
    category:category,
    brand:brand,

}


interface category{
    name:string,
    image:string,
} 

interface brand{
    name:string,
    image:string,
} 