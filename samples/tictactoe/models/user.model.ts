export class User
{
    created: AzureDateString;
    name: string;
    email: string;

    // azure     
    Timestamp: AzureDateString;
    PartitionKey: string;
    RowKey: string;
    ETag: string;
}

class AzureDateString extends String
{
    
}