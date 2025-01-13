'use server';

import { join } from 'path';
import { readFile } from 'fs/promises';

export default async function Index() {
  //   const wasmData = await initializeWasm();

  const wasmPath = join(process.cwd(), 'wasm-module', 'pkg', 'wasm_module_bg.wasm');
  const wasmBuffer = await readFile(wasmPath);

  // Initialize the WebAssembly module
  const { default: initWasm, greet, add, fetch_wasm_json } = await import('../../../wasm-module/pkg/wasm_module');
  await initWasm(wasmBuffer);

  const message = greet('World');
  const calculation = add(1, 1);
  const apiData = await fetch_wasm_json('https://jsonplaceholder.typicode.com/todos/1').catch((e) => console.error(e));

  return (
    <div className='flex flex-col justify-center items-center h-screen w-screen'>
      <h1 className='text-4xl'>{message}</h1>
      <h1 className='text-4xl m-10'>{calculation}</h1>
      <h1 className='text-4xl'>{JSON.stringify(apiData)}</h1>
    </div>
  );
}
