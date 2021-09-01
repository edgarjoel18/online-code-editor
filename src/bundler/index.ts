import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";
// init esbuild
// rawcode is input from the code editor
let service: esbuild.Service;
const Bundle = async (rawCode: string) => {
  if (!service) {
    service = await esbuild.startService({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
    });
  } // end of if

  try {
    const result = await service.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
      jsxFactory: "_React.createElement",
      jsxFragment: "_React.Fragment",
    });

    return {
      code: result.outputFiles[0].text,
      err: "",
    };
  } catch (err) {
    return {
      code: "",
      err: err.message,
    };
  }
}; // end of initBuilder
export default Bundle;

// This was from index.tsx in /src now this is the component for this
// never do anything until we have init our start service
// again here we are making sure we don't use the ref.current if it is null
// if (!ref.current) {
//   return;
// }
//  const startService = async () => {
//     // get the wasm bundle
//     ref.current =
//     // this service obj is used to transpile the code
//   }; // end of startService
