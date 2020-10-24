import {SnowpackConfig, SnowpackPlugin, SnowpackPluginFactory} from "snowpack";
import {InputOptions, Plugin as RollupPlugin} from "rollup";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AcornInjectionSnowpackPluginOptions {
    plugins?: string[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
module.exports = <SnowpackPluginFactory<AcornInjectionSnowpackPluginOptions>>((snowpackConfig: SnowpackConfig, pluginOptions?: AcornInjectionSnowpackPluginOptions): SnowpackPlugin => {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const acornPlugins: Function[] = [];
    if (Array.isArray(pluginOptions?.plugins)) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        for (const acornPluginName of pluginOptions!.plugins) {
            // eslint-disable-next-line @typescript-eslint/no-var-requires,@typescript-eslint/ban-types
            acornPlugins.push(<Function>require(acornPluginName));
        }
    }

    return {
        name: "snowpack-plugin-acorn-injection",
        config(snowpackConfig: SnowpackConfig): void {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            (snowpackConfig.installOptions.rollup!.plugins ??= []).push(<RollupPlugin>{
                name: "rollup-plugin-acorn-injection",
                options: (options: InputOptions): InputOptions => {
                    if (acornPlugins.length !== 0) {
                        if (Array.isArray(options.acornInjectPlugins)) { // Function[]
                            for (const acorn of acornPlugins) {
                                options.acornInjectPlugins.push(acorn);
                            }
                        } else if (typeof options.acornInjectPlugins !== "undefined") { // Function
                            options.acornInjectPlugins = [options.acornInjectPlugins, ...acornPlugins];
                        } else { // undefined
                            options.acornInjectPlugins = acornPlugins;
                        }
                    }

                    return options;
                },
            });
        },
    };
});
