import {SnowpackPluginFactory} from "snowpack";

declare const AcornInjectionSnowpackPluginFactory: SnowpackPluginFactory<AcornInjectionSnowpackPluginFactory.AcornInjectionSnowpackPluginOptions>;

declare namespace AcornInjectionSnowpackPluginFactory {
    export interface AcornInjectionSnowpackPluginOptions {
        plugins?: string[];
    }
}

export = SnowpackAcornInjectPluginFactory;
