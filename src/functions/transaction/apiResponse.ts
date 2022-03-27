export const apiResponses = {
    _200: (body: { [key: string]: any }) => {
        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json"
            },    
            body: JSON.stringify(body, null, 2),
        };
    },
    _400: (body: { [key: string]: any }) => {
        return {
            statusCode: 400,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body, null, 2),
        };
    },
};