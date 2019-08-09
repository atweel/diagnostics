class ApplicationError extends Error {
    constructor() {
        super('Application error occurred.');
    }
}

export {
    ApplicationError,
};
