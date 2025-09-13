

export enum Emotion {
    Happy = 'Happy',
    Sad = 'Sad',
    Angry = 'Angry',
    Surprised = 'Surprised',
    Neutral = 'Neutral',
    Disgusted = 'Disgusted',
    Fearful = 'Fearful',
}

export enum HandSign {
    ThumbsUp = 'Thumbs Up',
    ThumbsDown = 'Thumbs Down',
    Peace = 'Peace',
    OK = 'OK',
    Fist = 'Fist',
    Wave = 'Wave',
    Pointing = 'Pointing',
    HighFive = 'High Five',
    CallMe = 'Call Me',
    CrossedFingers = 'Crossed Fingers',
    Love = 'Love',
}

export enum Year {
    First = '1st Year',
    Second = '2nd Year',
    Third = '3rd Year',
    Fourth = '4th Year',
}

export enum Designation {
    Principal = 'Principal',
    VicePrincipal = 'Vice Principal',
    HOD = 'HOD',
    Incharge = 'Incharge',
    Teacher = 'Teacher',
}

export enum HeadPose {
    LookingStraight = 'Looking Straight',
    LookingLeft = 'Looking Left',
    LookingRight = 'Looking Right',
    LookingUp = 'Looking Up',
    LookingDown = 'Looking Down',
}


export interface BoundingBox {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface StudentInfo {
    name: string;
    rollNumber: string; // Will be used as username
    department: string;
    year: Year;
    password: string; // In a real app, this would be a hash
    isBlocked: boolean;
    photoBase64?: string;
}

export interface AdminInfo {
    name: string;
    idNumber: string; // Will be used as username
    phoneNumber: string;
    department: string;
    designation: Designation;
    password: string; // In a real app, this would be a hash
    isBlocked?: boolean;
    photoBase64?: string;
}

export interface AttendanceRecord {
    persistentId: number;
    timestamp: number;
    emotion: Emotion;
}

export interface AuditLogRecord {
    timestamp: number;
    user: string; // The admin who performed the action
    action: string;
    details: string;
}


export interface FaceResult {
    personId: string;
    emotion: Emotion;
    confidence: number;
    boundingBox: BoundingBox;
    headPose?: HeadPose;
    persistentId?: number;
    studentInfo?: StudentInfo;
}

export interface HandResult {
    sign: HandSign;
    confidence: number;
    boundingBox: BoundingBox;
}

export interface DetectionResult {
    faces: FaceResult[];
    hands: HandResult[];
}