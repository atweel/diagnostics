class ApplicationException extends Error {
    constructor() {
        super('Application error occurred.');
    }
}

export {
    ApplicationException,
};
