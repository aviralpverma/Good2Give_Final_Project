import { Category } from "./Category";
import { Organisation } from "./Organisation";

export class Require{
    id:number;
    creationDate: Date;
    itemMaxCount: number;
    assocOrg:Organisation;
    donationMaxAmount: number;
    
    categoryId:Category;
    organisationId:number;
    
    description: string;
}