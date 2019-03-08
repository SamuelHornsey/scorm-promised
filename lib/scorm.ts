import { debug, getApiHandle } from './helpers';

// Config interface
interface scormConf {
    debug?: boolean;
}

export default class Scorm {
    private API: any = null;
    private debug: boolean = false;
    private isActive: boolean = false;

    constructor (opts: scormConf = { debug: false }) {
        this.debug = opts.debug;
        this.API = getApiHandle();
    }

    /**
     * Initializes the SCORM API
     */
    public init (): boolean {
        if (this.isActive) return true;

        let success = this.API.LMSInitialize('');

        debug(this.debug, `LMS Status ${success}`);

        if (success) {
            this.isActive = true;
            return success;
        }

        return success;
    }

    /**
     * Terminates the SCORM session
     */
    public terminate (): boolean {
        this.set('cmi.core.exit', 'suspend');
        this.commit();

        this.API.LMSFinish('');
        return true;
    }

    /**
     * Gets a parameter from the SCORM API
     * @param param 
     */
    public get (param: string): string {
        let val = this.API.LMSGetValue(param);
        debug(this.debug, `this.API.LMSGetValue(${param}) = ${val}`);
        return val;
    }

    /**
     * Sets a parameter in the SCORM API
     * @param param 
     * @param value 
     */
    public set (param: string, value: string): void {
        debug(this.debug, `this.API.LMSSetValue(${param}, ${value})`);
        this.API.LMSSetValue(param, value);
    }

    /**
     * Commits data to the LMS
     */
    public commit (): boolean {
        return this.API.LMSCommit('');
    }
}