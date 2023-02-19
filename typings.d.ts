// we can use this interface of message anywhere

interface Message {
    text: string;
    createdAt: admin.firestore.Timestamp;
    user: {
        _id: string;
        name: string;
        avatar: string;
    };
}