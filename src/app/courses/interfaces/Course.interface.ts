import { TranslatableInterface } from "./Translatable.interface";

export interface CourseInterface {
  desc: TranslatableInterface;
  direction: string;
  duration: TranslatableInterface;
  method: string[];
  price: TranslatableInterface;
  resident_id: number;
  skills: string;
  title: TranslatableInterface;
  address: string | null;
  contact_name: string | null;
  contact_phone: string | null;
}
