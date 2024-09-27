import { UserType } from "./user.type";

export enum NotificationType {
  Like,
  Comment,
  Follow,
}

export type NotificationsType = {
  _id?: string;
  to: string;
  from: UserType;
  type: NotificationType;
  read: boolean;
  created_at?: Date;
  updated_at?: Date;
};
