// export class Requirement {
//   public id:number;
//   public creationTime: string;
//   public itemMaxCount: number;
//   public itemCurrentCount: number;
//   // public donationMaxAmount: number;
//   // public donationCurrAmount: number;
//   public category:string;
//   // public status: boolean;
//   public description: string;

//   constructor(id?:number, creationTime?: string, itemMaxCount?: number, itemCurrentCount?: number, category?:string, description?: string) {
//     this.id = id || 0;
//     this.creationTime = creationTime || "";
//     this.itemMaxCount = itemMaxCount || 0;
//     this.itemCurrentCount = itemCurrentCount || 0;
//     this.category = category || ""
//     this.description = description || "";
//   }
// }

export interface Requirement {
  id:number;
  creationTime: string;
  itemMaxCount: number;
  itemCurrentCount: number;
  // public donationMaxAmount: number;
  // public donationCurrAmount: number;
  [category:string]:any;
  // public status: boolean;
  description: string;
}