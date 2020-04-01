import {
    Diagnostics,
} from 'conventions/Diagnostics';

/**
 * DiagnosticsDummy provides a dummy implementation of Diagnostics interface that does exactly nothing.
 */
class DiagnosticsDummy implements Diagnostics {
    public notify(): void {
        /** */
    }

    public warn(): void {
        /** */
    }

    public debug(): void {
        /** */
    }

    public abort(): void {
        /** */
    }
}

export {
    DiagnosticsDummy,
};
