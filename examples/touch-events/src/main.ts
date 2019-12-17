import { coreModule, Riba } from '@ribajs/core';
import { extrasModule } from '@ribajs/extras';
import { TouchEventsModule } from './touch-events.module';

const riba = new Riba();
const model = {};

// Register modules
riba.module.regist(coreModule);
riba.module.regist(extrasModule);
riba.module.regist(TouchEventsModule);

riba.bind(document.body, model);
