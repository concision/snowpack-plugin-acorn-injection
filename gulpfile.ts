import {Gulpclass, SequenceTask, Task} from "gulpclass";
import gulp from "gulp";
import typescript, {Project} from "gulp-typescript";
import del from "del";
import * as path from "path";
import run from "gulp-run";
import {readFileSync, writeFileSync} from "fs";

@Gulpclass()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class Gulpfile {
    // TypeScript project definitions

    /**
     * TypeScript runtime project configuration
     */
    private readonly project: Project = typescript.createProject(path.resolve(__dirname, "tsconfig.json"));

    /**
     * Root source directory
     * @private
     */
    private readonly root: string = path.resolve(__dirname, this.project.config.compilerOptions.rootDir);
    /**
     * Targeted output directory
     */
    private readonly target: string = path.resolve(__dirname, this.project.config.compilerOptions.outDir);


    // build

    /**
     * Build project
     */
    @SequenceTask("build")
    public buildTask(): string[] {
        return ["clean", "lint", "transpile", "includes", "package"];
    }

    /**
     * Delete {@link target} directory
     */
    @Task("clean")
    public cleanTask(): Promise<unknown> {
        return del(this.target);
    }

    /**
     * Lint source files
     */
    @Task("lint")
    public lintTask(): void {
        return run("npm run lint", {cwd: __dirname, verbosity: 3}).exec();
    }

    /**
     * Transpile TypeScript project sources
     */
    @Task("transpile")
    public transpileTask(): unknown {
        const sources: string[] = [
            // included files, if specified
            ...(this.project.config.files ?? []),
            // included file globs, if specified
            ...(this.project.config.include ?? []),
            // blacklist excluded globs, if specified; map to negated glob filter
            ...(this.project.config.exclude?.map((pattern: string) => `!${pattern}`) ?? []),
        ];

        return gulp.src(sources, {allowEmpty: true, base: this.root})
            // transpile TypeScript sources
            .pipe(this.project())
            // write to target build directory
            .pipe(gulp.dest(this.target));
    }

    /**
     * Copy other files in distributed files
     */
    @Task("includes")
    public includeTask(): unknown {
        return Promise.all([
            // add README.md and LICENSE
            gulp.src(["README.md", "LICENSE"], {allowEmpty: true, base: __dirname})
                // write to target build directory
                .pipe(gulp.dest(this.target)),
            // add module typings
            gulp.src(["**/index.d.ts"], {allowEmpty: true, base: this.root})
                // write to target build directory
                .pipe(gulp.dest(this.target)),
        ]);
    }

    /**
     * Copy stripped package.json to distributed files
     */
    @Task("package")
    public async packageTask(): Promise<void> {
        // read package.json
        const packageJson = JSON.parse(readFileSync(path.resolve(__dirname, "package.json"), "utf8"));

        // update values
        packageJson["main"] = "index.js";
        packageJson["typings"] = "index.d.ts";
        // delete unnecessary tags
        delete packageJson["scripts"];
        delete packageJson["devDependencies"];

        // write package.json
        writeFileSync(
            path.resolve(this.target, "package.json"),
            JSON.stringify(packageJson, null, "  "),
        );
    }

    // publish

    /**
     * Build and publish distributed files
     */
    @SequenceTask("publish")
    public publishTask(): string[] {
        return ["build", "publish:npm"];
    }

    /**
     * Publish package to NPM
     */
    @Task("publish:npm")
    public async publishNpm(): Promise<void> {
        // publish package
        return run(`npm publish`, {cwd: this.target, verbosity: 3}).exec();
    }
}
