export class Organisation {
  public id:number;
  public fullname:string;
  public address:string;
  public latitude:number;
  public longitude:number;
  public type: string;
  public description: string;
  public distance: number;
  public jwtToken:string;
  //public city:String;

  constructor(id?:number, fullname?:string, address?:string, latitude?:number ,longitude?:number, type?: string, distance?: number, description?: string) {
    this.id = id || 0;
    this.fullname = fullname || "";
    this.address = address || "";
    this.latitude = latitude || 0.0;
    this.longitude = longitude || 0.0;
    this.type = type || "";
    this.description = description || "";
    this.distance = distance || 0;
  }
}