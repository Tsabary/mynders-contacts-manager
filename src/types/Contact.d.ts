type Contact = {
  _id: string;
  name: string;
  data: { _id: string; title: "email" | "phone_number"; value: string }[];
  user_id: string;
  folder_id: string;
  created_at: Date;
  updated_at: Date;
};
