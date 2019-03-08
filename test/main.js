import { Scorm } from '../dist/scorm.mjs';

(() => {
    const scorm = new Scorm({ debug: true });

    scorm.init();
})();