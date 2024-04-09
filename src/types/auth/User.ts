export interface User {
  id: number | null;
  first_name: string | null;
  last_name: string | null;
  position: string | null;
  groups: string[];
}
