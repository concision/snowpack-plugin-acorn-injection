import {SnowpackConfig, SnowpackPlugin, SnowpackPluginFactory} from "snowpack";
import {InputOptions, Plugin as RollupPlugin} from "rollup";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PluginOptions {
    acorns?: string[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
module.exports = <SnowpackPluginFactory<PluginOptions>>((snowpackConfig: SnowpackConfig, pluginOptions?: PluginOptions): SnowpackPlugin => {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const acorns: Function[] = [];
    if (Array.isArray(pluginOptions?.acorns)) {
        for (const name of pluginOptions!.acorns) {
            // eslint-disable-next-line @typescript-eslint/no-var-requires,@typescript-eslint/ban-types
            acorns.push(<Function>require(name));
        }
    }

    return {
        name: "snowpack-acorn-inject-plugin",
        config(snowpackConfig: SnowpackConfig): void {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            (snowpackConfig.installOptions.rollup!.plugins ??= []).push(<RollupPlugin>{
                name: "rollup-acorn-inject-plugin",
                options: (options: InputOptions): InputOptions => {
                    if (acorns.length !== 0) {
                        if (Array.isArray(options.acornInjectPlugins)) { // Function[]
                            for (const acorn of acorns) {
                                options.acornInjectPlugins.push(acorn);
                            }
                        } else if (typeof options.acornInjectPlugins !== "undefined") { // Function
                            options.acornInjectPlugins = [options.acornInjectPlugins, ...acorns];
                        } else { // undefined
                            options.acornInjectPlugins = acorns;
                        }
                    }

                    return options;
                },
            });
        },
    };
});
