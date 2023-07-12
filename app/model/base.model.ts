export class BaseModel {
  private _id: string;
  private _active: boolean;
  private _createdAt: Date;
  private _updatedAt: Date;

  /**
   * @param {string} id The id of the model to be created or updated for this model instance
   * @param {boolean} active Whether the model is active or not
   * @param {string} createdAt The created date of the model
   * @param {string} updatedAt The updated date of the model
   */
  constructor(id: string, active: boolean) {
    this.id = id;
    this.active = active;
    this.createdAt = this.updatedAt = new Date();
  }

  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }

  public get active(): boolean {
    return this._active;
  }
  public set active(value: boolean) {
    this._active = value;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }
  public set createdAt(value: Date) {
    this._createdAt = value;
  }

  public get updatedAt(): Date {
    return this._updatedAt;
  }
  public set updatedAt(value: Date) {
    this._updatedAt = value;
  }
}
