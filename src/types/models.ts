export interface Note {
    id: string;
    title: string;
    content: string;
    tags: string[];
    category: string;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
    attachments: string[]; 
    version: number;
  }
  
  export interface Attachment {
    id: string;
    fileName: string;
    fileType: string;
    fileSize: number;
    uploadedAt: Date;
    path: string;
    extractedData?: Record<string, any>;
  }
  