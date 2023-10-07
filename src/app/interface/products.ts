export interface Products {
    imageCover:string,
    title:string,
    description:string,
    ratingsAverage:number,
    price:number,
    category:category,
    brand:brand,
    id:string,

}


interface category{
    name:string,
    image:string,
    _id:string,
} 

interface brand{
    name:string,
    image:string,
} 