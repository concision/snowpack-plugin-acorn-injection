import AcornStage3Plugin from "acorn-stage3";
import {SnowpackConfig, SnowpackPlugin, SnowpackPluginFactory} from "snowpack";
import {InputOptions, Plugin as RollupPlugin} from "rollup";

export interface PluginOptions {
}

export default <SnowpackPluginFactory<PluginOptions>>((snowpackConfig: SnowpackConfig, pluginOptions?: PluginOptions): SnowpackPlugin => {
    return {
        name: "snowpack-acorn-stage3-plugin",
        config(snowpackConfig: SnowpackConfig): void {
            (snowpackConfig.installOptions.rollup!.plugins ??= []).push(<RollupPlugin>{
                name: "rollup-acorn-stage3-plugin",
                options: (options: InputOptions): InputOptions => {
                    if (Array.isArray(options.acornInjectPlugins)) { // Function[]
                        options.acornInjectPlugins.push(AcornStage3Plugin);
                    } else if (typeof options.acornInjectPlugins !== "undefined") { // Function
                        options.acornInjectPlugins = [options.acornInjectPlugins, AcornStage3Plugin];
                    } else { // undefined
                        options.acornInjectPlugins = [AcornStage3Plugin];
                    }
                    return options;
                },
            });
        },
    };
});
