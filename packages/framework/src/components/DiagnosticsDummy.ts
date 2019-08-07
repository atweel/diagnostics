import {
    Diagnostics,
} from 'conventions/Diagnostics';

class DiagnosticsDummy implements Diagnostics {
    public notify(message: string, tags?: string[], payload?: any): void {
        //
    }
    public warn(message: string, tags?: string[], payload?: any): void {
        //
    }
    public debug(message: string, tags?: string[], payload?: any): void {
        //
    }
    public abort(error: Error | (() => Error)): void;
    public abort(error?: any): void {
        //
    }
}

export {
    DiagnosticsDummy,
};
