import {SnowpackPluginFactory} from "snowpack";

declare const SnowpackAcornInjectPluginFactory: SnowpackPluginFactory<SnowpackAcornInjectPluginFactory.SnowpackAcornInjectPluginOptions>;

declare namespace SnowpackAcornInjectPluginFactory {
    export interface SnowpackAcornInjectPluginOptions {
        acorns?: string[];
    }
}

export = SnowpackAcornInjectPluginFactory;