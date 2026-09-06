export interface New {
  _id: string;
  title: string;
  description: string;
  image: {
    url: string;
    public_id: string;
  };
  endDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface NewFormData {
  title: string;
  description: string;
  image: string;
  endDate: string;
}
