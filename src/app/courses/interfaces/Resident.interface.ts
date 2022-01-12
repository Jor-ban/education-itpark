import { CourseInterface } from "./Course.interface";
import { TranslatableInterface } from "./Translatable.interface";

export interface ResidentInterface {
  address: TranslatableInterface;
  background: string;
  city: string;
  director: TranslatableInterface;
  id: number;
  logo: string;
  phone: string | null;
  phone_tg: string | null;
  site: string | null;
  title: string;
  courses: CourseInterface[];
}
