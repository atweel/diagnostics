import 'jest';
import { Mock, Times, It } from 'typemoq';
import moment from 'moment';

import { DefaultDiagnostics } from './DefaultDiagnostics';
import { DiagnosticEventEmitter, EventCategory } from './../conventions/DiagnosticEventEmitter';
import { UnknownException } from '@atweel/primitives';

const EVENT_METHODS: Array<{ name: keyof DefaultDiagnostics; eventCategory: EventCategory}> = [
    {
        name: 'notify',
        eventCategory: EventCategory.NOTIFICATION,
    },
    {
        name: 'warn',
        eventCategory: EventCategory.WARNING,
    },
    {
        name: 'debug',
        eventCategory: EventCategory.DEBUG,
    },
];

describe('DefaultDiagnostics', () => {
    for (const method of EVENT_METHODS) {
        describe(`#${ method.name }`, () => {
            it('emits an event using provided event emitter', () => {
                const eventEmitterMock = Mock.ofType<DiagnosticEventEmitter>();
                
                const origin = 'Event origin';
                const message = 'Event message';
                const tags = [ 'event', 'tags' ];
                const payload = {
                    payload: true,
                };
    
                eventEmitterMock.setup(d => d.emitEvent(It.is(m => m.diff(moment(), 'seconds') < 1), 
                                                        method.eventCategory, 
                                                        message, 
                                                        origin, 
                                                        tags, 
                                                        payload)
                ).verifiable(Times.once());
    
                const diagnostics = new DefaultDiagnostics(eventEmitterMock.object, origin);
    
                diagnostics[method.name](message, tags, payload);
    
                eventEmitterMock.verifyAll();
            });
        });   
    }

    describe('#abort', () => {
        it('throws UnknownException and emits a matching event when invoked without arguments', () => {
            const eventEmitterMock = Mock.ofType<DiagnosticEventEmitter>();

            const origin = 'Event origin';
                
            eventEmitterMock.setup(d => d.emitEvent(It.is(m => m.diff(moment(), 'seconds') < 1), 
                                                    EventCategory.ERROR, 
                                                    'Unknown error occurred.',
                                                    origin,
                                                    undefined,
                                                    undefined)
            ).verifiable(Times.once());

            const diagnostics = new DefaultDiagnostics(eventEmitterMock.object, origin);

            expect(() => diagnostics.abort()).toThrow(UnknownException);

            eventEmitterMock.verifyAll();
        });

        it('throws an error and emits a matching event given a string', () => {
            const eventEmitterMock = Mock.ofType<DiagnosticEventEmitter>();

            const origin = 'Event origin';
            const message = 'Event message';
                
            eventEmitterMock.setup(d => d.emitEvent(It.is(m => m.diff(moment(), 'seconds') < 1), 
                                                    EventCategory.ERROR, 
                                                    message,
                                                    origin,
                                                    undefined,
                                                    undefined)
            ).verifiable(Times.once());

            const diagnostics = new DefaultDiagnostics(eventEmitterMock.object, origin);

            expect(() => diagnostics.abort(message)).toThrow(Error);

            eventEmitterMock.verifyAll();
        });

        it('throws an error and emits a matching event given an error object', () => {
            const eventEmitterMock = Mock.ofType<DiagnosticEventEmitter>();

            const origin = 'Event origin';
            const message = 'Event message';

            const error = new Error(message);
                
            eventEmitterMock.setup(d => d.emitEvent(It.is(m => m.diff(moment(), 'seconds') < 1), 
                                                    EventCategory.ERROR, 
                                                    message,
                                                    origin,
                                                    undefined,
                                                    undefined)
            ).verifiable(Times.once());

            const diagnostics = new DefaultDiagnostics(eventEmitterMock.object, origin);

            expect(() => diagnostics.abort(error)).toThrow(message);

            eventEmitterMock.verifyAll();
        });

        it('throws an error and emits a matching event given an error constructor', () => {
            const eventEmitterMock = Mock.ofType<DiagnosticEventEmitter>();

            const origin = 'Event origin';
            const message = 'Event message';

            // eslint-disable-next-line @typescript-eslint/class-name-casing
            class CustomError extends Error {
                constructor() {
                    super(message);
                }
            }
                
            eventEmitterMock.setup(d => d.emitEvent(It.is(m => m.diff(moment(), 'seconds') < 1), 
                                                    EventCategory.ERROR, 
                                                    message,
                                                    origin,
                                                    undefined,
                                                    undefined)
            ).verifiable(Times.once());

            const diagnostics = new DefaultDiagnostics(eventEmitterMock.object, origin);

            expect(() => diagnostics.abort(CustomError)).toThrow(message);

            eventEmitterMock.verifyAll();
        });
    });
});
