/**
 * @license
 * Copyright 2018 Palantir Technologies, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as program from "commander";
import { generateCode } from "./";

function main() {
    program
        .command("generate <input> <packageName> <version> <output>")
        .option("-m, --moduleType <type>", "Type of module to generate", "es2015")
        .action((input: string, packageName: string, version: string, output: string, cmd) =>
            generateCode({
                input,
                moduleType: cmd.opts().moduleType,
                output,
                packageName,
                version,
            }),
        );

    program
        .command("local <input> <packageName> <version> <output>")
        .action((input: string, packageName: string, version: string, output: string) =>
            generateCode({
                input,
                moduleType: "es2015",
                output,
                packageName,
                version,
            }),
        );

    program.command("*").action(cmd => {
        // tslint:disable-next-line:no-console
        console.error(`\nError: unmatched command ${cmd}`);
        process.exit(1);
    });

    program.parse(process.argv);
}

main();
