import mongoose, { Schema, model, Document, Types } from 'mongoose';

// 1. User
interface IUser extends Document {
username: string;
email: string;
passwordHash: string;
role: 'user' | 'admin';
createdAt: Date;
updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
username: { type: String, required: true, unique: true },
email: { type: String, required: true, unique: true },
passwordHash: { type: String, required: true },
role: { type: String, enum: ['user', 'admin'], default: 'user' },
createdAt: { type: Date, default: Date.now },
updatedAt: { type: Date, default: Date.now },
});

export const User = model<IUser>('User', UserSchema);

// 2. Question
interface IQuestion extends Document {
userId: Types.ObjectId;
title: string;
description: string;
tags: string[];
acceptedAnswerId?: Types.ObjectId;
createdAt: Date;
updatedAt: Date;
}

const QuestionSchema = new Schema<IQuestion>({
userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
title: { type: String, required: true },
description: { type: String, required: true },
tags: [{ type: String }],
acceptedAnswerId: { type: Schema.Types.ObjectId, ref: 'Answer' },
createdAt: { type: Date, default: Date.now },
updatedAt: { type: Date, default: Date.now },
});

export const Question = model<IQuestion>('Question', QuestionSchema);

// 3. Answer
interface IAnswer extends Document {
questionId: Types.ObjectId;
userId: Types.ObjectId;
content: string;
isAccepted: boolean;
upvotes: Types.ObjectId[];
downvotes: Types.ObjectId[];
createdAt: Date;
updatedAt: Date;
}

const AnswerSchema = new Schema<IAnswer>({
questionId: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
content: { type: String, required: true },
isAccepted: { type: Boolean, default: false },
upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
downvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
createdAt: { type: Date, default: Date.now },
updatedAt: { type: Date, default: Date.now },
});

export const Answer = model<IAnswer>('Answer', AnswerSchema);

// 4. Comment (on answers)
interface IComment extends Document {
userId: Types.ObjectId;
answerId: Types.ObjectId;
content: string;
createdAt: Date;
}

const CommentSchema = new Schema<IComment>({
userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
answerId: { type: Schema.Types.ObjectId, ref: 'Answer', required: true },
content: { type: String, required: true },
createdAt: { type: Date, default: Date.now },
});

export const Comment = model<IComment>('Comment', CommentSchema);

// 5. Notification
interface INotification extends Document {
userId: Types.ObjectId;
type: 'answer' | 'comment' | 'mention';
referenceId: Types.ObjectId;
message: string;
isRead: boolean;
createdAt: Date;
}

const NotificationSchema = new Schema<INotification>({
userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
type: { type: String, enum: ['answer', 'comment', 'mention'], required: true },
referenceId: { type: Schema.Types.ObjectId },
message: { type: String },
isRead: { type: Boolean, default: false },
createdAt: { type: Date, default: Date.now },
});

export const Notification = model<INotification>('Notification', NotificationSchema);