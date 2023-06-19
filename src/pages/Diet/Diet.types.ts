export type DietDay = {
  caloriesSum: number;
  dayOfWeek: number;
  documentId: string;
  meals: Array<Meal>;
  template: boolean;
  trainerId: string;
  type: string;
};

export type Meal = {
  type: string;
  documentId: string;
  name: string;
  products: Array<string>;
};
