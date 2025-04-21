export interface FoundItem {
    id: number;
    item_name: string;
    category: string;
    description: string;
    found_location: string;
    date_found: string;
    contact_info: string;
    imageUrl?: string | null; // <-- allow null as well
  }
  
  