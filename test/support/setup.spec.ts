import * as nock from 'nock'
import * as chaiAsPromised from 'chai-as-promised'

import { should, use } from 'chai'

use(chaiAsPromised)

should()

nock.disableNetConnect()
