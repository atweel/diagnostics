import { tagged } from 'inversify';

import { UNSAFE_DIAGNOSTICS_TAG } from 'common';

function unsafe() {
    return tagged(UNSAFE_DIAGNOSTICS_TAG, true);
}

export default unsafe;
